async function fetchJson<T>(link: string, init?: RequestInit): Promise<T> {
  const res = await fetch(link, init)

  if (!res.ok) {
    const resText = await res.text()

    throw new Error(
      `Network response not OK! ${res.status} ${res.statusText}${
        resText ? `: ${resText}` : ''
      }`,
    )
  }

  return res.json()
}

async function fetchString(link: string, init?: RequestInit) {
  const res = await fetch(link, init)
  const resText = await res.text()

  if (!res.ok) {
    throw new Error(
      `Network response not OK! ${res.status} ${res.statusText}${
        resText ? `: ${resText}` : ''
      }`,
    )
  }

  return resText
}

async function fetchVoid(link: string, init?: RequestInit) {
  const res = await fetch(link, init)
  if (!res.ok) {
    const resText = await res.text()

    throw new Error(
      `Network response not OK! ${res.status} ${res.statusText}${
        resText ? `: ${resText}` : ''
      }`,
    )
  }
}

export { fetchJson, fetchString, fetchVoid }
