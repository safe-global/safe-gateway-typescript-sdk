import { AddressEx, TokenInfo } from './transactions'

export type SafeInfo = {
  address: AddressEx
  chainId: string
  nonce: number
  threshold: number
  owners: AddressEx[]
  implementation: AddressEx
  modules: AddressEx[]
  guard: AddressEx
  fallbackHandler: AddressEx
  version: string
  collectiblesTag: string
  txQueuedTag: string
  txHistoryTag: string
}

export type FiatCurrencies = string[]

export type OwnedSafes = { safes: string[] }

export type SafeBalanceResponse = {
  fiatTotal: string
  items: Array<{
    tokenInfo: TokenInfo
    balance: string
    fiatBalance: string
    fiatConversion: string
  }>
}

export type SafeCollectibleResponse = {
  address: string
  tokenName: string
  tokenSymbol: string
  logoUri: string
  id: string
  uri: string
  name: string
  description: string
  imageUri: string
  metadata: { [key: string]: string }
}

export type BaseRpcUri = {
  authentication?: string
  value?: string
}

export type BlockExplorerUriTemplate = {
  address: string
  txHash: string
}

export type Currency = {
  name: string
  symbol: string
  decimals: number
  logoUri?: string
}

export type Theme = {
  textColor: string
  backgroundColor: string
}

export type GasPrice = { [key: string]: unknown }

export type ChainConfig = {
  chainId: string
  chainName: string
  shortName: string
  description?: string
  l2: boolean
  rpcUri?: BaseRpcUri
  safeAppsRpcUri?: BaseRpcUri
  blockExplorerUriTemplate?: BlockExplorerUriTemplate
  nativeCurrency?: Currency
  transactionService?: string
  vpcTransactionService: string
  theme?: Theme
  gasPrice?: GasPrice
  ensRegistryAddress: string
  recommendedMasterCopyVersion: string
}

export type ChainsConfigResponse = {
  count: number
  next?: string
  previous?: string
  results: ChainConfig[]
}
