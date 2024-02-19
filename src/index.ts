import { deleteEndpoint, getEndpoint, postEndpoint, putEndpoint } from './endpoint'
import type { operations } from './types/api'
import type {
  SafeTransactionEstimation,
  TransactionDetails,
  TransactionListPage,
  SafeIncomingTransfersResponse,
  SafeModuleTransactionsResponse,
  SafeMultisigTransactionsResponse,
  NoncesResponse,
} from './types/transactions'
import type {
  AllOwnedSafes,
  FiatCurrencies,
  OwnedSafes,
  SafeBalanceResponse,
  SafeCollectibleResponse,
  SafeCollectiblesPage,
} from './types/common'
import type { SafeInfo } from './types/safe-info'
import type { ChainListResponse, ChainInfo } from './types/chains'
import type { SafeAppsResponse } from './types/safe-apps'
import type { MasterCopyReponse } from './types/master-copies'
import type { DecodedDataResponse } from './types/decoded-data'
import type { SafeMessage, SafeMessageListPage } from './types/safe-messages'
import { DEFAULT_BASE_URL } from './config'
import type { DelegateResponse, DelegatesRequest } from './types/delegates'

export * from './types/safe-info'
export * from './types/safe-apps'
export * from './types/transactions'
export * from './types/chains'
export * from './types/common'
export * from './types/master-copies'
export * from './types/decoded-data'
export * from './types/safe-messages'
export * from './types/notifications'

// Can be set externally to a different CGW host
let baseUrl: string = DEFAULT_BASE_URL

/**
 * Set the base CGW URL
 */
export const setBaseUrl = (url: string): void => {
  baseUrl = url
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * Get basic information about a Safe. E.g. owners, modules, version etc
 */
export function getSafeInfo(chainId: string, address: string): Promise<SafeInfo> {
  return getEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{address}', { path: { chainId, address } })
}

/**
 * Get filterable list of incoming transactions
 */
export function getIncomingTransfers(
  chainId: string,
  address: string,
  query?: operations['incoming_transfers']['parameters']['query'],
  pageUrl?: string,
): Promise<SafeIncomingTransfersResponse> {
  return getEndpoint(
    baseUrl,
    '/v1/chains/{chainId}/safes/{address}/incoming-transfers/',
    {
      path: { chainId, address },
      query,
    },
    pageUrl,
  )
}

/**
 * Get filterable list of module transactions
 */
export function getModuleTransactions(
  chainId: string,
  address: string,
  query?: operations['module_transactions']['parameters']['query'],
  pageUrl?: string,
): Promise<SafeModuleTransactionsResponse> {
  return getEndpoint(
    baseUrl,
    '/v1/chains/{chainId}/safes/{address}/module-transactions/',
    {
      path: { chainId, address },
      query,
    },
    pageUrl,
  )
}

/**
 * Get filterable list of multisig transactions
 */
export function getMultisigTransactions(
  chainId: string,
  address: string,
  query?: operations['multisig_transactions']['parameters']['query'],
  pageUrl?: string,
): Promise<SafeMultisigTransactionsResponse> {
  return getEndpoint(
    baseUrl,
    '/v1/chains/{chainId}/safes/{address}/multisig-transactions/',
    {
      path: { chainId, address },
      query,
    },
    pageUrl,
  )
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
  return getEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{address}/balances/{currency}', {
    path: { chainId, address, currency },
    query,
  })
}

/**
 * Get a list of supported fiat currencies (e.g. USD, EUR etc)
 */
export function getFiatCurrencies(): Promise<FiatCurrencies> {
  return getEndpoint(baseUrl, '/v1/balances/supported-fiat-codes')
}

/**
 * Get the addresses of all Safes belonging to an owner
 */
export function getOwnedSafes(chainId: string, address: string): Promise<OwnedSafes> {
  return getEndpoint(baseUrl, '/v1/chains/{chainId}/owners/{address}/safes', { path: { chainId, address } })
}

/**
 * Get the addresses of all Safes belonging to an owner on all chains
 */
export function getAllOwnedSafes(address: string): Promise<AllOwnedSafes> {
  return getEndpoint(baseUrl, '/v1/owners/{address}/safes', { path: { address } })
}

/**
 * Get NFTs stored in a Safe
 */
export function getCollectibles(
  chainId: string,
  address: string,
  query: operations['safes_collectibles_list']['parameters']['query'] = {},
): Promise<SafeCollectibleResponse[]> {
  return getEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{address}/collectibles', {
    path: { chainId, address },
    query,
  })
}

