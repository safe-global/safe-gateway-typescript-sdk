import { definitions } from './gateway'

type ParamValue = string | ParamValue[]

type Operation = 'CALL' | 'DELEGATE'

type InternalTransaction = {
  operation: Operation
  to: string
  value: string | null
  data: string | null
  dataDecoded: DataDecoded | null
}

type ValueDecodedType = InternalTransaction[]

type Parameter = {
  name: string
  type: string
  value: ParamValue
  valueDecoded: ValueDecodedType | null
}

type DataDecoded = {
  method: string
  parameters: Parameter[] | null
}

type AddressInfo = {
  name: string
  logoUri: string | null
}

type TransactionStatus = 'AWAITING_CONFIRMATIONS'
    | 'AWAITING_EXECUTION'
    | 'CANCELLED'
    | 'FAILED'
    | 'SUCCESS'

type TransferDirection = 'INCOMING' | 'OUTGOING' | 'UNKNOWN'

type Transfer = {
  sender: string
  senderInfo: AddressInfo | null
  recipient: string
  recipientInfo: AddressInfo | null
  direction: definitions['TransferDirection']
}

type SettingsChange = {
  dataDecoded: DataDecoded,
  settings_info?: unknown
}

type Custom = {
  to: string
  dataSize: string
  value: string
  methodName: string | null
  actionCount: number | null
  toInfo: AddressInfo | null
  isCancellation: boolean
}

type Creation = unknown // TODO

type TransactionInfo = Transfer
  | SettingsChange
  | Custom
  | Creation
  | unknown

type ExecutionInfo = {
  nonce: number
  confirmationsRequired: number
  confirmationsSubmitted: number
  missingSigners: string[] | null
}

type TransactionSummary = {
  id: string
  timestamp: number
  tx_status: TransactionStatus
  tx_info: TransactionInfo
  execution_info?: ExecutionInfo
  safe_app_info?: definitions['SafeAppInfo']
}

type Transaction = {
  transaction: TransactionSummary
  conflict_type: 'None' | 'HasNext' | 'End'
}

type DateLabel = {
  timestamp: number
}

type Label = {
  label: string
}

type ConflictHeader = {
  nonce: number
}

export type TransactionListItem = Transaction | Label | ConflictHeader
