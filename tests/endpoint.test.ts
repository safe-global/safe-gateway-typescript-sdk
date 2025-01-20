import { getData, fetchData } from '../src/utils'
import { deleteEndpoint, getEndpoint, postEndpoint, putEndpoint } from '../src/endpoint'

jest.mock('../src/utils', () => {
  const originalModule = jest.requireActual('../src/utils')

  return {
    __esModule: true,
    ...originalModule,
    fetchData: jest.fn(() => Promise.resolve({ success: true })),
    getData: jest.fn(() => Promise.resolve({ success: true })),
  }
})

describe('getEndpoint', () => {
  it('should accept just a path', async () => {
    await expect(getEndpoint('https://test.test', '/v1/balances/supported-fiat-codes')).resolves.toEqual({
      success: true,
    })

    expect(getData).toHaveBeenCalledWith('https://test.test/v1/balances/supported-fiat-codes', undefined, undefined)
  })

  it('should accept a path param', async () => {
    await expect(
      getEndpoint('https://test.test', '/v1/chains/{chainId}/safes/{address}', {
        path: { chainId: '4', address: '0x123' },
      }),
    ).resolves.toEqual({ success: true })

    expect(getData).toHaveBeenCalledWith('https://test.test/v1/chains/4/safes/0x123', undefined, undefined)
  })

  it('should accept several path params', async () => {
    await expect(
      getEndpoint('https://test.test', '/v1/chains/{chainId}/safes/{address}/balances/{currency}', {
        path: { chainId: '4', address: '0x123', currency: 'usd' },
        query: {},
      }),
    ).resolves.toEqual({ success: true })

    expect(getData).toHaveBeenCalledWith('https://test.test/v1/chains/4/safes/0x123/balances/usd', undefined, undefined)
  })

  it('should accept query params', async () => {
    await expect(
      getEndpoint('https://test.test', '/v1/chains/{chainId}/safes/{address}/balances/{currency}', {
        path: { chainId: '4', address: '0x123', currency: 'usd' },
        query: { exclude_spam: true },
      }),
    ).resolves.toEqual({ success: true })

    expect(getData).toHaveBeenCalledWith(
      'https://test.test/v1/chains/4/safes/0x123/balances/usd?exclude_spam=true',
      undefined,
      undefined,
    )
  })

  it('should accept POST request with body', async () => {
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

    expect(fetchData).toHaveBeenCalledWith(
      'https://test.test/v1/chains/4/transactions/0x123/propose',
      'POST',
      body,
      undefined,
      undefined,
    )
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

    expect(getData).toHaveBeenCalledWith('/test-url?raw=true', undefined, undefined)
  })

  it('should call a tx preview POST endpoint', async () => {
    await expect(
      postEndpoint('https://test.test', '/v1/chains/{chainId}/transactions/{safe_address}/preview', {
        path: { chainId: '4', safe_address: '0x123' },
        body: { data: '0x456', operation: 0 },
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith(
      'https://test.test/v1/chains/4/transactions/0x123/preview',
      'POST',
      { data: '0x456', operation: 0 },
      undefined,
      undefined,
    )
  })

  it('should accept PUT request with body', async () => {
    const body = {
      emailAddress: 'test@test.com',
    }

    const headers = {
      'Safe-Wallet-Signature': '0x234',
      'Safe-Wallet-Signature-Timestamp': jest.now().toString(),
    }

    await expect(
      putEndpoint('https://test.test', '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}', {
        path: { chainId: '4', safe_address: '0x123', signer: '0x456' },
        body,
        headers,
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith(
      'https://test.test/v1/chains/4/safes/0x123/emails/0x456',
      'PUT',
      body,
      headers,
      undefined,
    )
  })

  it('should send a DELETE request with body', async () => {
    const body = {
      signature: '0x123',
    }

    await expect(
      deleteEndpoint('https://test.test', '/v1/chains/{chainId}/transactions/{safeTxHash}', {
        path: { chainId: '4', safeTxHash: '0x456' },
        body,
      }),
    ).resolves.toEqual({ success: true })

    expect(fetchData).toHaveBeenCalledWith(
      'https://test.test/v1/chains/4/transactions/0x456',
      'DELETE',
      body,
      undefined,
      undefined,
    )
  })
})