/**
 * Get NFTs stored in a Safe
 */
export function getCollectiblesPage(
  chainId: string,
  address: string,
  query: operations['safes_collectibles_list_paginated']['parameters']['query'] = {},
  pageUrl?: string,
): Promise<SafeCollectiblesPage> {
  return getEndpoint(
    baseUrl,
    '/v2/chains/{chainId}/safes/{address}/collectibles',
    { path: { chainId, address }, query },
    pageUrl,
  )
}

/**
 * Get a list of past Safe transactions
 */
export function getTransactionHistory(
  chainId: string,
  address: string,
  query: operations['history_transactions']['parameters']['query'] = {},
  pageUrl?: string,
): Promise<TransactionListPage> {
  return getEndpoint(
    baseUrl,
    '/v1/chains/{chainId}/safes/{safe_address}/transactions/history',
    { path: { chainId, safe_address: address }, query },
    pageUrl,
  )
}

/**
 * Get the list of pending transactions
 */
export function getTransactionQueue(
  chainId: string,
  address: string,
  query: operations['queued_transactions']['parameters']['query'] = {},
  pageUrl?: string,
): Promise<TransactionListPage> {
  return getEndpoint(
    baseUrl,
    '/v1/chains/{chainId}/safes/{safe_address}/transactions/queued',
    { path: { chainId, safe_address: address }, query },
    pageUrl,
  )
}

/**
 * Get the details of an individual transaction by its id
 */
export function getTransactionDetails(chainId: string, transactionId: string): Promise<TransactionDetails> {
  return getEndpoint(baseUrl, '/v1/chains/{chainId}/transactions/{transactionId}', {
    path: { chainId, transactionId },
  })
}

/**
 * Delete a transaction by its safeTxHash
 */
