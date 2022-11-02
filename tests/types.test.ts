import type {
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
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { default: _ = null, ...rest } = require('../src/index')
    const exportedNames = Object.keys(rest)

    const fs = require('fs')
    const path = require('path')

    const typesDir = path.join(__dirname, '..', 'src', 'types')
    const files: string[] = fs.readdirSync(typesDir)

    const exportedTypeNames = files
      .filter((file) => file !== 'api.ts')
      .flatMap((file) => {
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        const { default: _ = null, ...rest } = require(`../src/types/${file}`)
        return Object.keys(rest)
      })

    exportedTypeNames.every((type) => expect(exportedNames.includes(type)).toBe(true))
  })
})
