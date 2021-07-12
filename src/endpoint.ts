import config from './config'
import { fetchJson, insertParams, stringifyQuery } from './utils'
import { paths } from './types/gateway'

type Primitive = string | number | boolean | null

interface Params {
  path: { [key: string]: Primitive }
  query: { [key: string]: Primitive }
}

export function callEndpoint<T extends keyof paths>(
  network: string,
  path: T,
  parameters: paths[T]['get']['parameters'] = {},
): Promise<paths[T]['get']['responses'][200]['schema']> {
  const params = parameters as Params
  const baseUrl = insertParams(config.baseUrl, { network: network.toLowerCase() })
  const pathname = insertParams(path, params.path || {})
  const search = stringifyQuery(params.query)

  return fetchJson(`${baseUrl}${pathname}${search}`)
}
