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
      callEndpoint('https://safe-client.staging.gnosisdev.com', '/v1/balances/supported-fiat-codes'),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith(
      'https://safe-client.staging.gnosisdev.com/v1/balances/supported-fiat-codes',
      undefined,
    )
  })

  it('should accept a path param', async () => {
    await expect(
      callEndpoint('https://safe-client.staging.gnosisdev.com', '/v1/chains/{chainId}/safes/{address}', {
        path: { chainId: '4', address: '0x123' },
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith(
      'https://safe-client.staging.gnosisdev.com/v1/chains/4/safes/0x123',
      undefined,
    )
  })

  it('should accept several path params', async () => {
    await expect(
      callEndpoint('https://safe-client.staging.gnosisdev.com', '/v1/chains/{chainId}/safes/{address}/balances/{currency}', {
        path: { chainId: '4', address: '0x123', currency: 'usd' },
        query: {},
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith(
      'https://safe-client.staging.gnosisdev.com/v1/chains/4/safes/0x123/balances/usd',
      undefined,
    )
  })

  it('should accept query params', async () => {
    await expect(
      callEndpoint('https://safe-client.staging.gnosisdev.com', '/v1/chains/{chainId}/safes/{address}/balances/{currency}', {
        path: { chainId: '4', address: '0x123', currency: 'usd' },
        query: { exclude_spam: true },
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith(
      'https://safe-client.staging.gnosisdev.com/v1/chains/4/safes/0x123/balances/usd?exclude_spam=true',
      undefined,
    )
  })

  it('should accept body', async () => {
    const body = {
      to: '0x123',
      value: 'test',
      data: null,
      nonce: '1',
      operation: 1,
      safeTxGas: '',
      baseGas: '100',
      gasPrice: '1',
      gasToken: '',
      refundReceiver: null,
      safeTxHash: '0x123',
      sender: '0x123',
      signature: null,
      origin: null,
    }

    await expect(
      callEndpoint('https://safe-client.staging.gnosisdev.com', '/v1/chains/{chainId}/transactions/{safe_address}/propose', {
        path: { chainId: '4', safe_address: '0x123' },
        body
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith(
      'https://safe-client.staging.gnosisdev.com/v1/chains/4/transactions/0x123/propose',
      body
    )
  })

  it('should accept a raw URL', async () => {
    await expect(
      callEndpoint(
        'https://safe-client.staging.gnosisdev.com',
        '/v1/chains/{chainId}/safes/{address}/balances/{currency}',
        { path: { chainId: '4', address: '0x123', currency: 'usd' }, query: { exclude_spam: true } },
        '/test-url?raw=true',
      ),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith('/test-url?raw=true')
  })
})
