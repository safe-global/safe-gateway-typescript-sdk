import { paths } from './types/gateway';
export declare function callEndpoint<T extends keyof paths>(network: string, path: T, params: paths[T]['get']['parameters']): Promise<paths[T]['get']['responses'][200]['schema']>;
