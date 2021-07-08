import { callEndpoint } from './utils'
import { operations, definitions } from '../types/gateway'

let network = 'rinkeby'

export function setNetwork(newNetwork: string): void {
  network = newNetwork
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export function getSafeInfo(address: string) {
  return callEndpoint(network, '/safes/{address}/', { path: { address } })
}

export function getBalances(
  address: string,
  currency = 'usd',
  query?: operations['safes_balances_list']['parameters']['query'],
) {
  return callEndpoint(network, '/safes/{address}/balances/{currency}/', { path: { address, currency }, query: query || {} })
}

export function getCollectibles(address: string, query?: operations['safes_collectibles_list']['parameters']['query']) {
  return callEndpoint(network, '/safes/{address}/collectibles/', { path: { address }, query: query || {} })
}

export function getTransactionDetails(safe_tx_hash: string) {
  return callEndpoint(network, '/transactions/{safe_tx_hash}/', { path: { safe_tx_hash } })
}

/* eslint-enable @typescript-eslint/explicit-module-boundary-types */

export interface GatewayResponses extends definitions {}
