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
