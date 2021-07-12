import { callEndpoint } from './endpoint'
import { operations, definitions } from './types/gateway'

export type GatewayDefinitions = definitions

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export function getSafeInfo(network: string, address: string) {
  return callEndpoint(network, '/safes/{address}/', { path: { address }})
}

export function getBalances(
  network: string,
  address: string,
  currency = 'usd',
  query: operations['safes_balances_list']['parameters']['query'] = {}
) {
  return callEndpoint(network, '/safes/{address}/balances/{currency}/', { path: { address, currency }, query })
}

export function getFiatCurrencies(network: string) {
  return callEndpoint(network, '/balances/supported-fiat-codes')
}

export function getCollectibles(network: string, address: string, query: operations['safes_collectibles_list']['parameters']['query'] = {}) {
  return callEndpoint(network, '/safes/{address}/collectibles/', { path: { address }, query })
}

export function getTransactionHistory(network: string, address: string, pageUrl?: string) {
  return callEndpoint(
    network,
    '/safes/{safe_address}/transactions/history',
    { path: { safe_address: address }, query: { page_url: pageUrl } }
  )
}

/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
