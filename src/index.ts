import { callEndpoint } from './endpoint'
import {
  MultisigTransactionRequest,
  SafeTransactionEstimation,
  SafeTransactionEstimationRequest,
  TransactionDetails,
  TransactionListPage,
} from './types/transactions'
import { FiatCurrencies, OwnedSafes, SafeBalanceResponse, SafeCollectibleResponse, SafeInfo } from './types/common'
import { MasterCopyReponse } from './types/master-copies'
import { ChainListResponse, ChainInfo } from './types/chains'
import { SafeAppsResponse } from './types/safe-apps'
import { DecodedDataResponse } from './types/decoded-data'
export * from './types/safe-apps'
export * from './types/transactions'
export * from './types/chains'
export * from './types/common'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * Get basic information about a Safe. E.g. owners, modules, version etc
 */
export function getSafeInfo(baseUrl: string, chainId: string, address: string): Promise<SafeInfo> {
  return callEndpoint(`${baseUrl}/chains/${chainId}/safes/${address}/`)
}

/**
 * Get the total balance and all assets stored in a Safe
 */
export function getBalances(
  baseUrl: string,
  chainId: string,
  address: string,
  currency = 'usd',
  query: {
    trusted?: boolean // Return trusted tokens
    exclude_spam?: boolean // Return spam tokens
  } = {},
): Promise<SafeBalanceResponse> {
  return callEndpoint(`${baseUrl}/chains/${chainId}/safes/${address}/balances/${currency}/`, {
    query,
  })
}

/**
 * Get a list of supported fiat currencies (e.g. USD, EUR etc)
 */
export function getFiatCurrencies(baseUrl: string): Promise<FiatCurrencies> {
  return callEndpoint(`${baseUrl}/balances/supported-fiat-codes`)
}

/**
 * Get the addresses of all Safes belonging to an owner
 */
export function getOwnedSafes(baseUrl: string, chainId: string, address: string): Promise<OwnedSafes> {
  return callEndpoint(`${baseUrl}/chains/${chainId}/owners/${address}/safes`)
}

/**
 * Get NFTs stored in a Safe
 */
export function getCollectibles(
  baseUrl: string,
  chainId: string,
  address: string,
  query: {
    trusted?: boolean // Return trusted tokens
    exclude_spam?: boolean // Return spam tokens
  } = {},
): Promise<SafeCollectibleResponse[]> {
  return callEndpoint(`${baseUrl}/chains/${chainId}/safes/${address}/collectibles/`, { query })
}

/**
 * Get a list of past Safe transactions
 */
export function getTransactionHistory(
  baseUrl: string,
  chainId: string,
  safeAddress: string,
  pageUrl?: string,
): Promise<TransactionListPage> {
  return callEndpoint(`${baseUrl}/chains/${chainId}/safes/${safeAddress}/transactions/history`, undefined, pageUrl)
}

/**
 * Get the list of pending transactions
 */
export function getTransactionQueue(
  baseUrl: string,
  chainId: string,
  safeAddress: string,
  pageUrl?: string,
): Promise<TransactionListPage> {
  return callEndpoint(`${baseUrl}/chains/${chainId}/safes/${safeAddress}/transactions/queued`, undefined, pageUrl)
}

/**
 * Get the details of an individual transaction by its id
 */
export function getTransactionDetails(
  baseUrl: string,
  chainId: string,
  transactionId: string,
): Promise<TransactionDetails> {
  return callEndpoint(`${baseUrl}/chains/${chainId}/transactions/${transactionId}`)
}

/**
 * Request a gas estimate for a created transaction
 */
export function postSafeGasEstimation(
  baseUrl: string,
  chainId: string,
  safeAddress: string,
  body: SafeTransactionEstimationRequest,
): Promise<SafeTransactionEstimation> {
  return callEndpoint(`${baseUrl}/chains/${chainId}/safes/${safeAddress}/multisig-transactions/estimations`, {
    body,
  })
}

/**
 * Propose a new transaction for other owners to sign/execute
 */
export function proposeTransaction(
  baseUrl: string,
  chainId: string,
  safeAddress: string,
  body: MultisigTransactionRequest,
): Promise<TransactionDetails> {
  return callEndpoint(`${baseUrl}/chains/${chainId}/transactions/${safeAddress}/propose`, {
    body,
  })
}

/**
 * Returns all defined chain configs
 */
export function getChainsConfig(
  baseUrl: string,
  query?: {
    ordering?: string
    limit?: number
    offset?: number
  },
): Promise<ChainListResponse> {
  return callEndpoint(`${baseUrl}/chains/`, {
    query,
  })
}

/**
 * Returns a chain config
 */
export function getChainConfig(baseUrl: string, chainId: string): Promise<ChainInfo> {
  return callEndpoint(`${baseUrl}/chains/${chainId}/`)
}

/**
 * Returns Safe Apps List
 */
export function getSafeApps(baseUrl: string, chainId: string): Promise<SafeAppsResponse> {
  return callEndpoint(`${baseUrl}/chains/${chainId}/safe-apps`)
}

/**
 * Returns List of Master Copies
 */
export function getMasterCopies(baseUrl: string, chainId: string): Promise<MasterCopyReponse> {
  return callEndpoint(`${baseUrl}/chains/${chainId}/about/master-copies`)
}

/**
 * Returns decoded data
 */
export function getDecodedData(baseUrl: string, chainId: string, encodedData: string): Promise<DecodedDataResponse> {
  return callEndpoint(`${baseUrl}/chains/${chainId}/data-decoder`, {
    body: {
      data: encodedData,
    },
  })
}
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
