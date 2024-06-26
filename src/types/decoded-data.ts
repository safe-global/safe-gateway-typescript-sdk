import type { SwapOrder, TwapOrder } from './transactions'

export enum ConfirmationViewTypes {
  COW_SWAP_ORDER = 'COW_SWAP_ORDER',
  COW_SWAP_TWAP_ORDER = 'COW_SWAP_TWAP_ORDER',
}

export type DecodedDataRequest = {
  data: string
  to?: string
}

type ParamValue = string | ParamValue[]

export type DecodedDataBasicParameter = {
  name: string
  type: string
  value: ParamValue
}

export type DecodedDataParameterValue = {
  operation: 0 | 1
  to: string
  value: string
  data: string | null
  dataDecoded?: {
    method: string
    parameters: DecodedDataBasicParameter[]
  }
}

export type DecodedDataParameter = {
  valueDecoded?: DecodedDataParameterValue[]
} & DecodedDataBasicParameter

export type DecodedDataResponse = {
  method: string
  parameters: DecodedDataParameter[]
}

export type BaselineConfirmationView = {
  type: 'GENERIC'
} & DecodedDataResponse

export type SwapOrderConfirmationView = {
  type: ConfirmationViewTypes.COW_SWAP_ORDER
} & DecodedDataResponse &
  Omit<SwapOrder, 'type' | 'humanDescription' | 'richDecodedInfo'>

export type TwapOrderConfirmationView = {
  type: ConfirmationViewTypes.COW_SWAP_TWAP_ORDER
} & DecodedDataResponse &
  Omit<TwapOrder, 'type' | 'humanDescription' | 'richDecodedInfo'>

export type OrderConfirmationView = SwapOrderConfirmationView | TwapOrderConfirmationView
