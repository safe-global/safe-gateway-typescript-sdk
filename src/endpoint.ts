import { fetchData, stringifyQuery } from './utils'

type Primitive = string | number | boolean | null

interface Params {
  query?: { [key: string]: Primitive }
  body?: unknown
}

export function callEndpoint<T>(url: string, params?: Params, rawUrl?: string): Promise<T> {
  if (rawUrl) {
    return fetchData(rawUrl)
  }

  const search = stringifyQuery(params?.query)
  const endpoint = `${url}${search}`
  return fetchData(endpoint, params?.body)
}
