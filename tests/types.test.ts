import { SafeAppData, MultisigTransactionRequest, BlockExplorerUriTemplate, FiatCurrencies, MasterCopyReponse, DecodedDataParameterValue } from '../src'

describe('Types are exported from index correctly', () => {
  it('Random type check', () => {
    const val = {} as unknown as SafeAppData | MultisigTransactionRequest | BlockExplorerUriTemplate | FiatCurrencies | MasterCopyReponse | DecodedDataParameterValue
    expect(val).toBe(val)
  })
})
