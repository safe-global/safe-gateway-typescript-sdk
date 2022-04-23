import { callEndpoint } from './endpoint'
import { operations } from './types/api'
import { SafeTransactionEstimation, TransactionDetails, TransactionListPage } from './types/transactions'
import { FiatCurrencies, OwnedSafes, SafeBalanceResponse, SafeCollectibleResponse, SafeInfo } from './types/common'
import { ChainListResponse, ChainInfo } from './types/chains'
import { SafeAppsResponse } from './types/safe-apps'
import { MasterCopyReponse } from './types/master-copies'
import { DecodedDataResponse } from './types/decoded-data'
import { DEFAULT_BASE_URL } from './config'
export * from './types/safe-apps'
export * from './types/transactions'
export * from './types/chains'
export * from './types/common'
export * from './types/master-copies'
export * from './types/decoded-data'

// Can be set externally to a different CGW host
let baseUrl: string = DEFAULT_BASE_URL

/**
 * Set the base CGW URL, e.g. `https://safe-client.gnosis.io`
 */
export const setBaseUrl = (url: string): void => {
  baseUrl = url
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * Get basic information about a Safe. E.g. owners, modules, version etc
 */
export function getSafeInfo(chainId: string, address: string, signal?: AbortSignal): Promise<SafeInfo> {
  return callEndpoint({
    baseUrl,
    path: '/v1/chains/{chainId}/safes/{address}',
    parameters: { path: { chainId, address } },
    signal,
  })
}

/**
 * Get the total balance and all assets stored in a Safe
 */
export function getBalances(
  chainId: string,
  address: string,
  currency = 'usd',
  query: operations['safes_balances_list']['parameters']['query'] = {},
  signal?: AbortSignal,
): Promise<SafeBalanceResponse> {
  return callEndpoint({
    baseUrl,
    path: '/v1/chains/{chainId}/safes/{address}/balances/{currency}',
    parameters: {
      path: { chainId, address, currency },
      query,
    },
    signal,
  })
}

/**
 * Get a list of supported fiat currencies (e.g. USD, EUR etc)
 */
export function getFiatCurrencies(signal?: AbortSignal): Promise<FiatCurrencies> {
  return callEndpoint({ baseUrl, path: '/v1/balances/supported-fiat-codes', signal })
}

/**
 * Get the addresses of all Safes belonging to an owner
 */
export function getOwnedSafes(chainId: string, address: string, signal?: AbortSignal): Promise<OwnedSafes> {
  return callEndpoint({
    baseUrl,
    path: '/v1/chains/{chainId}/owners/{address}/safes',
    parameters: { path: { chainId, address } },
    signal,
  })
}

/**
 * Get NFTs stored in a Safe
 */
export function getCollectibles(
  chainId: string,
  address: string,
  query: operations['safes_collectibles_list']['parameters']['query'] = {},
  signal?: AbortSignal,
): Promise<SafeCollectibleResponse[]> {
  return callEndpoint({
    baseUrl,
    path: '/v1/chains/{chainId}/safes/{address}/collectibles',
    parameters: {
      path: { chainId, address },
      query,
    },
    signal,
  })
}

/**
 * Get a list of past Safe transactions
 */
export function getTransactionHistory(
  chainId: string,
  address: string,
  pageUrl?: string,
  signal?: AbortSignal,
): Promise<TransactionListPage> {
  return callEndpoint({
    baseUrl,
    path: '/v1/chains/{chainId}/safes/{safe_address}/transactions/history',
    parameters: { path: { chainId, safe_address: address }, query: {} },
    rawUrl: pageUrl,
    signal,
  })
}

/**
 * Get the list of pending transactions
 */
export function getTransactionQueue(
  chainId: string,
  address: string,
  pageUrl?: string,
  signal?: AbortSignal,
): Promise<TransactionListPage> {
  return callEndpoint({
    baseUrl,
    path: '/v1/chains/{chainId}/safes/{safe_address}/transactions/queued',
    parameters: { path: { chainId, safe_address: address }, query: {} },
    rawUrl: pageUrl,
    signal,
  })
}

/**
 * Get the details of an individual transaction by its id
 */
export function getTransactionDetails(
  chainId: string,
  transactionId: string,
  signal?: AbortSignal,
): Promise<TransactionDetails> {
  return callEndpoint({
    baseUrl,
    path: '/v1/chains/{chainId}/transactions/{transactionId}',
    parameters: {
      path: { chainId, transactionId },
    },
    signal,
  })
}

/**
 * Request a gas estimate & recommmended tx nonce for a created transaction
 */
export function postSafeGasEstimation(
  chainId: string,
  address: string,
  body: operations['post_safe_gas_estimation']['parameters']['body'],
  signal?: AbortSignal,
): Promise<SafeTransactionEstimation> {
  return callEndpoint({
    baseUrl,
    path: '/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations',
    parameters: {
      path: { chainId, safe_address: address },
      body,
    },
    signal,
  })
}

/**
 * Propose a new transaction for other owners to sign/execute
 */
export function proposeTransaction(
  chainId: string,
  address: string,
  body: operations['propose_transaction']['parameters']['body'],
  signal?: AbortSignal,
): Promise<TransactionDetails> {
  return callEndpoint({
    baseUrl,
    path: '/v1/chains/{chainId}/transactions/{safe_address}/propose',
    parameters: {
      path: { chainId, safe_address: address },
      body,
    },
    signal,
  })
}

/**
 * Returns all defined chain configs
 */
export function getChainsConfig(
  query?: operations['chains_list']['parameters']['query'],
  signal?: AbortSignal,
): Promise<ChainListResponse> {
  return callEndpoint({
    baseUrl,
    path: '/v1/chains',
    parameters: {
      query,
    },
    signal,
  })
}

/**
 * Returns a chain config
 */
export function getChainConfig(chainId: string, signal?: AbortSignal): Promise<ChainInfo> {
  return callEndpoint({
    baseUrl,
    path: '/v1/chains/{chainId}',
    parameters: {
      path: { chainId: chainId },
    },
    signal,
  })
}

/**
 * Returns Safe Apps List
 */
export function getSafeApps(
  chainId: string,
  query: operations['safe_apps_read']['parameters']['query'] = {},
  signal?: AbortSignal,
): Promise<SafeAppsResponse> {
  return callEndpoint({
    baseUrl,
    path: '/v1/chains/{chainId}/safe-apps',
    parameters: {
      path: { chainId: chainId },
      query,
    },
    signal,
  })
}

/**
 * Returns list of Master Copies
 */
export function getMasterCopies(chainId: string, signal?: AbortSignal): Promise<MasterCopyReponse> {
  return callEndpoint({
    baseUrl,
    path: '/v1/chains/{chainId}/about/master-copies',
    parameters: {
      path: { chainId: chainId },
    },
    signal,
  })
}

/**
 * Returns decoded data
 */
export function getDecodedData(
  chainId: string,
  encodedData: operations['data_decoder']['parameters']['body']['data'],
  signal?: AbortSignal,
): Promise<DecodedDataResponse> {
  return callEndpoint({
    baseUrl,
    path: '/v1/chains/{chainId}/data-decoder',
    parameters: {
      path: { chainId: chainId },
      body: { data: encodedData },
    },
    signal,
  })
}
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
