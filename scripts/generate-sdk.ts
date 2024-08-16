import * as child_process from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import semver from 'semver';
import openapiTS, {
  astToString,
  type Method,
  type OpenAPI3,
} from 'openapi-typescript';

const REPO_URL = 'https://github.com/safe-global/safe-client-gateway.git';

const PROD_SWAGGER_URL = 'https://safe-client.safe.global/api';
const STAGING_SWAGGER_URL = 'https://safe-client.staging.5afe.dev/api';

const BARREL_FILE_NAME = 'index';
const SDK_FILE_NAME = 'sdk';
const SCHEMA_FILE_NAME = 'schema';

const SRC_FOLDER_NAME = 'src';
const DIST_FOLDER_NAME = 'dist';

const PACKAGE_JSON_FILE = path.join(process.cwd(), 'package.json');
const SDK_FOLDER = path.join(process.cwd(), SRC_FOLDER_NAME);

const WARNING = `/**
 * This file was auto-generated. Do not make direct changes.
 */`;

async function main(): Promise<void> {
  try {
    updatePackageJson();
    await generateSdk();
    buildSdk();
    process.exit();
  } catch (error) {
    fs.rmSync(SDK_FOLDER, { recursive: true });

    throw error;
  }
}
void main();

/**
 * Updates SDK version in package.json if necessary
 */
function updatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_FILE, 'utf-8'));
  const sdkVersion = calculateVersion();

  if (packageJson.version === sdkVersion) {
    console.log('SDK version is up-to-date');
    process.exit();
  }

  packageJson.version = sdkVersion;
  fs.writeFileSync(PACKAGE_JSON_FILE, JSON.stringify(packageJson, null, 2));
}

/**
 * Calculates SDK version based on latest tag and commit hash
 * of the Safe Client Gateway repository:
 *
 * - If latest commit hash matches latest tag commit hash,
 *   version is latest tag version
 * - Otherwise, version is latest tag version appended
 *   with '-next-' and first 7 characters of latest commit hash
 *
 *  @returns SDK version string
 */
function calculateVersion(): string {
  const latestCommitHash = getCommitHash('HEAD');

  // Get semantically sorted tags, e.g. ['v1.0.0', 'v1.0.1', 'v1.1.0']
  const tagNames = getSortedTagNames();

  const latestTagName = tagNames[tagNames.length - 1];
  const latestTagCommitHash = getCommitHash(`refs/tags/${latestTagName}`);

  // Get prefix-stripped tag version, e.g. '1.0.0'
  const tagVersion = semver.clean(latestTagName)?.toString();
  if (!tagVersion) {
    throw new Error(`Invalid tag version: ${latestTagName}`);
  }

  return latestCommitHash === latestTagCommitHash
    ? tagVersion
    : `${tagVersion}-next-${latestCommitHash.substring(0, 7)}`;
}

/**
 * Gets semantically sorted tag names from Safe Client Gateway repo
 * @returns semantically sorted tag names, e.g. ['v1.0.0', 'v1.0.1', 'v1.1.0']
 */
function getSortedTagNames(): string[] {
  return child_process
    .execSync(`git ls-remote --tags ${REPO_URL}`)
    .toString()
    .split('\n')
    .map((line) => line.match(/refs\/tags\/(.+)$/)?.[1] || null)
    .filter((tagName): tagName is string => !!semver.valid(tagName))
    .sort(semver.compare);
}

/**
 * Gets commit hash of reference in Safe Client Gateway repository
 * @param ref - Reference to get commit hash of
 * @returns Commit hash of reference
 */
function getCommitHash(ref: string): string {
  return child_process
    .execSync(`git ls-remote ${REPO_URL} ${ref}`)
    .toString()
    .split('\t')[0];
}

/**
 * Generates SDK for Safe Client Gateway
 */
async function generateSdk(): Promise<void> {
  fs.mkdirSync(SDK_FOLDER, { recursive: true });

  const definitions = await getSwaggerDefinitions();
  const schema = await getSchema(definitions);
  // Re-export components for import convenience
  const components = getComponents(definitions);

  const client = getClient();
  const wrappers = getWrappers(definitions);

  const barrel = getBarrel();

  fs.writeFileSync(
    path.join(SDK_FOLDER, `${SCHEMA_FILE_NAME}.ts`),
    [WARNING, components, schema].join('\n\n')
  );
  fs.writeFileSync(
    path.join(SDK_FOLDER, `${SDK_FILE_NAME}.ts`),
    [WARNING, client, wrappers].join('\n\n')
  );
  fs.writeFileSync(path.join(SDK_FOLDER, `${BARREL_FILE_NAME}.ts`), barrel);
}

/**
 * Scrapes Swagger definitions from {@link STAGING_SWAGGER_URL}
 * as that's where new features are added first
 * @returns Swagger definitions object
 *
 * Note: it is possible to get the definitions from NestJS with
 * `SwaggerModule.createDocument` but we scrape to match deployment
 */
