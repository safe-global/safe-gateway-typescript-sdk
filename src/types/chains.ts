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

export type GasPriceOracle = {
  type: 'ORACLE'
  uri: string
  gasParameter: string
  gweiFactor: string
}

export type GasPriceFixed = {
  type: 'FIXED'
  weiValue: string
}

export type GasPrices = (GasPriceOracle | GasPriceFixed)[]

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
  gasPrice?: GasPrices
  ensRegistryAddress?: string
}

export type ChainListResponse = {
  next?: string
  previous?: string
  results: ChainConfig[]
}
