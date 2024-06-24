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

async function parseResponse<T>(resp: Response): Promise<T> {
  let json

  try {
    // An HTTP 204 - No Content response doesn't contain a body so trying to call .json() on it would throw
    json = resp.status === 204 ? {} : await resp.json()
  } catch {
    if (resp.headers && resp.headers.get('content-length') !== '0') {
      throw new Error(`Invalid response content: ${resp.statusText}`)
    }
  }

  if (!resp.ok) {
    const errTxt = isErrorResponse(json) ? `${json.code}: ${json.message}` : resp.statusText
    throw new Error(errTxt)
  }

  return json
}

export async function fetchData<T>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE',
  body?: unknown,
  headers?: Record<string, string>,
  includeCredentials?: boolean,
): Promise<T> {
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  }

  const options: RequestInit = {
    method: method ?? 'POST',
    headers: requestHeaders,
  }

  if (includeCredentials) {
    options['credentials'] = 'include'
  }

  if (body != null) {
    options.body = typeof body === 'string' ? body : JSON.stringify(body)
  }

  const resp = await fetch(url, options)

  return parseResponse<T>(resp)
}

export async function getData<T>(
  url: string,
  headers?: Record<string, string>,
  includeCredentials?: boolean,
): Promise<T> {
  const options: RequestInit = {
    method: 'GET',
  }

  if (headers) {
    options['headers'] = {
      ...headers,
      'Content-Type': 'application/json',
    }
  }

  if (includeCredentials) {
    options['credentials'] = 'include'
  }

  const resp = await fetch(url, options)

  return parseResponse<T>(resp)
}
