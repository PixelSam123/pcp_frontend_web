async function fetchJson<T>(link: string): Promise<T> {
  const res = await fetch(link)
  if (!res.ok) {
    throw new Error(`Network response not OK! ${res.status} ${res.statusText}`)
  }

  return res.json()
}

async function fetchString(link: string) {
  const res = await fetch(link)
  if (!res.ok) {
    throw new Error(`Network response not OK! ${res.status} ${res.statusText}`)
  }

  return res.text()
}

export { fetchJson, fetchString }
