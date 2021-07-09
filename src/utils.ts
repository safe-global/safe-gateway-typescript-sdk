import fetch from 'unfetch'

export type Query = { [key: string]: string | number | boolean | null }

export function insertParam(str: string, key: string, value: string): string {
  return str.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
}

function stringifyQuery(query: Query): string {
  const searchParams = new URLSearchParams()
  Object.keys(query).forEach((key) => {
    searchParams.append(key, String(query[key]))
  })
  return `?${searchParams}`
}

export function fetchJson(url: string, query?: Query): Promise<any> {
  const fullUrl = url + (query ? stringifyQuery(query) : '')
  return fetch(fullUrl).then((resp) => {
    if (!resp.ok) {
      throw Error(resp.statusText)
    }
    return resp.json()
  })
}
