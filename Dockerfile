# pitch — Vaab landing page + playground
#
# The HTTP server is Vaab itself (`vaab serve main.vaab`). No nginx/Caddy.
#
# Build:  docker build --platform linux/amd64 -t pitch .
# Run:    docker run --rm -p 8787:8787 -e PORT=8787 pitch

# ── frontend ──────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS web
WORKDIR /src/web
COPY web/package.json web/package-lock.json ./
RUN npm ci
COPY web/ ./
RUN npm run build

# ── runtime ───────────────────────────────────────────────────────────
FROM debian:bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*

# Prebuilt Vaab CLI (linux x86_64). Clear/delete need >=0.1.1 (Store.remove deadlock fix).
ARG VAAB_VERSION=v0.1.1
RUN curl -fsSL \
      "https://github.com/vaab-lang/vaab/releases/download/${VAAB_VERSION}/vaab-linux-x86_64" \
      -o /usr/local/bin/vaab \
    && chmod +x /usr/local/bin/vaab \
    && vaab version | grep -q 0.1.1

RUN useradd --create-home --shell /bin/bash pitch
USER pitch
WORKDIR /home/pitch/app
ENV HOME=/home/pitch \
    PORT=8787

COPY --chown=pitch:pitch main.vaab riff ./
COPY --from=web --chown=pitch:pitch /src/web/dist ./web/dist
COPY --chown=pitch:pitch docker-entrypoint.sh /home/pitch/docker-entrypoint.sh
RUN chmod +x /home/pitch/docker-entrypoint.sh

EXPOSE 8787
ENTRYPOINT ["/home/pitch/docker-entrypoint.sh"]
