import { getSafeInfo, setBaseUrl } from '../src'
import config from './config'

describe('getSafeInfo tests', () => {
  beforeAll(() => {
    setBaseUrl(config.baseUrl)
  })

  it('should get safe info on rinkeby', async () => {
    const address = '0x9B5dc27B104356516B05b02F6166a54F6D74e40B'
    const data = await getSafeInfo('4', address)

    expect(data.address.value).toBe(address)
    expect(data.chainId).toBe('4')
    expect(data.guard).toBe(null)
    // Nonce should match any positive integer number over 0
    expect(data.nonce).toBeGreaterThanOrEqual(0)
    expect(data.owners).toEqual([
      { value: '0x21D62C6894741DE97944D7844ED44D7782C66ABC' },
      { value: '0x661E1CF4aAAf6a95C89EA8c81D120E6c62adDFf9' },
      { value: '0x8814db983b821D65647C565fBf7c1092fC32437D' },
    ])
    expect(data.threshold).toBe(1)
    expect(data.version).toBe('1.1.1')
  })
})
