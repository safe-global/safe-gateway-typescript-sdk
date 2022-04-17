import { getMasterCopies, setBaseUrl } from '../src'
import config from './config'

describe('get mastercopy tests', () => {
  beforeAll(() => {
    setBaseUrl(config.baseUrl)
  })

  it('should get master copy response', async () => {
    const masterCopies = await getMasterCopies('4')

    expect(Array.isArray(masterCopies)).toBe(true)

    // version 1.1.1 should be present
    const lastVersionRinkeby = masterCopies.find((mastercopy) => mastercopy.version === '1.1.1')
    expect(lastVersionRinkeby).toBeDefined()
    expect(lastVersionRinkeby.address).toBe('0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F')
  })
})
