import fetch from 'unfetch'
import { callEndpoint } from '../src/endpoint'

jest.mock('unfetch', () => jest.fn(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true })
  })
}))

describe('callEndpoint', () => {
  it('should accept just a path', () => {
    expect(
      callEndpoint('xdai', '/balances/supported-fiat-codes')
    ).resolves.toEqual({ success: true })

    expect(fetch).toHaveBeenCalledWith('https://safe-client.xdai.staging.gnosisdev.com/v1/balances/supported-fiat-codes')
  })

  it('should accept a path param', () => {
    expect(
      callEndpoint('rinkeby', '/safe/{address}', { path: { address: '0x123' } })
    ).resolves.toEqual({ success: true })

    expect(fetch).toHaveBeenCalledWith('https://safe-client.rinkeby.staging.gnosisdev.com/v1/safe/0x123')
  })

  it('should accept several path params', () => {
    expect(
      callEndpoint('rinkeby', '/balances/{address}/{currency}', { path: { address: '0x123', currency: 'usd' } })
    ).resolves.toEqual({ success: true })

    expect(fetch).toHaveBeenCalledWith('https://safe-client.rinkeby.staging.gnosisdev.com/v1/balances/0x123/usd')
  })

  it('should accept query params', () => {
    expect(
      callEndpoint('rinkeby', '/balances/{address}/{currency}', { path: { address: '0x123', currency: 'usd' }, query: { exclude_spam: true } })
    ).resolves.toEqual({ success: true })

    expect(fetch).toHaveBeenCalledWith('https://safe-client.rinkeby.staging.gnosisdev.com/v1/balances/0x123/usd?exclude_spam=true')
  })
})