export function deleteTransaction(
  chainId: string,
  safeTxHash: string,
  signature: operations['delete_transaction']['parameters']['body']['signature'],
): Promise<void> {
  return deleteEndpoint(baseUrl, '/v1/chains/{chainId}/transactions/{safeTxHash}', {
    path: { chainId, safeTxHash },
    body: { signature },
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
  return postEndpoint(baseUrl, '/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations', {
    path: { chainId, safe_address: address },
    body,
  })
}

export function getNonces(chainId: string, address: string): Promise<NoncesResponse> {
  return getEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/nonces', {
    path: { chainId, safe_address: address },
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
  return postEndpoint(baseUrl, '/v1/chains/{chainId}/transactions/{safe_address}/propose', {
    path: { chainId, safe_address: address },
    body,
  })
}

/**
 * Returns all defined chain configs
 */
export function getChainsConfig(query?: operations['chains_list']['parameters']['query']): Promise<ChainListResponse> {
  return getEndpoint(baseUrl, '/v1/chains', {
    query,
  })
}

/**
 * Returns a chain config
 */
export function getChainConfig(chainId: string): Promise<ChainInfo> {
  return getEndpoint(baseUrl, '/v1/chains/{chainId}', {
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
  return getEndpoint(baseUrl, '/v1/chains/{chainId}/safe-apps', {
    path: { chainId: chainId },
    query,
  })
}

/**
 * Returns list of Master Copies
 */
export function getMasterCopies(chainId: string): Promise<MasterCopyReponse> {
  return getEndpoint(baseUrl, '/v1/chains/{chainId}/about/master-copies', {
    path: { chainId: chainId },
  })
}

/**
 * Returns decoded data
 */
export function getDecodedData(
  chainId: string,
  encodedData: operations['data_decoder']['parameters']['body']['data'],
  to?: operations['data_decoder']['parameters']['body']['to'],
): Promise<DecodedDataResponse> {
  return postEndpoint(baseUrl, '/v1/chains/{chainId}/data-decoder', {
    path: { chainId: chainId },
    body: { data: encodedData, to },
  })
}

/**
 * Returns list of `SafeMessage`s
 */
export function getSafeMessages(chainId: string, address: string, pageUrl?: string): Promise<SafeMessageListPage> {
  return getEndpoint(
    baseUrl,
    '/v1/chains/{chainId}/safes/{safe_address}/messages',
    { path: { chainId, safe_address: address }, query: {} },
    pageUrl,
  )
}

/**
 * Returns a `SafeMessage`
 */
export function getSafeMessage(chainId: string, messageHash: string): Promise<Omit<SafeMessage, 'type'>> {
  return getEndpoint(baseUrl, '/v1/chains/{chainId}/messages/{message_hash}', {
    path: { chainId, message_hash: messageHash },
  })
}

/**
 * Propose a new `SafeMessage` for other owners to sign
 */
export function proposeSafeMessage(
  chainId: string,
  address: string,
  body: operations['propose_safe_message']['parameters']['body'],
): Promise<void> {
  return postEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/messages', {
    path: { chainId, safe_address: address },
    body,
  })
}

/**
 * Add a confirmation to a `SafeMessage`
 */
export function confirmSafeMessage(
  chainId: string,
  messageHash: string,
  body: operations['confirm_safe_message']['parameters']['body'],
): Promise<void> {
  return postEndpoint(baseUrl, '/v1/chains/{chainId}/messages/{message_hash}/signatures', {
    path: { chainId, message_hash: messageHash },
    body,
  })
}

/**
 * Returns a list of delegates
 */
export function getDelegates(chainId: string, query: DelegatesRequest = {}): Promise<DelegateResponse> {
  return getEndpoint(baseUrl, '/v1/chains/{chainId}/delegates', {
    path: { chainId },
    query,
  })
}

/**
 * Registers a device/Safe for notifications
 */
export function registerDevice(body: operations['register_device']['parameters']['body']): Promise<void> {
  return postEndpoint(baseUrl, '/v1/register/notifications', {
    body,
  })
}

/**
 * Unregisters a Safe from notifications
 */
export function unregisterSafe(chainId: string, address: string, uuid: string): Promise<void> {
  return deleteEndpoint(baseUrl, '/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}', {
    path: { chainId, safe_address: address, uuid },
  })
}

/**
 * Unregisters a device from notifications
 */
export function unregisterDevice(chainId: string, uuid: string): Promise<void> {
  return deleteEndpoint(baseUrl, '/v1/chains/{chainId}/notifications/devices/{uuid}', {
    path: { chainId, uuid },
  })
}

/**
 * Registers a email address for a safe signer.
 *
 * The signer wallet has to sign a message of format: `email-register-{chainId}-{safeAddress}-{emailAddress}-{signer}-{timestamp}`
 * The signature is valid for 5 minutes.
 *
 * @param chainId
 * @param safeAddress
 * @param body Signer address and email address
 * @param headers Signature and Signature timestamp
 * @returns 200 if signature matches the data
 */
export function registerEmail(
  chainId: string,
  safeAddress: string,
  body: operations['register_email']['parameters']['body'],
  headers: operations['register_email']['parameters']['headers'],
): Promise<void> {
  return postEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails', {
    path: { chainId, safe_address: safeAddress },
    body,
    headers,
  })
}

/**
 * Changes an already registered email address for a safe signer. The new email address still needs to be verified.
 *
 * The signer wallet has to sign a message of format: `email-edit-{chainId}-{safeAddress}-{emailAddress}-{signer}-{timestamp}`
 * The signature is valid for 5 minutes.
 *
 * @param chainId
 * @param safeAddress
 * @param body New email address
 * @param headers Signature and Signature timestamp
 * @returns 202 if signature matches the data
 */
export function changeEmail(
  chainId: string,
  safeAddress: string,
  signerAddress: string,
  body: operations['change_email']['parameters']['body'],
  headers: operations['change_email']['parameters']['headers'],
): Promise<void> {
  return putEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}', {
    path: { chainId, safe_address: safeAddress, signer: signerAddress },
    body,
    headers,
  })
}

/**
 * Resends an email verification code.
 */
export function resendEmailVerificationCode(
  chainId: string,
  safeAddress: string,
  signerAddress: string,
): Promise<void> {
  return postEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify-resend', {
    path: { chainId, safe_address: safeAddress, signer: signerAddress },
    body: '',
  })
}

/**
 * Verifies a pending email address registration.
 *
 * @param chainId
 * @param safeAddress
 * @param signerAddress address who signed the email registration
 * @param body Verification code
 */
export function verifyEmail(
  chainId: string,
  safeAddress: string,
  signerAddress: string,
  body: operations['verify_email']['parameters']['body'],
): Promise<void> {
  return putEndpoint(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify', {
    path: { chainId, safe_address: safeAddress, signer: signerAddress },
    body,
  })
}

/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
