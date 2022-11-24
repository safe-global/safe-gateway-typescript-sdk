import type { AddressEx, Page } from './common'

export enum SafeMessageListItemType {
  DATE_LABEL = 'DATE_LABEL',
  MESSAGE = 'MESSAGE',
}

export type SafeMessageDateLabel = {
  type: SafeMessageListItemType.DATE_LABEL
  timestamp: number
}

export enum SafeMessageStatus {
  NEEDS_CONFIRMATION = 'NEEDS_CONFIRMATION',
  CONFIRMED = 'CONFIRMED',
}

export type SafeMessage = {
  type: SafeMessageListItemType.MESSAGE
  messageHash: string
  status: SafeMessageStatus
  logoUri: string | null
  name: string | null
  message: string | Record<string, any>
  creationTimestamp: number
  modifiedTimestamp: number
  confirmationsSubmitted: number
  confirmationsRequired: number
  proposedBy: AddressEx
  confirmations: {
    owner: AddressEx
    signature: string
  }[]
  preparedSignature?: string
}

export type SafeMessageListItem = SafeMessageDateLabel | SafeMessage

export type SafeMessageListPage = Page<SafeMessageListItem>

export type ProposeSafeMessageRequest = {
  message: string | Record<string, any>
  safeAppId: number
  signature: string
}

export type ConfirmSafeMessageRequest = {
  signature: string
}
