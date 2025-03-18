export type Params = Record<string, string | number | boolean | null>

export type ErrorResponse =
  | {
      code: number
      statusCode?: never
      message: string
    }
  | {
      code?: never
      statusCode: number
      message: string
    }

const isErrorResponse = (data: unknown): data is ErrorResponse => {
  const isObject = typeof data === 'object' && data !== null
  return isObject && ('code' in data || 'statusCode' in data) && 'message' in data
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
    json = await resp.json()
  } catch {
    json = {}
  }

  if (!resp.ok) {
    const errTxt = isErrorResponse(json)
      ? `CGW error - ${json.code ?? json.statusCode}: ${json.message}`
      : `CGW error - status ${resp.statusText}`
    throw new Error(errTxt)
  }

  return json
}

export async function fetchData<T>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE',
  body?: unknown,
  headers?: Record<string, string>,
  credentials?: RequestCredentials,
): Promise<T> {
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  }

  const options: RequestInit = {
    method: method ?? 'POST',
    headers: requestHeaders,
  }

  if (credentials) {
    options['credentials'] = credentials
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
  credentials?: RequestCredentials,
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

  if (credentials) {
    options['credentials'] = credentials
  }

  const resp = await fetch(url, options)

  return parseResponse<T>(resp)
}
