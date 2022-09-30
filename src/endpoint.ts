import { fetchData, insertParams, stringifyQuery } from './utils'
import type { paths } from './types/api'

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
  if (rawUrl) {
    return fetchData(rawUrl)
  }

  const params = parameters as Params
  const pathname = insertParams(path, params?.path)
  const search = stringifyQuery(params?.query)
  const url = `${baseUrl}${pathname}${search}`

  return fetchData(url, params?.body)
}
