import { fetchJson, insertParams, stringifyQuery } from './utils'
import { paths } from './types/gateway'

type Primitive = string | number | boolean | null

interface Params {
  path?: { [key: string]: Primitive }
  query?: { [key: string]: Primitive }
}

export function callEndpoint<T extends keyof paths>(
  baseUrl: string,
  path: T,
  parameters?: paths[T]['get']['parameters'],
  rawUrl?: string,
): Promise<paths[T]['get']['responses'][200]['schema']> {
  let url = rawUrl
  if (!url) {
    const params = parameters as Params
    const pathname = insertParams(path, params?.path)
    const search = stringifyQuery(params?.query)
    url = `${baseUrl}${pathname}${search}`
  }

  return fetchJson(url)
}
