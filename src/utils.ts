import fetch from 'unfetch'

export type Params = Record<string, string | number | boolean | null>

function replaceParam(str: string, key: string, value: string): string {
  return str.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
}

export function insertParams(template: string, params?: Params): string {
  return params
    ? Object.keys(params).reduce((result: string, key) => {
        return replaceParam(result, key, String(params[key]))
      }, template)
    : template
}

export function stringifyQuery(query?: Params): string {
  if (!query) {
    return ''
  }

  const searchParams = new URLSearchParams()
  Object.keys(query).forEach((key) => {
    if (query[key] != null) {
      searchParams.append(key, String(query[key]))
    }
  })
  const searchString = searchParams.toString()
  return searchString ? `?${searchString}` : ''
}

export async function fetchData<T>(url: string, body?: unknown): Promise<T> {
  let options:
    | {
        method: 'POST'
        headers: Record<string, string>
        body: string
      }
    | undefined
  if (body != null) {
    options = {
      method: 'POST',
      body: typeof body === 'string' ? body : JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }
  }

  const resp = await fetch(url, options)

  if (!resp.ok) {
    throw Error(resp.statusText)
  }

  // If the reponse is empty, don't try to parse it
  const text = await resp.text()
  if (!text) {
    return text as unknown as T
  }

  return resp.json()
}
