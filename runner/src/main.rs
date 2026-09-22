//! HTTP runner for the Vaab playground.
//!
//! Parses, type-checks, and executes Vaab source submitted from the browser.

use axum::{
    extract::DefaultBodyLimit,
    http::{HeaderValue, Method, StatusCode},
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};
use vaab_syntax::{diagnostic, parse, ColorChoice};
use vaab_types::check;
use vaab_vm::{error, Output, Value};

const MAX_SOURCE_BYTES: usize = 32 * 1024;

#[derive(Debug, Deserialize)]
struct RunRequest {
    source: String,
}

#[derive(Debug, Serialize)]
#[serde(tag = "status", rename_all = "lowercase")]
enum RunResponse {
    Ok {
        stdout: Vec<String>,
        result: String,
    },
    Error {
        phase: &'static str,
        message: String,
    },
}

#[tokio::main]
async fn main() {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers(Any);

    let app = Router::new()
        .route("/health", get(health))
        .route("/api/run", post(run).layer(DefaultBodyLimit::max(MAX_SOURCE_BYTES)))
        .layer(cors);

    let addr = SocketAddr::from(([127, 0, 0, 1], 8787));
    println!("vaab runner listening on http://{addr}");
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn health() -> impl IntoResponse {
    (
        StatusCode::OK,
        [(axum::http::header::CONTENT_TYPE, "application/json")],
        r#"{"ok":true,"service":"vaab-runner"}"#,
    )
}

async fn run(Json(body): Json<RunRequest>) -> impl IntoResponse {
    let source = body.source;
    if source.trim().is_empty() {
        return json_response(RunResponse::Error {
            phase: "input",
            message: "source is empty — write some Vaab code first".into(),
        });
    }

    let parsed = parse(&source);
    if parsed.has_errors() {
        return json_response(RunResponse::Error {
            phase: "parse",
            message: diagnostic::render(
                &parsed.diagnostics,
                "playground.vaab",
                &source,
                ColorChoice::Never,
            ),
        });
    }

    let checked = match check(&parsed.module) {
        Ok(checked) => checked,
        Err(problems) => {
            return json_response(RunResponse::Error {
                phase: "check",
                message: diagnostic::render(
                    &problems,
                    "playground.vaab",
                    &source,
                    ColorChoice::Never,
                ),
            });
        }
    };

    let mut world = vaab_vm::prepare(&parsed.module, &checked, Output::collected());
    match vaab_vm::run(&mut world) {
        Ok(value) => json_response(RunResponse::Ok {
            stdout: world.output.lines().to_vec(),
            result: show_value(&value),
        }),
        Err(problem) => json_response(RunResponse::Error {
            phase: "run",
            message: error::render(&problem, "playground.vaab", &source, ColorChoice::Never),
        }),
    }
}

fn show_value(value: &Value) -> String {
    match value {
        Value::Nothing => "nothing".into(),
        other => other.show(),
    }
}

fn json_response(body: RunResponse) -> impl IntoResponse {
    (
        StatusCode::OK,
        [(
            axum::http::header::CONTENT_TYPE,
            HeaderValue::from_static("application/json"),
        )],
        Json(body),
    )
}
