#!/bin/bash

mkdir -p openapi
mkdir -p types
curl 'https://safe-transaction.rinkeby.gnosis.io/?format=openapi' > openapi/tx-service.json
npx openapi-typescript openapi/tx-service.json --output types/transaction-service.ts
