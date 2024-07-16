export type Account = {
  accountId: string
  groupId: string | null
  address: string
}

export type AccountDataType = {
  id: string
  name: string
  description: string | null
  isActive: boolean
}

export type AccountDataSetting = {
  name: string
  description: string | null
  enabled: boolean
}

export type CreateAccountDto = {
  address: string
}

export type UpsertAccountDataSettingsDto = {
  accountDataSettings: {
    id: string
    enabled: boolean
  }[]
}
