export type ParamValue = string | ParamValue[]

export enum Operation {
  CALL = 0,
  DELEGATE = 1,
}

export type InternalTransaction = {
  operation: Operation
  to: string
  value: string | null
  data: string | null
  dataDecoded: DataDecoded | null
}

export type ValueDecodedType = InternalTransaction[]

export type Parameter = {
  name: string
  type: string
  value: ParamValue
  valueDecoded: ValueDecodedType | null
}

export type DataDecoded = {
  method: string
  parameters: Parameter[] | null
}

export type AddressEx = {
  value: string
  name: string | null
  logoUri: string | null
}

export enum TransactionStatus {
  AWAITING_CONFIRMATIONS = 'AWAITING_CONFIRMATIONS',
  AWAITING_EXECUTION = 'AWAITING_EXECUTION',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  PENDING_FAILED = 'PENDING_FAILED',
  WILL_BE_REPLACED = 'WILL_BE_REPLACED',
}

export enum TransferDirection {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING',
  UNKNOWN = 'UNKNOWN',
}

export enum TokenType {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  NATIVE_COIN = 'NATIVE_COIN',
}

export type Erc20Transfer = {
  type: TokenType.ERC20
  tokenAddress: string
  tokenName: string | null
  tokenSymbol: string | null
  logoUri: string | null
  decimals: number | null
  value: string
}

export type Erc721Transfer = {
  type: TokenType.ERC721
  tokenAddress: string
  tokenId: string
  tokenName: string | null
  tokenSymbol: string | null
  logoUri: string | null
}

export type NativeCoinTransfer = {
  type: TokenType.NATIVE_COIN
  value: string
}

export type TransferInfo = Erc20Transfer | Erc721Transfer | NativeCoinTransfer

export interface Transfer {
  type: 'Transfer'
  sender: AddressEx
  recipient: AddressEx
  direction: TransferDirection
  transferInfo: TransferInfo
}

export type SetFallbackHandler = {
  type: 'SET_FALLBACK_HANDLER'
  handler: AddressEx
}

export type AddOwner = {
  type: 'ADD_OWNER'
  owner: AddressEx
  threshold: number
}

export type RemoveOwner = {
  type: 'REMOVE_OWNER'
  owner: AddressEx
  threshold: number
}

export type SwapOwner = {
  type: 'SWAP_OWNER'
  oldOwner: AddressEx
  newOwner: AddressEx
}

export type ChangeThreshold = {
  type: 'CHANGE_THRESHOLD'
  threshold: number
}

export type ChangeImplementation = {
  type: 'CHANGE_IMPLEMENTATION'
  implementation: AddressEx
}

export type EnableModule = {
  type: 'ENABLE_MODULE'
  module: AddressEx
}

export type DisableModule = {
  type: 'DISABLE_MODULE'
  module: AddressEx
}

export type SettingsInfo =
  | SetFallbackHandler
  | AddOwner
  | RemoveOwner
  | SwapOwner
  | ChangeThreshold
  | ChangeImplementation
  | EnableModule
  | DisableModule

export type SettingsChange = {
  type: 'SettingsChange'
  dataDecoded: DataDecoded
  settingsInfo: SettingsInfo | null
}

export interface Custom {
  type: 'Custom'
  to: AddressEx
  dataSize: string
  value: string
  methodName: string | null
  actionCount: number | null
  isCancellation: boolean
}

export type MultiSend = {
  type: 'Custom'
  to: AddressEx
  dataSize: string
  value: string
  methodName: 'multiSend'
  actionCount: number
  isCancellation: boolean
}

export type Creation = {
  type: 'Creation'
  creator: AddressEx
  transactionHash: string
  implementation: AddressEx | null
  factory: AddressEx | null
}

export type TransactionInfo = Transfer | SettingsChange | Custom | MultiSend | Creation

export type ModuleExecutionInfo = {
  type: 'MODULE'
  address: AddressEx
}

export type MultisigExecutionInfo = {
  type: 'MULTISIG'
  nonce: number
  confirmationsRequired: number
  confirmationsSubmitted: number
  missingSigners: AddressEx[] | null
}

export type ExecutionInfo = ModuleExecutionInfo | MultisigExecutionInfo

export type TransactionSummary = {
  id: string
  timestamp: number
  txStatus: TransactionStatus
  txInfo: TransactionInfo
  executionInfo?: ExecutionInfo
  safeAppInfo?: SafeAppInfo
}

export type Transaction = {
  transaction: TransactionSummary
  conflictType: 'None' | 'HasNext' | 'End'
  type: 'TRANSACTION'
}

export type DateLabel = {
  timestamp: number
  type: 'DATE_LABEL'
}

export type Label = {
  label: string
  type: 'LABEL'
}

export type ConflictHeader = {
  nonce: number
  type: 'CONFLICT_HEADER'
}

export type TransactionListItem = Transaction | Label | ConflictHeader

type Page<T> = {
  next?: string
  previous?: string
  results: Array<T>
}

export type TransactionListPage = Page<TransactionListItem>

export type MultisigTransactionRequest = {
  to: string
  value: string
  data: string | null
  nonce: string
  operation: Operation
  safeTxGas: string
  baseGas: string
  gasPrice: string
  gasToken: string
  refundReceiver: string | null
  safeTxHash: string
  sender: string
  signature?: string | null
  origin: string | null
}

/* Transaction details types */
export type SafeAppInfo = {
  name: string
  url: string
  logoUri: string
}

export type TransactionData = {
  hexData: string | null
  dataDecoded: DataDecoded | null
  to: AddressEx
  value: string | null
  operation: Operation
  addressInfoIndex: { [key: string]: AddressEx } | null
}

export type ModuleExecutionDetails = {
  type: 'MODULE'
  address: AddressEx
}

export type MultisigConfirmation = {
  signer: AddressEx
  signature: string | null
  submittedAt: number
}

export type TokenInfo = {
  address: string
  decimals: number
  symbol: string
  name: string
  logoUri: string | null
}

export type MultisigExecutionDetails = {
  type: 'MULTISIG'
  submittedAt: number
  nonce: number
  safeTxGas: string
  baseGas: string
  gasPrice: string
  gasToken: string
  refundReceiver: AddressEx
  safeTxHash: string
  executor: AddressEx | null
  signers: AddressEx[]
  confirmationsRequired: number
  confirmations: MultisigConfirmation[]
  rejectors: AddressEx[] | null
  gasTokenInfo: TokenInfo | null
}

export type DetailedExecutionInfo = ModuleExecutionDetails | MultisigExecutionDetails

export type TransactionDetails = {
  txId: string
  executedAt: number | null
  txStatus: TransactionStatus
  txInfo: TransactionInfo
  txData: TransactionData | null
  detailedExecutionInfo: DetailedExecutionInfo | null
  txHash: string | null
  safeAppInfo: SafeAppInfo | null
}

/* Transaction details types end */

/* Transaction estimation types */

export type SafeTransactionEstimationRequest = {
  to: string
  value: string
  data: string
  operation: Operation
}

export type SafeTransactionEstimation = {
  latestNonce: number
  safeTxGas: string
}

/* Transaction estimation types end */
