import {
  SafeAppData,
  MultisigTransactionRequest,
  BlockExplorerUriTemplate,
  FiatCurrencies,
  MasterCopyReponse,
  DecodedDataParameterValue,
} from '../src'

describe('Types are exported from index correctly', () => {
  it('Random type check', () => {
    const val = {} as unknown as
      | SafeAppData
      | MultisigTransactionRequest
      | BlockExplorerUriTemplate
      | FiatCurrencies
      | MasterCopyReponse
      | DecodedDataParameterValue
    expect(val).toBe(val)
  })

  it('Dynamic enum export check', () => {
    // @ts-expect-err - default is omitted
    const { default: _ = null, ...rest } = require('../src/index')
    const exportedNames = Object.keys(rest)

    const fs = require('fs')
    const path = require('path')

    const typesDir = path.join(__dirname, '..', 'src', 'types')

    const exportedTypeNames = fs
      .readdirSync(typesDir)
      .filter((file) => file !== 'api.ts')
      .flatMap((file) => {
        // @ts-expect-err - default is omitted
        const { default: _ = null, ...rest } = require(`../src/types/${file}`)
        return Object.keys(rest)
      })

    exportedTypeNames.every((type) => expect(exportedNames.includes(type)).toBe(true))
  })
})
