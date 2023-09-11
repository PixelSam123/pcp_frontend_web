async function fetchJson<T>(link: string, init?: RequestInit): Promise<T> {
  const res = await fetch(link, init)

  if (!res.ok) {
    throw new FetchError(res.status, res.statusText, await res.text())
  }

  return res.json()
}

async function fetchString(link: string, init?: RequestInit) {
  const res = await fetch(link, init)
  const resText = await res.text()

  if (!res.ok) {
    throw new FetchError(res.status, res.statusText, resText)
  }

  return resText
}

async function fetchVoid(link: string, init?: RequestInit) {
  const res = await fetch(link, init)

  if (!res.ok) {
    throw new FetchError(res.status, res.statusText, await res.text())
  }
}

class FetchError extends Error {
  constructor(status: number, statusText: string, resText: string) {
    super(
      `Network response not OK! ${status} ${statusText}: ${
        resText || 'No details given'
      }`,
    )
  }
}

export { fetchJson, fetchString, fetchVoid }
