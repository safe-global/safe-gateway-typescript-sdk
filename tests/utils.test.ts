/// <reference lib="dom" />
import { fetchData, getData, insertParams, stringifyQuery } from '../src/utils'

const fetchMock = jest.spyOn(global, 'fetch') as typeof fetch & jest.Mock

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
      expect(stringifyQuery({})).toBe('')
    })
  })

  describe('getData', () => {
    it('should fetch a simple url', async () => {
      fetchMock.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve('{"success": "true"}'),
          json: () => Promise.resolve({ success: true }),
        })
      })

      await expect(getData('/test/safe?q=123')).resolves.toEqual({ success: true })
      expect(fetch).toHaveBeenCalledWith('/test/safe?q=123', { method: 'GET' })
    })

    it('should forward headers with a GET request', async () => {
      fetchMock.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve('{"success": "true"}'),
          json: () => Promise.resolve({ success: true }),
        })
      })

      await expect(getData('/test/safe', { TestHeader: '123456' })).resolves.toEqual({
        success: true,
      })

      expect(fetch).toHaveBeenCalledWith('/test/safe', {
        method: 'GET',
        headers: {
          TestHeader: '123456',
          'Content-Type': 'application/json',
        },
      })
    })

    it('should throw if response is not OK', async () => {
      fetchMock.mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          statusText: 'Failed',
          json: () => ({ code: 1337, message: 'something went wrong' }),
        })
      })

      await expect(getData('/test/safe?q=123')).rejects.toThrow('1337: something went wrong')
      expect(fetch).toHaveBeenCalledWith('/test/safe?q=123', { method: 'GET' })
    })

    it('should throw the response text for 50x errors', async () => {
      fetchMock.mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          statusText: 'Failed',
          json: () => null,
        })
      })

      await expect(getData('/test/safe?q=123')).rejects.toThrow('Failed')
      expect(fetch).toHaveBeenCalledWith('/test/safe?q=123', { method: 'GET' })
    })
  })

  describe('fetchData', () => {
    it('should make a post request', async () => {
      fetchMock.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve('{"success": "true"}'),
          json: () => Promise.resolve({ success: true }),
        })
      })

      await expect(fetchData('/test/safe', 'POST', '123')).resolves.toEqual({ success: true })

      expect(fetch).toHaveBeenCalledWith('/test/safe', {
        method: 'POST',
        body: '123',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })

    it('should forward headers with a POST request', async () => {
      fetchMock.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve('{"success": "true"}'),
          json: () => Promise.resolve({ success: true }),
        })
      })

      await expect(fetchData('/test/safe', 'POST', '123', { TestHeader: '123456' })).resolves.toEqual({ success: true })

      expect(fetch).toHaveBeenCalledWith('/test/safe', {
        method: 'POST',
        body: '123',
        headers: {
          TestHeader: '123456',
          'Content-Type': 'application/json',
        },
      })
    })

    it('should use PUT if specified', async () => {
      fetchMock.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve('{"success": "true"}'),
          json: () => Promise.resolve({ success: true }),
        })
      })

      await expect(fetchData('/test/safe', 'PUT', '123', { TestHeader: '123456' })).resolves.toEqual({ success: true })

      expect(fetch).toHaveBeenCalledWith('/test/safe', {
        method: 'PUT',
        body: '123',
        headers: {
          TestHeader: '123456',
          'Content-Type': 'application/json',
        },
      })
    })
  })

  describe('fetchData DELETE', () => {
    it('should make a DELETE request', async () => {
      fetchMock.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve('{"success": "true"}'),
          json: () => Promise.resolve({ success: true }),
        })
      })

      await expect(fetchData('/test/safe', 'DELETE')).resolves.toEqual({ success: true })

      expect(fetch).toHaveBeenCalledWith('/test/safe', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })

    it('should make a DELETE request and pass headers', async () => {
      fetchMock.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve('{"success": "true"}'),
          json: () => Promise.resolve({ success: true }),
        })
      })

      await expect(fetchData('/test/safe', 'DELETE', undefined, { TestHeader: '123456' })).resolves.toEqual({
        success: true,
      })

      expect(fetch).toHaveBeenCalledWith('/test/safe', {
        method: 'DELETE',
        headers: {
          TestHeader: '123456',
          'Content-Type': 'application/json',
        },
      })
    })

    it('should not throw for an non-JSON response', async () => {
      const jsonMock = jest.fn().mockRejectedValue('error')

      fetchMock.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          status: 204,
          statusText: 'No Content',
          json: jsonMock,
        })
      })

      await expect(fetchData('/test/safe', 'DELETE')).resolves.toEqual({})

      expect(fetch).toHaveBeenCalledWith('/test/safe', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })
  })
})
