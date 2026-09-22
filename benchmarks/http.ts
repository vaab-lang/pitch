async function bench(): Promise<void> {
  for (let i = 0; i < 50; i++) {
    const response = await fetch('http://127.0.0.1:9998/health')
    await response.text()
  }
}

await bench()
