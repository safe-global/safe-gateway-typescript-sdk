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

export type AddressInfo = {
  name: string
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

export type Erc20Transfer = {
  type: 'ERC20'
  tokenAddress: string
  tokenName: string | null
  tokenSymbol: string | null
  logoUri: string | null
  decimals: number | null
  value: string
}

export type Erc721Transfer = {
  type: 'ERC721'
  tokenAddress: string
  tokenId: string
  tokenName: string | null
  tokenSymbol: string | null
  logoUri: string | null
  decimals: number | null
  value: string
}

export type NativeTransfer = {
  type: 'ETHER' | 'NATIVE_TOKEN'
  value: string
  tokenSymbol: string | null
  decimals: number | null
}

export type TransferInfo = Erc20Transfer | Erc721Transfer | NativeTransfer

export type Transfer = {
  type: 'Transfer'
  sender: string
  senderInfo: AddressInfo | null
  recipient: string
  recipientInfo: AddressInfo | null
  direction?: TransferDirection
  transferInfo: TransferInfo
}

export type SetFallbackHandler = {
  type: 'SET_FALLBACK_HANDLER'
  handler: string
}

export type AddOwner = {
  type: 'ADD_OWNER'
  owner: string
  threshold: number
}

export type RemoveOwner = {
  type: 'REMOVE_OWNER'
  owner: string
  threshold: number
}

export type SwapOwner = {
  type: 'SWAP_OWNER'
  oldOwner: string
  newOwner: string
}

export type ChangeThreshold = {
  type: 'CHANGE_THRESHOLD'
  threshold: number
}

export type ChangeImplementation = {
  type: 'CHANGE_IMPLEMENTATION'
  implementation: string
}

export type EnableModule = {
  type: 'ENABLE_MODULE'
  module: string
}

export type DisableModule = {
  type: 'DISABLE_MODULE'
  module: string
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

export type BaseCustom = {
  type: 'Custom'
  to: string
  dataSize: string
  value: string
  isCancellation: boolean
  toInfo?: AddressInfo
}

export type Custom = BaseCustom & {
  methodName: string | null
  actionCount: number | null
}

export type MultiSend = BaseCustom & {
  methodName: 'multiSend'
  actionCount: number
}

export type Creation = {
  type: 'Creation'
  creator: string
  transactionHash: string
  implementation: string | null
  factory: string | null
}

export type TransactionInfo = Transfer | SettingsChange | Custom | MultiSend | Creation

export type ExecutionInfo = {
  nonce: number
  confirmationsRequired: number
  confirmationsSubmitted: number
  missingSigners: string[] | null
}

export type TransactionSummary = {
  id: string
  timestamp: number
  txStatus: TransactionStatus
  txInfo: TransactionInfo
  executionInfo?: ExecutionInfo
  safeAppInfo?: {
    name: string
    url: string
    logoUrl: string
  }
}

export type Transaction = {
  transaction: TransactionSummary
  conflictType: 'None' | 'HasNext' | 'End'
}

export type DateLabel = {
  timestamp: number
}

export type Label = {
  label: string
}

export type ConflictHeader = {
  nonce: number
}

export type TransactionListItem = Transaction | Label | ConflictHeader

export interface MultisigTransactionRequest {
  to: string;
  value: string;
  data: string | null;
  nonce: string;
  operation: Operation;
  safeTxGas: string;
  baseGas: string;
  gasPrice: string;
  gasToken: string;
  refundReceiver: string | null;
  safeTxHash: string;
  sender: string;
  signature: string;
  origin: string | null;
}
