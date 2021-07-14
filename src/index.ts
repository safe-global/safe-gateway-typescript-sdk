import { callEndpoint } from './endpoint'
import { operations, definitions } from './types/gateway'

export type GatewayDefinitions = definitions

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export function getSafeInfo(baseUrl: string, address: string) {
  return callEndpoint(baseUrl, '/safes/{address}/', { path: { address } })
}

export function getBalances(
  baseUrl: string,
  address: string,
  currency = 'usd',
  query: operations['safes_balances_list']['parameters']['query'] = {},
) {
  return callEndpoint(baseUrl, '/safes/{address}/balances/{currency}/', { path: { address, currency }, query })
}

export function getFiatCurrencies(baseUrl: string) {
  return callEndpoint(baseUrl, '/balances/supported-fiat-codes')
}

export function getCollectibles(
  baseUrl: string,
  address: string,
  query: operations['safes_collectibles_list']['parameters']['query'] = {},
) {
  return callEndpoint(baseUrl, '/safes/{address}/collectibles/', { path: { address }, query })
}

export function getTransactionHistory(baseUrl: string, address: string, pageUrl?: string) {
  return callEndpoint(
    baseUrl,
    '/safes/{safe_address}/transactions/history',
    { path: { safe_address: address }, query: {} },
    pageUrl,
  )
}

export function getTransactionQueue(baseUrl: string, address: string, pageUrl?: string) {
  return callEndpoint(
    baseUrl,
    '/safes/{safe_address}/transactions/queued',
    { path: { safe_address: address }, query: {} },
    pageUrl,
  )
}

/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
