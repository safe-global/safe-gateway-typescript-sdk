import { proposeTransaction } from '../src'
import config from './config'

describe('proposeTransaction tests', () => {
  it('should propose a transaction without a signature', async () => {
    const req = proposeTransaction(config.baseUrl, '4', '0x9913B9180C20C6b0F21B6480c84422F6ebc4B808', {
      to: '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
      value: '0',
      data: '0xa9059cbb0000000000000000000000000167e1930e2c2acd87b567ec2e495ebdaeae49d900000000000000000000000000000000000000000000000000000000000f4240',
      operation: 0,
      nonce: '104',
      safeTxGas: '69294',
      baseGas: '0',
      gasPrice: '0',
      gasToken: '0x0000000000000000000000000000000000000000',
      refundReceiver: '0x0000000000000000000000000000000000000000',
      safeTxHash: '0x20701f5b3185103a8d558fc292769841041f1fe86ce2d74af20095b639f618ea',
      sender: '0x474e5Ded6b5D078163BFB8F6dBa355C3aA5478C8',
      origin: null,
    })

    await expect(req).rejects.toThrow(
      '1337: {"nonFieldErrors":["Contract-transaction-hash=0x9aad6ce228f3a36e31206e4889d860fdef610dfa261fa2764c06df06aa702059 does not match provided contract-tx-hash=0x20701f5b3185103a8d558fc292769841041f1fe86ce2d74af20095b639f618ea"]}',
    )
  })
})
