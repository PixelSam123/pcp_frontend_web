async function fetchJson<T>(link: string, init?: RequestInit): Promise<T> {
  const res = await fetch(link, init)
  const resJson = await safeJson(res)

  if (!res.ok) {
    throw new FetchError(res.status, res.statusText, resJson?.details)
  }

  return resJson
}

async function fetchString(link: string, init?: RequestInit) {
  const res = await fetch(link, init)

  if (!res.ok) {
    throw new FetchError(
      res.status,
      res.statusText,
      (await safeJson(res))?.details,
    )
  }

  return await res.text()
}

async function fetchVoid(link: string, init?: RequestInit) {
  const res = await fetch(link, init)

  if (!res.ok) {
    throw new FetchError(
      res.status,
      res.statusText,
      (await safeJson(res))?.details,
    )
  }
}

async function safeJson(res: Response) {
  try {
    return await res.json()
  } catch (err) {
    if (!(err instanceof SyntaxError)) {
      throw err
    }

    return null
  }
}

class FetchError extends Error {
  constructor(status: number, statusText: string, details?: string) {
    super(
      `Error ${status} (${statusText})! ${
        details ? 'Details: ' + details : 'No details given'
      }`,
    )
  }
}

export { fetchJson, fetchString, fetchVoid }
