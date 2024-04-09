#!/bin/bash

mkdir -p openapi
curl 'https://safe-client.safe.global/api-json' > openapi/cgw.json
npx openapi-typescript openapi/cgw.json --output openapi/cgw.ts
