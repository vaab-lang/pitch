import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import {
  Copy,
  Loader2,
  Play,
  RotateCcw,
  Terminal,
} from 'lucide-react'
import { useCallback, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { runVaab, type RunResponse } from '@/lib/api'
import { DEFAULT_SOURCE, EXAMPLES } from '@/lib/examples'
import { cn } from '@/lib/utils'

const editorTheme = oneDark

export function Playground() {
  const [source, setSource] = useState(DEFAULT_SOURCE)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<RunResponse | null>(null)
  const [copied, setCopied] = useState(false)

  const handleRun = useCallback(async () => {
    setRunning(true)
    try {
      const response = await runVaab(source)
      setResult(response)
    } catch {
      setResult({
        status: 'error',
        phase: 'run',
        message:
          'Could not reach the Vaab runner. Start it with: cd runner && cargo run',
      })
    } finally {
      setRunning(false)
    }
  }, [source])

  const loadExample = (exampleSource: string) => {
    setSource(exampleSource)
    setResult(null)
  }

  const reset = () => {
    setSource(DEFAULT_SOURCE)
    setResult(null)
  }

  const copySource = async () => {
    await navigator.clipboard.writeText(source)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  const stdout =
    result?.status === 'ok' ? result.stdout.filter((line) => line.length > 0) : []

  return (
    <section id="playground" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Badge variant="accent" className="mb-4">
            Interactive
          </Badge>
          <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
            Try Vaab — write, edit, run.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Your code runs through the real Vaab parser, type checker, and VM.
            No transpiling, no mock — the same pipeline as{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-primary">
              vaab run
            </code>
            .
          </p>
        </div>

        <div className="blueprint-corner mt-10 overflow-hidden rounded-lg border border-border bg-card shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                playground.vaab
              </span>
              {EXAMPLES.map((example) => (
                <Button
                  key={example.id}
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => loadExample(example.source)}
                >
                  {example.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={reset}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset to hello world</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={copySource}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{copied ? 'Copied!' : 'Copy source'}</TooltipContent>
              </Tooltip>

              <Button onClick={handleRun} disabled={running} className="min-w-24">
                {running ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Running
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Run
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2">
            <div className="min-h-[320px] border-b border-border lg:min-h-[420px] lg:border-b-0 lg:border-r">
              <CodeMirror
                value={source}
                height="100%"
                minHeight="320px"
                theme={editorTheme}
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: false,
                  highlightActiveLine: true,
                  indentOnInput: true,
                  bracketMatching: true,
                }}
                onChange={(value) => {
                  setSource(value)
                  if (result) setResult(null)
                }}
                className="h-full [&_.cm-editor]:min-h-[320px] [&_.cm-editor]:py-3 [&_.cm-scroller]:font-mono"
              />
            </div>

            <div className="flex min-h-[280px] flex-col bg-background/50 lg:min-h-[420px]">
              <Tabs defaultValue="output" className="flex h-full flex-col">
                <div className="border-b border-border px-4 pt-3">
                  <TabsList className="h-8">
                    <TabsTrigger value="output" className="text-xs">
                      <Terminal className="mr-1.5 h-3.5 w-3.5" />
                      Output
                    </TabsTrigger>
                    <TabsTrigger value="result" className="text-xs">
                      Result
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="output" className="flex-1 p-4 m-0">
                  {!result && (
                    <p className="font-mono text-sm text-muted-foreground">
                      Press Run to execute your Vaab code.
                    </p>
                  )}

                  {result?.status === 'ok' && stdout.length === 0 && (
                    <p className="font-mono text-sm text-muted-foreground">
                      (no printed output)
                    </p>
                  )}

                  {result?.status === 'ok' && stdout.length > 0 && (
                    <pre className="font-mono text-sm leading-relaxed text-primary">
                      {stdout.join('\n')}
                    </pre>
                  )}

                  {result?.status === 'error' && (
                    <div>
                      <Badge variant="outline" className="mb-3 capitalize">
                        {result.phase} error
                      </Badge>
                      <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-relaxed text-destructive/90">
                        {result.message}
                      </pre>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="result" className="flex-1 p-4 m-0">
                  {!result && (
                    <p className="font-mono text-sm text-muted-foreground">
                      The final expression value appears here.
                    </p>
                  )}

                  {result?.status === 'ok' && (
                    <pre
                      className={cn(
                        'font-mono text-sm leading-relaxed',
                        result.result === 'nothing'
                          ? 'text-muted-foreground'
                          : 'text-accent',
                      )}
                    >
                      {result.result}
                    </pre>
                  )}

                  {result?.status === 'error' && (
                    <p className="font-mono text-sm text-muted-foreground">
                      Fix the error to see a result.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Powered by the Vaab VM · Keyboard: edit freely, then Run
        </p>
      </div>
    </section>
  )
}
