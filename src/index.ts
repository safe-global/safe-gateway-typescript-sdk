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

export function getCollectibles(network: string, address: string, query: operations['safes_collectibles_list']['parameters']['query'] = {}) {
  return callEndpoint(network, '/safes/{address}/collectibles/', { path: { address }, query })
}

export function getTransactionDetails(network: string, safe_tx_hash: string) {
  return callEndpoint(network, '/transactions/{safe_tx_hash}/', { path: { safe_tx_hash } })
}

/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
