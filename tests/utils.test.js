import fetch from 'isomorphic-unfetch'
import { fetchData, insertParams, stringifyQuery } from '../src/utils'

jest.mock('isomorphic-unfetch')

describe('utils', () => {
  describe('insertParams', () => {
    it('should insert a param into a string', () => {
      expect(insertParams('/{network}/safe/{address}', { address: '0x0' })).toBe('/{network}/safe/0x0')
    })

    it('should insert several params into a string', () => {
      expect(insertParams('/{network}/safe/{address}', { address: '0x0', network: 'rinkeby' })).toBe(
        '/rinkeby/safe/0x0',
      )
    })
  })

  describe('stringifyQuery', () => {
    it('should stringify query params', () => {
      expect(stringifyQuery({ spam: true, page: 11, name: 'token', exclude: null })).toBe(
        '?spam=true&page=11&name=token',
      )
    })

    it('should return an empty string for empty query', () => {
      expect(stringifyQuery()).toBe('')
      expect(stringifyQuery(null)).toBe('')
      expect(stringifyQuery({})).toBe('')
    })
  })

  describe('fetchData', () => {
    it('should fetch a simple url', async () => {
      fetch.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve('{"success": "true"}'),
          json: () => Promise.resolve({ success: true }),
        })
      })

      await expect(fetchData('/test/safe?q=123')).resolves.toEqual({ success: true })
      expect(fetch).toHaveBeenCalledWith('/test/safe?q=123', undefined)
    })

    it('should make a post request', async () => {
      fetch.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve('{"success": "true"}'),
          json: () => Promise.resolve({ success: true }),
        })
      })

      await expect(fetchData('/test/safe', '123')).resolves.toEqual({ success: true })

      expect(fetch).toHaveBeenCalledWith('/test/safe', {
        method: 'POST',
        body: '123',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })

    it('should throw if response is not OK', async () => {
      fetch.mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          statusText: 'Failed',
          json: () => ({ code: 1337, message: 'something went wrong' }),
        })
      })

      await expect(fetchData('/test/safe?q=123')).rejects.toThrow('1337: something went wrong')
      expect(fetch).toHaveBeenCalledWith('/test/safe?q=123', undefined)
    })

    it('should throw the response text for 50x errors', async () => {
      fetch.mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          statusText: 'Failed',
          json: () => null,
        })
      })

      await expect(fetchData('/test/safe?q=123')).rejects.toThrow('Failed')
      expect(fetch).toHaveBeenCalledWith('/test/safe?q=123', undefined)
    })
  })
})
