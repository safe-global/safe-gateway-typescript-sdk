import { getSafeApps, setBaseUrl } from '../src'
import config from './config'

const rinkebyChainId = '4'

describe('getSafeApps tests', () => {
  beforeAll(() => {
    setBaseUrl(config.baseUrl)
  })

  it('Returns Safe Apps List', async () => {
    const safeAppsList = await getSafeApps(rinkebyChainId)

    expect(safeAppsList).toBeDefined()
    expect(Array.isArray(safeAppsList)).toBe(true)

    // safe app WalletConnect should be present
    const walletConnectSafeApp = safeAppsList.find((safeApp) => safeApp.name === 'WalletConnect')
    expect(walletConnectSafeApp).toBeDefined()

    // safe app Transaction Builder should be present
    const transactionBuilder = safeAppsList.find((safeApp) => safeApp.name === 'Transaction Builder')
    expect(transactionBuilder).toBeDefined()

    // safe app Drain Safe should be present
    const drainSafeApp = safeAppsList.find((safeApp) => safeApp.name === 'Drain Account')
    expect(drainSafeApp).toBeDefined()
  })
})
