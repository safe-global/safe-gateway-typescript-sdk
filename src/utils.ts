import fetch from 'unfetch'

export type Params = { [key: string]: string | number | boolean | null }

function replaceParam(str: string, key: string, value: string): string {
  return str.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
}

export function insertParams(template: string, params?: Params): string {
  return params ? Object.keys(params).reduce((result: string, key) => {
    return replaceParam(result, key, String(params[key]))
  }, template) : template
}

export function stringifyQuery(query?: Params): string {
  if (!query || !Object.keys(query).length) { return '' }

  const searchParams = new URLSearchParams()
  Object.keys(query).forEach((key) => {
    searchParams.append(key, String(query[key]))
  })
  return `?${searchParams}`
}

export function fetchJson<T>(url: string): Promise<T> {
  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw Error(resp.statusText)
    }
    return resp.json()
  })
}
