import { callEndpoint } from './endpoint'
import { operations } from './types/api'
import { SafeTransactionEstimation, TransactionDetails, TransactionListPage } from './types/transactions'
import {
  FiatCurrencies,
  OwnedSafes,
  SafeBalanceResponse,
  SafeCollectibleResponse,
  SafeIncomingTransfersResponse,
  SafeInfo,
  SafeModuleTransactionsResponse,
  SafeMultisigTransactionsResponse,
} from './types/common'
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
export function getSafeInfo(chainId: string, address: string): Promise<SafeInfo> {
  return callEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{address}', { path: { chainId, address } })
}

/**
 * Get filterable list of incoming transactions
 */
export function getIncomingTransfers(
  chainId: string,
  address: string,
  query?: operations['incoming_transfers']['parameters']['query'],
): Promise<SafeIncomingTransfersResponse> {
  return callEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{address}/incoming-transfers/', {
    path: { chainId, address },
    query,
  })
}

/**
 * Get filterable list of module transactions
 */
export function getModuleTransactions(
  chainId: string,
  address: string,
  query?: operations['module_transactions']['parameters']['query'],
): Promise<SafeModuleTransactionsResponse> {
  return callEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{address}/module-transactions/', {
    path: { chainId, address },
    query,
  })
}

/**
 * Get filterable list of multisig transactions
 */
export function getMultisigTransactions(
  chainId: string,
  address: string,
  query?: operations['multisig_transactions']['parameters']['query'],
): Promise<SafeMultisigTransactionsResponse> {
  return callEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{address}/multisig-transactions/', {
    path: { chainId, address },
    query,
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
): Promise<SafeBalanceResponse> {
  return callEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{address}/balances/{currency}', {
    path: { chainId, address, currency },
    query,
  })
}

/**
 * Get a list of supported fiat currencies (e.g. USD, EUR etc)
 */
export function getFiatCurrencies(): Promise<FiatCurrencies> {
  return callEndpoint(baseUrl, '/v1/balances/supported-fiat-codes')
}

/**
 * Get the addresses of all Safes belonging to an owner
 */
export function getOwnedSafes(chainId: string, address: string): Promise<OwnedSafes> {
  return callEndpoint(baseUrl, '/v1/chains/{chainId}/owners/{address}/safes', { path: { chainId, address } })
}

/**
 * Get NFTs stored in a Safe
 */
export function getCollectibles(
  chainId: string,
  address: string,
  query: operations['safes_collectibles_list']['parameters']['query'] = {},
): Promise<SafeCollectibleResponse[]> {
  return callEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{address}/collectibles', {
    path: { chainId, address },
    query,
  })
}

/**
 * Get a list of past Safe transactions
 */
export function getTransactionHistory(
  chainId: string,
  address: string,
  pageUrl?: string,
): Promise<TransactionListPage> {
  return callEndpoint(
    baseUrl,
    '/v1/chains/{chainId}/safes/{safe_address}/transactions/history',
    { path: { chainId, safe_address: address }, query: {} },
    pageUrl,
  )
}

/**
 * Get the list of pending transactions
 */
export function getTransactionQueue(chainId: string, address: string, pageUrl?: string): Promise<TransactionListPage> {
  return callEndpoint(
    baseUrl,
    '/v1/chains/{chainId}/safes/{safe_address}/transactions/queued',
    { path: { chainId, safe_address: address }, query: {} },
    pageUrl,
  )
}

/**
 * Get the details of an individual transaction by its id
 */
export function getTransactionDetails(chainId: string, transactionId: string): Promise<TransactionDetails> {
  return callEndpoint(baseUrl, '/v1/chains/{chainId}/transactions/{transactionId}', {
    path: { chainId, transactionId },
  })
}

/**
 * Request a gas estimate & recommmended tx nonce for a created transaction
 */
export function postSafeGasEstimation(
  chainId: string,
  address: string,
  body: operations['post_safe_gas_estimation']['parameters']['body'],
): Promise<SafeTransactionEstimation> {
  return callEndpoint(baseUrl, '/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations', {
    path: { chainId, safe_address: address },
    body,
  })
}

/**
 * Propose a new transaction for other owners to sign/execute
 */
export function proposeTransaction(
  chainId: string,
  address: string,
  body: operations['propose_transaction']['parameters']['body'],
): Promise<TransactionDetails> {
  return callEndpoint(baseUrl, '/v1/chains/{chainId}/transactions/{safe_address}/propose', {
    path: { chainId, safe_address: address },
    body,
  })
}

/**
 * Returns all defined chain configs
 */
export function getChainsConfig(query?: operations['chains_list']['parameters']['query']): Promise<ChainListResponse> {
  return callEndpoint(baseUrl, '/v1/chains', {
    query,
  })
}

/**
 * Returns a chain config
 */
export function getChainConfig(chainId: string): Promise<ChainInfo> {
  return callEndpoint(baseUrl, '/v1/chains/{chainId}', {
    path: { chainId: chainId },
  })
}

/**
 * Returns Safe Apps List
 */
export function getSafeApps(
  chainId: string,
  query: operations['safe_apps_read']['parameters']['query'] = {},
): Promise<SafeAppsResponse> {
  return callEndpoint(baseUrl, '/v1/chains/{chainId}/safe-apps', {
    path: { chainId: chainId },
    query,
  })
}

/**
 * Returns list of Master Copies
 */
export function getMasterCopies(chainId: string): Promise<MasterCopyReponse> {
  return callEndpoint(baseUrl, '/v1/chains/{chainId}/about/master-copies', {
    path: { chainId: chainId },
  })
}

/**
 * Returns decoded data
 */
export function getDecodedData(
  chainId: string,
  encodedData: operations['data_decoder']['parameters']['body']['data'],
): Promise<DecodedDataResponse> {
  return callEndpoint(baseUrl, '/v1/chains/{chainId}/data-decoder', {
    path: { chainId: chainId },
    body: { data: encodedData },
  })
}
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
