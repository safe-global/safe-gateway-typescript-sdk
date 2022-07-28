import { getCollectibles, getCollectiblesPage, setBaseUrl } from '../src'
import config from './config'

describe('getCollectibles tests', () => {
  beforeAll(() => {
    setBaseUrl(config.baseUrl)
  })

  it('should fetch collectibles', async () => {
    const address = '0xb3b83bf204C458B461de9B0CD2739DB152b4fa5A'
    const data = await getCollectibles('4', address)

    expect(data.length).toBeGreaterThanOrEqual(1)
    expect(typeof data[1].address).toBe('string')
    expect(data[0].description).toBeDefined()
    expect(data[0].name).toBeDefined()
    expect(data[0].metadata).toBeDefined()
    expect(data[0].tokenName.length).toBeGreaterThan(0)
    expect(data[0].tokenSymbol.length).toBeGreaterThan(0)
    expect(data[0].uri).toMatch(/^https?:\/\//)
  })

  it('should fetch paginated collectibles', async () => {
    const address = '0xA77DE01e157f9f57C7c4A326eeE9C4874D0598b6'
    const json = await getCollectiblesPage('1', address)
    const data = json.results

    expect(json.next).toBe(
      'https://safe-client.staging.gnosisdev.com/v2/chains/1/safes/0xA77DE01e157f9f57C7c4A326eeE9C4874D0598b6/collectibles?cursor=limit%3D10%26offset%3D10',
    )
    expect(json.previous).toBe(null)
    expect(data.length).toBeGreaterThan(1)
    expect(typeof data[1].address).toBe('string')
    expect(data[0].description).toBeDefined()
    expect(data[0].name).toBeDefined()
    expect(data[0].metadata).toBeDefined()
    expect(data[0].tokenName.length).toBeGreaterThan(0)
    expect(data[0].tokenSymbol.length).toBeGreaterThan(0)
    expect(data[0].uri).toMatch(/^https?:\/\//)
  })
})
