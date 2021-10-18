import { fetchData, insertParams, stringifyQuery } from './utils'
import { paths } from './types/api'

type Primitive = string | number | boolean | null

interface Params {
  path?: { [key: string]: Primitive }
  query?: { [key: string]: Primitive }
  body?: unknown
}

export function callEndpoint<T extends keyof paths>(
  baseUrl: string,
  path: T,
  parameters?: paths[T]['get']['parameters'],
  rawUrl?: string,
): Promise<paths[T]['get']['responses'][200]['schema']> {
  let url = rawUrl
  let body
  if (!url) {
    const params = parameters as Params
    const pathname = insertParams(path, params?.path)
    const search = stringifyQuery(params?.query)
    url = `${baseUrl}${pathname}${search}`
    body = params?.body
  }

  return fetchData(url, body)
}
