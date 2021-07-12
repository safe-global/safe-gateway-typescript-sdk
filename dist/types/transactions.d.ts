import { definitions } from './gateway'

export type ParamValue = string | ParamValue[]

export type Operation = 'CALL' | 'DELEGATE'

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

export type TransactionStatus = 'AWAITING_CONFIRMATIONS'
  | 'AWAITING_EXECUTION'
  | 'CANCELLED'
  | 'FAILED'
  | 'SUCCESS'

export type TransferDirection = 'INCOMING' | 'OUTGOING' | 'UNKNOWN'

export type Transfer = {
  sender: string
  senderInfo: AddressInfo | null
  recipient: string
  recipientInfo: AddressInfo | null
  direction: TransferDirection
}

export type SettingsChange = {
  dataDecoded: DataDecoded,
  settingsInfo?: unknown
}

export type Custom = {
  to: string
  dataSize: string
  value: string
  methodName: string | null
  actionCount: number | null
  toInfo: AddressInfo | null
  isCancellation: boolean
}

export type Creation = unknown // TODO

export type TransactionInfo = Transfer
  | SettingsChange
  | Custom
  | Creation
  | unknown

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
  safeAppInfo?: definitions['SafeAppInfo']
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
