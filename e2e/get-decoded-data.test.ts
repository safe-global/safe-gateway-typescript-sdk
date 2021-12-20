import { getDecodedData } from '../src'
import config from './config'

describe('getDecodedData tests', () => {
  it('should post getDecodedData', async () => {
    const result = await getDecodedData(
      config.baseUrl,
      '4',
      '0x095ea7b3000000000000000000000000ae9844f89d98c150f5e61bfc676d68b4921559900000000000000000000000000000000000000000000000000001c6bf52634000',
    )

    expect(result).toStrictEqual({
      method: 'approve',
      parameters: [
        {
          name: 'spender',
          type: 'address',
          value: '0xae9844F89D98c150F5e61bfC676D68b492155990',
        },
        {
          name: 'value',
          type: 'uint256',
          value: '500000000000000',
        },
      ],
    })
  })
})
