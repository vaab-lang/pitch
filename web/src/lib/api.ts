export type RunOk = {
  status: 'ok'
  stdout: string[]
  result: string
}

export type RunError = {
  status: 'error'
  phase: 'input' | 'parse' | 'check' | 'run'
  message: string
}

export type RunResponse = RunOk | RunError

export async function runVaab(source: string): Promise<RunResponse> {
  const response = await fetch('/api/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source }),
  })

  if (!response.ok) {
    return {
      status: 'error',
      phase: 'run',
      message: `server returned ${response.status}`,
    }
  }

  return response.json() as Promise<RunResponse>
}
