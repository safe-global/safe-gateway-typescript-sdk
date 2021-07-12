export declare type Params = {
    [key: string]: string | number | boolean | null;
};
export declare function insertParams(template: string, params?: Params): string;
export declare function stringifyQuery(query?: Params): string;
export declare function fetchJson<T>(url: string): Promise<T>;
