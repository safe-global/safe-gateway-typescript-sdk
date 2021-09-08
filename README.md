# Safe Gateway TypeScript SDK
[![npm](https://img.shields.io/npm/v/@gnosis.pm/safe-react-gateway-sdk?label=%40gnosis.pm%2Fsafe-react-gateway-sdk)](https://www.npmjs.com/package/@gnosis.pm/safe-react-gateway-sdk)

A TypeScript SDK for the [Safe Gateway](https://gnosis.github.io/safe-client-gateway/docs/routes/index.html).

## Generating types

To generate transaction-service types (which help a bit when typing the gateway), run the following command:

```
./scripts/make-transaction-service-types.sh
```

This will create a folder called `openapi` with an OpenAPI JSON and the corresponding TypeScript definitions.

## Adding an endpoint

Endpoints are defined in `src/types/gateway.ts` and `src/index.ts`. Each endpoint consists of:

- a path definition
- operation definition (params and response types)
- response definition
- a function that fetches the endpoint

To add a new endpoint, follow the pattern set by the existing endpoints.

## Eslint & prettier

This command will run before every commit:

```
yarn eslint:fix
```

## Tests

To run the tests locally:

```
yarn test
```
