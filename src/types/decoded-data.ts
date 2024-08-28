import type { TokenInfo } from './common'
import type { SwapOrder, TwapOrder } from './transactions'

export enum ConfirmationViewTypes {
  GENERIC = 'GENERIC',
  COW_SWAP_ORDER = 'COW_SWAP_ORDER',
  COW_SWAP_TWAP_ORDER = 'COW_SWAP_TWAP_ORDER',
  KILN_NATIVE_STAKING_DEPOSIT = 'KILN_NATIVE_STAKING_DEPOSIT',
}

export type DecodedDataRequest = {
  data: string
  to?: string
  value?: string
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
  type: ConfirmationViewTypes.GENERIC
} & DecodedDataResponse

/* Swaps */
export type SwapOrderConfirmationView = {
  type: ConfirmationViewTypes.COW_SWAP_ORDER
} & DecodedDataResponse &
  Omit<SwapOrder, 'type' | 'humanDescription' | 'richDecodedInfo'>

export type TwapOrderConfirmationView = {
  type: ConfirmationViewTypes.COW_SWAP_TWAP_ORDER
} & DecodedDataResponse &
  Omit<TwapOrder, 'type' | 'humanDescription' | 'richDecodedInfo'>

export type AnySwapOrderConfirmationView = SwapOrderConfirmationView | TwapOrderConfirmationView

/* Staking */
export type NativeStakingDepositConfirmationView = {
  type: ConfirmationViewTypes.KILN_NATIVE_STAKING_DEPOSIT
  status: 'unknown'
  estimatedEntryTime: number
  estimatedExitTime: number
  estimatedWithdrawalTime: number
  fee: number
  monthlyNrr: number
  annualNrr: number
  tokenInfo: TokenInfo
  value: string
  expectedAnnualReward: string
  expectedMonthlyReward: string
  expectedFiatAnnualReward: number
  expectedFiatMonthlyReward: number
} & DecodedDataResponse

/* Union */
export type AnyConfirmationView =
  | BaselineConfirmationView
  | SwapOrderConfirmationView
  | TwapOrderConfirmationView
  | NativeStakingDepositConfirmationView
