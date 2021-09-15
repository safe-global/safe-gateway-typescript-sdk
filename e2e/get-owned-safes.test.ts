import { getOwnedSafes } from '../src'
import config from './config'

describe('getOwnedSages tests', () => {
  it('should get owned safes on rinkeby', async () => {
    const data = await getOwnedSafes(config.baseUrl, '4', '0x661E1CF4aAAf6a95C89EA8c81D120E6c62adDFf9')

    expect(data.safes.sort()).toEqual([
      '0x9B5dc27B104356516B05b02F6166a54F6D74e40B',
      '0xb3b83bf204C458B461de9B0CD2739DB152b4fa5A',
    ])
  })

  it('should return an empty array if no owned safes', async () => {
    const data = await getOwnedSafes(config.baseUrl, '1', '0x661E1CF4aAAf6a95C89EA8c81D120E6c62adDFf9')
    expect(data).toEqual({ safes: [] })
  })

  it('should throw for bad addresses', async () => {
    const req = getOwnedSafes(config.baseUrl, '4', '0x661E1CF4aAAf6a95C89EA8c81D120E6c62adDfF9')
    await expect(req).rejects.toThrow('1: Checksum address validation failed')
  })
})
