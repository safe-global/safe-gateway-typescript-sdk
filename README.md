# Safe Gateway TypeScript SDK

[![npm](https://img.shields.io/npm/v/@gnosis.pm/safe-react-gateway-sdk?label=%40gnosis.pm%2Fsafe-react-gateway-sdk)](https://www.npmjs.com/package/@gnosis.pm/safe-react-gateway-sdk)

A TypeScript SDK for the [Safe Gateway](https://github.com/gnosis/safe-client-gateway)

## Links

- [Gateway API docs](https://gnosis.github.io/safe-client-gateway/docs/routes/index.html)
- [SDK typedoc](https://gnosis.github.io/safe-react-gateway-sdk/modules.html#getBalances)

## Adding an endpoint

Endpoint types are defined in `src/types/gateway.ts`.

Each endpoint consists of:

- a function defined in `src/index.ts` (e.g. `getBalances`)
- a path definition (e.g. `'/chains/{chainId}/safes/{address}/balances/{currency}/'`)
- operation definition (e.g. `safes_balances_list`)
- response definition

To add a new endpoint, follow the pattern set by the existing endpoints.

## Eslint & prettier

This command will run before every commit:

```
yarn eslint:fix
```

## Tests

To run the unit and e2e tests locally:

```
yarn test
```

N.B.: the e2e tests make actual API calls on staging.
