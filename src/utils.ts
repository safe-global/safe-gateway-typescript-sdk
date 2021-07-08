import fetch from 'unfetch'
import config from './config'
import { paths } from '../types/gateway'

function replaceParam(str: string, key: string, value: string): string {
  return str.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
}

function fetchJson(url: string): Promise<any> {
  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw Error(resp.statusText)
    }
    return resp.json()
  })
}

function stringifyQuery(query: { [key: string]: string | number | boolean | null }): string {
  const searchParams = new URLSearchParams()
  Object.keys(query).forEach((key) => {
    searchParams.append(key, String(query[key]))
  })
  return `?${searchParams}`
}

export function callEndpoint<T extends keyof paths>(
  network: string,
  path: T,
  params: paths[T]['get']['parameters'],
): Promise<{ data: paths[T]['get']['responses'][200]['schema'] }> {
  const baseUrl = replaceParam(config.baseUrl, 'network', network)

  const pathname = Object.keys(params.path).reduce((result: string, key) => {
    return replaceParam(result, key, (params.path as { [key: string]: string })[key])
  }, path)

  let search = ''
  const query = (params as any).query // any because not all endpoints have a query
  if (query) {
    search = stringifyQuery(query)
  }

  const url = `${baseUrl}${pathname}${search}`

  return fetchJson(url)
}
