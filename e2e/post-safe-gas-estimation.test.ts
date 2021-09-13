import { postSafeGasEstimation } from '../src'
import config from './config'

describe('postSafeGasEstimation tests', () => {
  it('should post a safe gas estimation', async () => {
    const result = await postSafeGasEstimation(config.baseUrl, '4', '0x4f9BD57BCC68Bf7770429F137922B3afD23d83E7', {
      to: '0x4f9BD57BCC68Bf7770429F137922B3afD23d83E7',
      value: '1',
      data: '0x',
      operation: 0,
    })
    console.log(result)
    expect(result.safeTxGas).toBe('43663')
    expect(result.latestNonce).toBe(1)
  })
})