async function getSwaggerDefinitions(): Promise<OpenAPI3> {
  const url = `${STAGING_SWAGGER_URL}/swagger-ui-init.js`;
  const swaggerUiInit = await fetch(url).then((res) => {
    if (res.ok) {
      return res.text();
    } else {
      throw new Error(`Failed to fetch ${url}`);
    }
  });

  // Extract options object from swagger-ui-init.js file
  const optionsMatch = swaggerUiInit.match(/let options = (\{[\s\S]*?\});/);
  if (!optionsMatch?.[1]) {
    throw new Error('No options object');
  }

  const options = JSON.parse(optionsMatch[1]);
  return options.swaggerDoc;
}

/**
 * Converts Swagger definitions to TypeScript schema
 * @param definitions - Swagger definitions object
 * @returns TypeScript schema
 */
async function getSchema(definitions: OpenAPI3): Promise<string> {
  return await openapiTS(definitions).then(astToString);
}

/**
 * Directly exports components of Swagger definitions
 * @param definitions - Swagger definitions object
 * @returns Components of TypeScript schema
 */
function getComponents(definitions: OpenAPI3): string {
  if (!definitions.components?.schemas) {
    throw new Error('Failed to find components.schemas object');
  }

  return Object.keys(definitions.components.schemas)
    .map((key) => {
      return `export type ${key} = components["schemas"]["${key}"];`;
    })
    .join('\n');
}

/**
 * Factory for Safe Client Gateway-typed client and singleton
 * @returns - Typed factory and singleton
 */
function getClient(): string {
  const imports = [
    "import _createClient from 'openapi-fetch';",
    `import type { paths, operations } from './${SCHEMA_FILE_NAME}';`,
  ];

  // Typed factory, singleton, singleton getter, singleton URL updater
  const client = [
    'const createClient = _createClient<paths>;',
    `let _client = createClient({
  baseUrl: '${PROD_SWAGGER_URL}',
})`,
    `export function getClient() {
  return _client
}`,
    `export function setBaseUrl(baseUrl: string) {
  _client = createClient({ baseUrl });
}`,
  ];

  return [...imports, ...client].join('\n\n');
}

/**
 * Path-specific wrappers for fetching from the Safe Client Gateway
 * @param definitions - Swagger definitions object
 * @returns - Wrapper functions for each path
 */
function getWrappers(definitions: OpenAPI3): string {
  if (!definitions.paths) {
    throw new Error('Failed to find paths object');
  }

  return Object.keys(definitions.paths)
    .map((path) => {
      const pathItemObj = definitions.paths?.[path];
      if (!pathItemObj || '$ref' in pathItemObj) {
        throw new Error('No PathItemObject in path(s)');
      }

      // get, post, put, etc.
      const method = ((): Method => {
        const isFetchMethod = (method: string): method is Method => {
          // prettier-ignore
          return ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'].includes(method);
        };
        const [_method] = Object.keys(pathItemObj);
        if (!_method || !isFetchMethod(_method)) {
          throw new Error(`Invalid fetch method: ${_method}`);
        }
        return _method;
      })();

      const operationObject = pathItemObj[method];
      if (!operationObject || !('operationId' in operationObject)) {
        throw new Error(`No operation object for ${path}`);
      }

      // e.g. AboutController_getAbout
      const operationId = operationObject.operationId;
      if (!operationId) {
        throw new Error(`No operationId for ${path}`);
      }

      // e.g. ['AboutController, 'getAbout']
      const [controller, _method] = operationId.split('_');

      if (!controller || !_method) {
        throw new Error(`Invalid operationId: ${operationId}`);
      }

      // Prevent duplicated by appending controller version to method
      const wrapperName = ((): string => {
        const versionMatch = controller.match(/v\d+/i);
        return versionMatch?.[0] ? _method + versionMatch[0] : _method;
      })();

      // Wrapper types
      const parameterTypes = `operations["${operationId}"]["parameters"]`;
      // requestBody only present if sending body is possible
      const bodyTypes = operationObject?.requestBody
        ? `operations["${operationId}"]["requestBody"]['content']['application/json']`
        : undefined;

      // Wrapper args and corresponding for client
      const wrapperArgs = bodyTypes
        ? `params: ${parameterTypes}, body: ${bodyTypes}`
        : `params: ${parameterTypes}`;
      const clientArgs = bodyTypes ? `params, body` : `params`;

      // Wrapper function
      return `export async function ${wrapperName}(${wrapperArgs}) {
  return _client.${method.toUpperCase()}('${path}', { ${clientArgs} });
}`;
    })
    .filter(Boolean)
    .join('\n\n');
}

/**
 * Re-exports schema and SDK for convenience
 * @returns - Re-exported schema and SDK
 */
function getBarrel(): string {
  return `export * from './${SCHEMA_FILE_NAME}';
export * from './${SDK_FILE_NAME}';`;
}

/**
 * Builds SDK by transpiling TypeScript to JavaScript
 * and formatting with Prettier
 */
function buildSdk(): void {
  child_process.execSync(`rm -rf ${DIST_FOLDER_NAME} && tsc`);
  child_process.execSync(`prettier -w '${DIST_FOLDER_NAME}/**/*'`);
}
