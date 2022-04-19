import { postSafeGasEstimation, setBaseUrl } from '../src'
import config from './config'

describe('postSafeGasEstimation tests', () => {
  beforeAll(() => {
    setBaseUrl(config.baseUrl)
  })

  it('should post a safe gas estimation', async () => {
    const result = await postSafeGasEstimation('4', '0x4f9BD57BCC68Bf7770429F137922B3afD23d83E7', {
      to: '0x4f9BD57BCC68Bf7770429F137922B3afD23d83E7',
      value: '1',
      data: '0x',
      operation: 0,
    })

    expect(result.safeTxGas).toBe('45006')
    // Nonce should match any positive integer number over 0
    expect(result.currentNonce).toBeGreaterThanOrEqual(0)
    expect(result.recommendedNonce).toBeGreaterThanOrEqual(0)
  })
})
