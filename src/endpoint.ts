import { fetchData, insertParams, stringifyQuery } from './utils'
import type { GetEndpoint, paths, PostEndpoint } from './types/api'

export function postEndpoint<T extends keyof paths>(
  baseUrl: string,
  path: T,
  params?: paths[T] extends PostEndpoint ? paths[T]['post']['parameters'] : never,
): Promise<paths[T] extends PostEndpoint ? paths[T]['post']['responses'][200]['schema'] : never> {
  const pathname = insertParams(path as string, params?.path)
  const search = stringifyQuery(params?.query)
  const url = `${baseUrl}${pathname}${search}`

  return fetchData(url, params?.body)
}

export function getEndpoint<T extends keyof paths>(
  baseUrl: string,
  path: T,
  params?: paths[T] extends GetEndpoint ? paths[T]['get']['parameters'] : never,
  rawUrl?: string,
): Promise<paths[T] extends GetEndpoint ? paths[T]['get']['responses'][200]['schema'] : never> {
  if (rawUrl) {
    return fetchData(rawUrl)
  }

  const pathname = insertParams(path as string, params?.path)
  const search = stringifyQuery(params?.query)
  const url = `${baseUrl}${pathname}${search}`

  return fetchData(url)
}
