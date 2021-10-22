#!/bin/bash

mkdir -p openapi
curl 'https://safe-config.gnosis.io/?format=openapi' > openapi/config-service.json
npx openapi-typescript openapi/config-service.json --output openapi/config-service.ts
