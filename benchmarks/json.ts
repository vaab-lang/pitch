function usersJson(): string[] {
  const out: string[] = []
  for (let i = 0; i < 1000; i++) {
    out.push(
      JSON.stringify({
        id: i,
        name: 'user',
        active: true,
      }),
    )
  }
  return out
}

usersJson()
