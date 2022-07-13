#!/bin/bash

mkdir -p openapi
curl 'https://safe-client.gnosis.io/openapi.json' > openapi/cgw.json
npx openapi-typescript openapi/cgw.json --output openapi/cgw.ts
