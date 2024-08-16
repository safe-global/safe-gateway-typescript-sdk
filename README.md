# Safe Gateway TypeScript SDK

A TypeScript SDK for the [Safe Client Gateway](https://github.com/safe-global/safe-client-gateway)

📖 [Type reference](https://safe-global.github.io/safe-gateway-typescript-sdk/modules.html)   |   <img src="https://github.com/safe-global/safe-gateway-typescript-sdk/assets/381895/ebfa2525-ff65-4597-af2a-17a440ccfb33" height="20" alt="Swagger" valign="text-top" /> [CGW Swagger](https://safe-client.safe.global)

## Usage policy

NB: Safe Client Gateway isn't meant for public use.
Please _do not_ use this SDK if you're building, e.g., a Safe App.

## Using the SDK

Install:

```shell
yarn add git+https://github.com/5afe/cgw-sdk.git#tag
```

Import:

```ts
import { getChain, type Chain } from '@safe-global/safe-gateway-typescript-sdk'
```

Use:

```ts
const chains = await getChains({
  path: {
    chainId: '1'
  }
})
```

The SDK needs no initialization unless you want to override the base URL. You can set an alternative base URL like so:

```ts
import { setBaseUrl } from '@safe-global/safe-gateway-typescript-sdk'

// Switch the SDK to dev mode
setBaseUrl('https://safe-client.staging.5afe.dev')
```

The full SDK reference can be found [here](https://safe-global.github.io/safe-gateway-typescript-sdk/modules.html).

## Generating a new build

Running the "Generate SDK" workflow will generate new types and helpers if there have been any changes to the CGW.