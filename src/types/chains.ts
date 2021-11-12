import { ETHEREUM_NETWORK, SHORT_NAME } from './networks'

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

export enum FEATURES {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  SAFE_APPS = 'SAFE_APPS',
  CONTRACT_INTERACTION = 'CONTRACT_INTERACTION',
  DOMAIN_LOOKUP = 'DOMAIN_LOOKUP',
  SPENDING_LIMIT = 'SPENDING_LIMIT',
}

export enum WALLETS {
  METAMASK = 'metamask',
  WALLET_CONNECT = 'walletConnect',
  TREZOR = 'trezor',
  LEDGER = 'ledger',
  TRUST = 'trust',
  FORTMATIC = 'fortmatic',
  PORTIS = 'portis',
  AUTHEREUM = 'authereum',
  TORUS = 'torus',
  COINBASE = 'coinbase',
  WALLET_LINK = 'walletLink',
  OPERA = 'opera',
  OPERA_TOUCH = 'operaTouch',
  LATTICE = 'lattice',
  KEYSTONE = 'keystone',
}

// https://gnosis.github.io/safe-client-gateway/docs/routes/chains/models/struct.ChainInfo.html
export type ChainConfig = {
  transactionService: string
  chainId: ETHEREUM_NETWORK
  chainName: string
  shortName: SHORT_NAME
  l2: boolean
  description: string
  rpcUri: RpcUri
  blockExplorerUriTemplate: BlockExplorerUriTemplate
  nativeCurrency: NativeCurrency
  theme: Theme
  ensRegistryAddress?: string
  gasPrice: GasPrice
  disabledWallets: WALLETS[]
  features: FEATURES[]
}

export type ChainListResponse = {
  next: string | null
  previous: string | null
  results: ChainConfig[]
}
