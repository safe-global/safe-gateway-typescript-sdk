export enum RPC_AUTHENTICATION {
  API_KEY_PATH = 'API_KEY_PATH',
  NO_AUTHENTICATION = 'NO_AUTHENTICATION',
  UNKNOWN = 'UNKNOWN',
}

export type RpcUri = {
  authentication: RPC_AUTHENTICATION
  value: string
}

export type BlockExplorerUriTemplate = {
  address: string
  txHash: string
  api: string
}

export type NativeCurrency = {
  name: string
  symbol: string
  decimals: number
  logoUri: string
}

export type Theme = {
  textColor: string
  backgroundColor: string
}

export enum GAS_PRICE_TYPE {
  ORACLE = 'ORACLE',
  FIXED = 'FIXED',
  UNKNOWN = 'UNKNOWN',
}

export type GasPriceOracle = {
  type: GAS_PRICE_TYPE.ORACLE
  uri: string
  gasParameter: string
  gweiFactor: string
}

export type GasPriceFixed = {
  type: GAS_PRICE_TYPE.FIXED
  weiValue: string
}

export type GasPriceUnknown = {
  type: GAS_PRICE_TYPE.UNKNOWN
}

export type GasPrice = (GasPriceOracle | GasPriceFixed | GasPriceUnknown)[]

// https://gnosis.github.io/safe-client-gateway/docs/routes/chains/models/struct.ChainInfo.html
export type ChainInfo = {
  transactionService: string
  chainId: string
  chainName: string
  shortName: string
  l2: boolean
  description: string
  rpcUri: RpcUri
  blockExplorerUriTemplate: BlockExplorerUriTemplate
  nativeCurrency: NativeCurrency
  theme: Theme
  ensRegistryAddress?: string
  gasPrice: GasPrice
  disabledWallets: string[]
  features: string[]
}

export type ChainListResponse = {
  next: string | null
  previous: string | null
  results: ChainInfo[]
}
