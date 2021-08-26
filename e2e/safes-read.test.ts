import { getSafeInfo } from '../src'
import config from './config'

describe('getSafeInfo tests', () => {
  it('should get safe info on rinkeby', async () => {
    const data = await getSafeInfo(
      config.baseUrl,
      '4',
      '0xb3b83bf204C458B461de9B0CD2739DB152b4fa5A'
    )

    expect(data).toEqual(
      {
        "address": {
          "value": "0xb3b83bf204C458B461de9B0CD2739DB152b4fa5A",
        },
        "collectiblesTag": "1624007722",
        "fallbackHandler": {
          "logoUri": "https://safe-transaction-assets.staging.gnosisdev.com/contracts/logos/0xd5D82B6aDDc9027B22dCA772Aa68D5d74cdBdF44.png",
          "name": "Gnosis Safe: Default Callback Handler 1.1.1",
          "value": "0xd5D82B6aDDc9027B22dCA772Aa68D5d74cdBdF44",
        },
        "guard": null,
        "implementation": {
          "logoUri": "https://safe-transaction-assets.staging.gnosisdev.com/contracts/logos/0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F.png",
          "name": "Gnosis Safe: Mastercopy 1.1.1",
          "value": "0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F",
        },
        "implementationVersionState": "OUTDATED",
        "modules": [
          {
            "value": "0x9e9Bf12b5a66c0f0A7435835e0365477E121B110",
          },
          {
            "value": "0xCFbFaC74C26F8647cBDb8c5caf80BB5b32E43134",
          },
        ],
        "nonce": 106,
        "owners": [
          {
            "value": "0x9913B9180C20C6b0F21B6480c84422F6ebc4B808",
          },
          {
            "value": "0x661E1CF4aAAf6a95C89EA8c81D120E6c62adDFf9",
          },
          {
            "value": "0xE97E9c21A4931edB02C11aDa7D7722Fc5D442C72",
          },
          {
            "value": "0x21D62C6894741DE97944D7844ED44D7782C66ABC",
          },
          {
            "value": "0x474e5Ded6b5D078163BFB8F6dBa355C3aA5478C8",
          },
        ],
        "threshold": 1,
        "txHistoryTag": "1629387955",
        "txQueuedTag": "1628584002",
        "version": "1.1.1",
      }
    )
  })
})
