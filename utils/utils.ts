async function fetchJson<T>(link: string, init?: RequestInit): Promise<T> {
  const res = await fetch(link, init)
  if (!res.ok) {
    throw new Error(`Network response not OK! ${res.status} ${res.statusText}`)
  }

  return res.json()
}

async function fetchString(link: string, init?: RequestInit) {
  const res = await fetch(link, init)
  if (!res.ok) {
    throw new Error(`Network response not OK! ${res.status} ${res.statusText}`)
  }

  return res.text()
}

export { fetchJson, fetchString }
