import { deleteData, fetchData, getData, insertParams, stringifyQuery } from './utils'
import type { DeleteEndpoint, GetEndpoint, paths, PostEndpoint, Primitive, PutEndpoint } from './types/api'

function makeUrl(
  baseUrl: string,
  path: string,
  pathParams?: Record<string, Primitive>,
  query?: Record<string, Primitive>,
): string {
  const pathname = insertParams(path, pathParams)
  const search = stringifyQuery(query)
  return `${baseUrl}${pathname}${search}`
}

export function postEndpoint<T extends keyof paths>(
  baseUrl: string,
  path: T,
  params?: paths[T] extends PostEndpoint ? paths[T]['post']['parameters'] : never,
): Promise<paths[T] extends PostEndpoint ? paths[T]['post']['responses'][200]['schema'] : never> {
  const url = makeUrl(baseUrl, path as string, params?.path, params?.query)
  return fetchData(url, 'POST', params?.body, params?.headers)
}

export function putEndpoint<T extends keyof paths>(
  baseUrl: string,
  path: T,
  params?: paths[T] extends PutEndpoint ? paths[T]['put']['parameters'] : never,
): Promise<paths[T] extends PutEndpoint ? paths[T]['put']['responses'][200]['schema'] : never> {
  const url = makeUrl(baseUrl, path as string, params?.path, params?.query)
  return fetchData(url, 'PUT', params?.body, params?.headers)
}

export function getEndpoint<T extends keyof paths>(
  baseUrl: string,
  path: T,
  params?: paths[T] extends GetEndpoint ? paths[T]['get']['parameters'] : never,
  rawUrl?: string,
): Promise<paths[T] extends GetEndpoint ? paths[T]['get']['responses'][200]['schema'] : never> {
  if (rawUrl) {
    return getData(rawUrl)
  }
  const url = makeUrl(baseUrl, path as string, params?.path, params?.query)
  return getData(url, params?.headers)
}

export function deleteEndpoint<T extends keyof paths>(
  baseUrl: string,
  path: T,
  params?: paths[T] extends DeleteEndpoint ? paths[T]['delete']['parameters'] : never,
): Promise<paths[T] extends DeleteEndpoint ? paths[T]['delete']['responses'][200]['schema'] : never> {
  const url = makeUrl(baseUrl, path as string, params?.path)
  return deleteData(url, params?.headers)
}
