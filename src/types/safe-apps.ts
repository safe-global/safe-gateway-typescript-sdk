export type SafeAppNoRestrictionsPolicy = {
  type: 'NO_RESTRICTIONS'
}

export type SafeAppDomainAllowlistPolicy = {
  type: 'DOMAIN_ALLOWLIST'
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
