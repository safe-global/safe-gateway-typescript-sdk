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
}

export type SafeAppsResponse = [SafeAppData]
