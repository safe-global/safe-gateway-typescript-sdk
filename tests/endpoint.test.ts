import { fetchData } from '../src/utils'
import { getEndpoint, postEndpoint } from '../src/endpoint'

jest.mock('../src/utils', () => {
  const originalModule = jest.requireActual('../src/utils')

  return {
    __esModule: true,
    ...originalModule,
    fetchData: jest.fn(() => Promise.resolve({ success: true })),
  }
})

describe('getEndpoint', () => {
  it('should accept just a path', async () => {
    await expect(getEndpoint('https://test.test', '/v1/balances/supported-fiat-codes')).resolves.toEqual({
      success: true,
    })

    expect(fetchData).toHaveBeenCalledWith('https://test.test/v1/balances/supported-fiat-codes')
  })

  it('should accept a path param', async () => {
    await expect(
      getEndpoint('https://test.test', '/v1/chains/{chainId}/safes/{address}', {
        path: { chainId: '4', address: '0x123' },
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith('https://test.test/v1/chains/4/safes/0x123')
  })

  it('should accept several path params', async () => {
    await expect(
      getEndpoint('https://test.test', '/v1/chains/{chainId}/safes/{address}/balances/{currency}', {
        path: { chainId: '4', address: '0x123', currency: 'usd' },
        query: {},
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith('https://test.test/v1/chains/4/safes/0x123/balances/usd')
  })

  it('should accept query params', async () => {
    await expect(
      getEndpoint('https://test.test', '/v1/chains/{chainId}/safes/{address}/balances/{currency}', {
        path: { chainId: '4', address: '0x123', currency: 'usd' },
        query: { exclude_spam: true },
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith('https://test.test/v1/chains/4/safes/0x123/balances/usd?exclude_spam=true')
  })

  it('should accept body', async () => {
    const body = {
      to: '0x123',
      value: 'test',
      data: '0x',
      nonce: '1',
      operation: 1,
      safeTxGas: '',
      baseGas: '100',
      gasPrice: '1',
      gasToken: '',
      refundReceiver: '',
      safeTxHash: '0x123',
      sender: '0x123',
      signature: '',
      origin: '',
    }

    await expect(
      postEndpoint('https://test.test', '/v1/chains/{chainId}/transactions/{safe_address}/propose', {
        path: { chainId: '4', safe_address: '0x123' },
        body,
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith('https://test.test/v1/chains/4/transactions/0x123/propose', body)
  })

  it('should accept a raw URL', async () => {
    await expect(
      getEndpoint(
        'https://test.test',
        '/v1/chains/{chainId}/safes/{address}/balances/{currency}',
        { path: { chainId: '4', address: '0x123', currency: 'usd' }, query: { exclude_spam: true } },
        '/test-url?raw=true',
      ),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith('/test-url?raw=true')
  })

  it('should call a data decoder POST endpoint', async () => {
    await expect(
      postEndpoint('https://test.test', '/v1/chains/{chainId}/data-decoder', {
        path: { chainId: '4' },
        body: { data: '0x123' },
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith('https://test.test/v1/chains/4/data-decoder', { data: '0x123' })
  })
})
