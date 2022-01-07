enum SafeAppAccessPolicies {
  NoRestrictions = 'NO_RESTRICTIONS',
  DomainAllowlist = 'DOMAIN_ALLOWLIST',
}

export type SafeAppNoRestrictionsPolicy = {
  type: SafeAppAccessPolicies.NoRestrictions
}

export type SafeAppDomainAllowlistPolicy = {
  type: SafeAppAccessPolicies.DomainAllowlist
  value: string[]
}

export type SafeAppsAccessControlPolicies = SafeAppNoRestrictionsPolicy | SafeAppDomainAllowlistPolicy

export type SafeAppProvider = {
  url: string
  name: string
}

export type SafeAppData = {
  id: number
  url: string
  name: string
  iconUrl: string
  description: string
  chainIds: string[]
  provider?: SafeAppProvider
  accessControl: SafeAppsAccessControlPolicies
}

export type SafeAppsResponse = [SafeAppData]
