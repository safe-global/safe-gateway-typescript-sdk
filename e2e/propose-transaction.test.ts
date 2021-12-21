import { proposeTransaction } from '../src'
import config from './config'

describe('proposeTransaction tests', () => {
  // Skipping this test, see https://github.com/gnosis/safe-client-gateway/issues/745
  it('should propose a transaction and fail', async () => {
    const req = proposeTransaction(config.baseUrl, '4', '0x4f9BD57BCC68Bf7770429F137922B3afD23d83E7', {
      to: '0x49d4450977E2c95362C13D3a31a09311E0Ea26A6',
      value: '0',
      data: '0xe8dde2320000000000000000000000000000000000000000000000000000000000000000',
      operation: 0,
      nonce: '1',
      safeTxGas: '39557',
      baseGas: '0',
      gasPrice: '0',
      gasToken: '0x0000000000000000000000000000000000000000',
      refundReceiver: '0x0000000000000000000000000000000000000000',
      safeTxHash: '0x98798b6d9400b25397e85eb79c444a06f93d153555c1d7fd026176f02055a824',
      sender: '0x474e5Ded6b5D078163BFB8F6dBa355C3aA5478C8',
      origin: null,
    })
    await expect(req).rejects.toThrow(
      '1337: {"nonFieldErrors":["Contract-transaction-hash=0xdf2c4db07ee705e94135d92f835cc241b1d4c20e10d481a4e445265851448cb3 does not match provided contract-tx-hash=0x98798b6d9400b25397e85eb79c444a06f93d153555c1d7fd026176f02055a824"]}',
    )
  })
})
