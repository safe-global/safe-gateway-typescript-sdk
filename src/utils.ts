import fetch from 'unfetch'

export type Params = { [key: string]: string | number | boolean | null }

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

export function fetchJson<T>(url: string, body?: unknown): Promise<T> {
  let bodyStr: string | undefined | null
  if (body != null && typeof body !== 'string') {
    bodyStr = JSON.stringify(body)
  } else {
    bodyStr = body as string | null | undefined
  }

  return fetch(url, {
    body: bodyStr,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((resp) => {
    if (!resp.ok) {
      throw Error(resp.statusText)
    }
    return resp.json()
  })
}
