import { fetchData } from '../src/utils'
import { callEndpoint } from '../src/endpoint'

jest.mock('../src/utils', () => {
  const originalModule = jest.requireActual('../src/utils')

  return {
    __esModule: true,
    ...originalModule,
    fetchData: jest.fn(() => Promise.resolve({ success: true })),
  }
})

describe('callEndpoint', () => {
  it('should accept just a path', async () => {
    await expect(
      callEndpoint('https://safe-client.staging.gnosisdev.com/v1/balances/supported-fiat-codes'),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith(
      'https://safe-client.staging.gnosisdev.com/v1/balances/supported-fiat-codes',
      undefined,
    )
  })

  it('should accept query params', async () => {
    await expect(
      callEndpoint('https://safe-client.staging.gnosisdev.com/v1/chains/4/balances/0x123/usd', {
        query: { exclude_spam: true },
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith(
      'https://safe-client.staging.gnosisdev.com/v1/chains/4/balances/0x123/usd?exclude_spam=true',
      undefined,
    )
  })

  it('should accept body', async () => {
    await expect(
      callEndpoint('https://safe-client.staging.gnosisdev.com/v1/chains/4/transactions/0x123/propose', {
        body: { test: 'test' },
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith(
      'https://safe-client.staging.gnosisdev.com/v1/chains/4/transactions/0x123/propose',
      { test: 'test' },
    )
  })

  it('should accept a raw URL', async () => {
    await expect(
      callEndpoint(
        'https://safe-client.staging.gnosisdev.com/v1/chains/4/balances/0x123/usd',
        { query: { exclude_spam: true } },
        '/test-url?raw=true',
      ),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith('/test-url?raw=true')
  })
})
