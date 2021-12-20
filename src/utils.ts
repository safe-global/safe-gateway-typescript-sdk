import fetch from 'isomorphic-unfetch'

export type Params = Record<string, string | number | boolean | null>

export type ErrorResponse = {
  code: number
  message: string
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
  const json = await resp.json()

  if (!resp.ok) {
    let errTxt = ''
    try {
      const err = json as ErrorResponse
      errTxt = `${err.code}: ${err.message}`
    } catch (e) {
      errTxt = resp.statusText
    }
    throw new Error(errTxt)
  }

  return json
}
