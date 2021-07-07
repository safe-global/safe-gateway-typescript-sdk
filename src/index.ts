import fetch from 'unfetch'
import { callEndpoint } from './utils'

let network = 'ribkeby'

export function setNetwork(newNetwork: string) {
  network = newNetwork
}

export function getSafeInfo(address: string) {
  return callEndpoint(network, '/safes/{address}/', { path: { address } })
}

export function getBalances(address: string, currency = 'usd', query = {}) {
  return callEndpoint(network, '/safes/{address}/balances/{currency}/', { path: { address, currency }, query })
}

export function getCollectibles(address: string, query = {}) {
  return callEndpoint(network, '/safes/{address}/collectibles/', { path: { address }, query })
}

export function getTransactionDetails(safe_tx_hash: string) {
  return callEndpoint(network, '/transactions/{safe_tx_hash}/', { path: { safe_tx_hash } })
}
