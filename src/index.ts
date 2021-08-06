import { callEndpoint } from './endpoint'
import { operations, definitions } from './types/gateway'

export type GatewayDefinitions = definitions

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export function getSafeInfo(baseUrl: string, chainId: string, address: string) {
  return callEndpoint(baseUrl, '/chains/{chainId}/safes/{address}/', { path: { chainId, address } })
}

export function getBalances(
  baseUrl: string,
  chainId: string,
  address: string,
  currency = 'usd',
  query: operations['safes_balances_list']['parameters']['query'] = {},
) {
  return callEndpoint(baseUrl, '/chains/{chainId}/safes/{address}/balances/{currency}/', {
    path: { chainId, address, currency },
    query,
  })
}

export function getFiatCurrencies(baseUrl: string) {
  return callEndpoint(baseUrl, '/balances/supported-fiat-codes')
}

export function getCollectibles(
  baseUrl: string,
  chainId: string,
  address: string,
  query: operations['safes_collectibles_list']['parameters']['query'] = {},
) {
  return callEndpoint(baseUrl, '/chains/{chainId}/safes/{address}/collectibles/', { path: { chainId, address }, query })
}

export function getTransactionHistory(baseUrl: string, chainId: string, address: string, pageUrl?: string) {
  return callEndpoint(
    baseUrl,
    '/chains/{chainId}/safes/{safe_address}/transactions/history',
    { path: { chainId, safe_address: address }, query: {} },
    pageUrl,
  )
}

export function getTransactionQueue(baseUrl: string, chainId: string, address: string, pageUrl?: string) {
  return callEndpoint(
    baseUrl,
    '/chains/{chainId}/safes/{safe_address}/transactions/queued',
    { path: { chainId, safe_address: address }, query: {} },
    pageUrl,
  )
}

export function postTransaction(
  baseUrl: string,
  chainId: string,
  address: string,
  body: operations['post_transaction']['parameters']['body'],
) {
  return callEndpoint(baseUrl, '/chains/{chainId}/transactions/{safe_address}/propose', {
    path: { chainId, safe_address: address },
    body,
  })
}

/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
