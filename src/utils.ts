import fetch from 'cross-fetch'

export type Params = Record<string, string | number | boolean | null>

export type ErrorResponse = {
  code: number
  message: string
}

const isErrorResponse = (data: unknown): data is ErrorResponse => {
  const isObject = typeof data === 'object' && data !== null
  return isObject && 'code' in data && 'message' in data
}

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
  let json

  try {
    json = await resp.json()
  } catch {
    if (resp.headers && resp.headers.get('content-length') === '0') {
      throw new Error('Empty response. ' + resp.statusText)
    }
  }

  if (!resp.ok) {
    const errTxt = isErrorResponse(json) ? `${json.code}: ${json.message}` : resp.statusText
    throw new Error(errTxt)
  }

  return json
}
