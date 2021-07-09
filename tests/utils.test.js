import fetch from 'unfetch'
import { fetchJson, insertParam } from '../src/utils'

jest.mock('unfetch', () => jest.fn(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true })
  })
}))

describe('utils', () => {
  describe('insertParam', () => {
    it('should insert params into a string', () => {
      expect(
        insertParam('/{network}/safe/{address}', 'address', '0x0')
      ).toBe(
        '/{network}/safe/0x0'
      )
    })
  })

  describe('fetchJson', () => {
    it('should fetch a simple url', () => {
      expect(fetchJson('/test')).resolves.toEqual({ success: true })
      expect(fetch).toHaveBeenCalledWith('/test')
    })

    it('should fetch with query params', () => {
      expect(fetchJson('/test', { spam: true, exclude: 1, safe: '123' })).resolves.toEqual({ success: true })
      expect(fetch).toHaveBeenCalledWith('/test?spam=true&exclude=1&safe=123')
    })
  })
})
