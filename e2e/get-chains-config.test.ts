import { getChainsConfig, getChainConfig, setBaseUrl } from '../src'
import config from './config'

const mainnetChainId = '1'
const rinkebyChainId = '4'
const polygonChainId = '137'

describe('getChainsConfig & getChainConfig tests', () => {
  beforeAll(() => {
    setBaseUrl(config.baseUrl)
  })

  describe('getChainsConfig tests', () => {
    it('Returns all chains config', async () => {
      const chainConfig = await getChainsConfig()

      expect(chainConfig.results).toBe
      expect(chainConfig.results).toBeDefined()

      // mainnet config should be present
      const mainnetConfig = chainConfig.results.find((config) => config.chainId === mainnetChainId)
      expect(mainnetConfig).toBeDefined()

      // rinkeby config should be present
      const rinkebyConfig = chainConfig.results.find((config) => config.chainId === rinkebyChainId)
      expect(rinkebyConfig).toBeDefined()

      // polygon config should be present
      const polygonConfig = chainConfig.results.find((config) => config.chainId === polygonChainId)
      expect(polygonConfig).toBeDefined()
    })
  })

  describe('getChainConfig/{chainId} tests', () => {
    it('Returns Mainnet config', async () => {
      const mainnetConfig = await getChainConfig(mainnetChainId)

      expect(mainnetConfig).toBeDefined()
      expect(mainnetConfig.chainId).toBe(mainnetChainId)
      expect(mainnetConfig.chainName).toBe('Ethereum')
      expect(mainnetConfig.shortName).toBe('eth')
      expect(mainnetConfig.l2).toBe(false)

      // currency config
      const currency = mainnetConfig.nativeCurrency
      expect(currency).toBeDefined()
      expect(currency.name).toBe('Ether')
      expect(currency.symbol).toBe('ETH')
      expect(currency.decimals).toBe(18)
      expect(currency.logoUri).toBeDefined()

      // gas price should be defined and contains an Oracle type
      expect(mainnetConfig.gasPrice).toBeDefined()
      const containsOracleGasPriceType = mainnetConfig.gasPrice.some(({ type }) => type === 'ORACLE')
      expect(containsOracleGasPriceType).toBe(true)
    })

    it('Returns Rinkeby config', async () => {
      const rinkebyConfig = await getChainConfig(rinkebyChainId)

      expect(rinkebyConfig).toBeDefined()
      expect(rinkebyConfig.chainId).toBe(rinkebyChainId)
      expect(rinkebyConfig.chainName).toBe('Rinkeby')
      expect(rinkebyConfig.shortName).toBe('rin')
      expect(rinkebyConfig.l2).toBe(false)

      // currency config
      const currency = rinkebyConfig.nativeCurrency
      expect(currency).toBeDefined()
      expect(currency.name).toBe('Ether')
      expect(currency.symbol).toBe('ETH')
      expect(currency.decimals).toBe(18)
      expect(currency.logoUri).toBeDefined()
    })

    it('Returns Polygon config', async () => {
      const polygonConfig = await getChainConfig(polygonChainId)

      expect(polygonConfig).toBeDefined()
      expect(polygonConfig.chainId).toBe(polygonChainId)
      expect(polygonConfig.chainName).toBe('Polygon')
      expect(polygonConfig.shortName).toBe('matic')
      expect(polygonConfig.l2).toBe(true)

      // currency config
      const currency = polygonConfig.nativeCurrency
      expect(currency).toBeDefined()
      expect(currency.name).toBe('Matic')
      expect(currency.symbol).toBe('MATIC')
      expect(currency.decimals).toBe(18)
      expect(currency.logoUri).toBeDefined()
    })
  })
})
