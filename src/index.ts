import { callEndpoint } from './endpoint'
import { FiatCurrencies, operations, OwnedSafes, SafeBalanceResponse, SafeCollectibleResponse, SafeInfo, TransactionListPage } from './types/gateway'
import { SafeTransactionEstimation, TransactionDetails } from './types/transactions'
export * from './types/transactions'
export * as GatewayDefinitions from './types/gateway'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * Get basic information about a Safe. E.g. owners, modules, version etc
 */
export function getSafeInfo(baseUrl: string, chainId: string, address: string): Promise<SafeInfo> {
  return callEndpoint(baseUrl, '/chains/{chainId}/safes/{address}/', { path: { chainId, address } })
}

/**
 * Get the total balance and all assets stored in a Safe
 */
export function getBalances(
  baseUrl: string,
  chainId: string,
  address: string,
  currency = 'usd',
  query: operations['safes_balances_list']['parameters']['query'] = {},
): Promise<SafeBalanceResponse> {
  return callEndpoint(baseUrl, '/chains/{chainId}/safes/{address}/balances/{currency}/', {
    path: { chainId, address, currency },
    query,
  })
}

/**
 * Get a list of supported fiat currencies (e.g. USD, EUR etc)
 */
export function getFiatCurrencies(baseUrl: string): Promise<FiatCurrencies> {
  return callEndpoint(baseUrl, '/balances/supported-fiat-codes')
}

/**
 * Get the addresses of all Safes belonging to an owner
 */
export function getOwnedSafes(baseUrl: string, chainId: string, address: string): Promise<OwnedSafes> {
  return callEndpoint(baseUrl, '/chains/{chainId}/owners/{address}/safes', { path: { chainId, address } })
}

/**
 * Get NFTs stored in a Safe
 */
export function getCollectibles(
  baseUrl: string,
  chainId: string,
  address: string,
  query: operations['safes_collectibles_list']['parameters']['query'] = {},
): Promise<SafeCollectibleResponse[]> {
  return callEndpoint(baseUrl, '/chains/{chainId}/safes/{address}/collectibles/', { path: { chainId, address }, query })
}

/**
 * Get a list of past Safe transactions
 */
export function getTransactionHistory(baseUrl: string, chainId: string, address: string, pageUrl?: string): Promise<TransactionListPage> {
  return callEndpoint(
    baseUrl,
    '/chains/{chainId}/safes/{safe_address}/transactions/history',
    { path: { chainId, safe_address: address }, query: {} },
    pageUrl,
  )
}

/**
 * Get the list of pending transactions
 */
export function getTransactionQueue(baseUrl: string, chainId: string, address: string, pageUrl?: string): Promise<TransactionListPage> {
  return callEndpoint(
    baseUrl,
    '/chains/{chainId}/safes/{safe_address}/transactions/queued',
    { path: { chainId, safe_address: address }, query: {} },
    pageUrl,
  )
}

/**
 * Get the details of an individual transaction by its id
 */
export function getTransactionDetails(baseUrl: string, chainId: string, transactionId: string): Promise<TransactionDetails> {
  return callEndpoint(baseUrl, '/chains/{chainId}/transactions/{transactionId}', {
    path: { chainId, transactionId },
  })
}

/**
 * Request a gas estimate for a created transaction
 */
export function postSafeGasEstimation(
  baseUrl: string,
  chainId: string,
  address: string,
  body: operations['post_safe_gas_estimation']['parameters']['body'],
): Promise<SafeTransactionEstimation> {
  return callEndpoint(baseUrl, '/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations', {
    path: { chainId, safe_address: address },
    body,
  })
}

/**
 * Propose a new transaction for other owners to sign/execute
 */
export function proposeTransaction(
  baseUrl: string,
  chainId: string,
  address: string,
  body: operations['propose_transaction']['parameters']['body'],
): Promise<TransactionDetails> {
  return callEndpoint(baseUrl, '/chains/{chainId}/transactions/{safe_address}/propose', {
    path: { chainId, safe_address: address },
    body,
  })
}

/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
