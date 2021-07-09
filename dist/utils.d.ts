export declare type Query = {
    [key: string]: string | number | boolean | null;
};
export declare function insertParam(str: string, key: string, value: string): string;
export declare function fetchJson(url: string, query?: Query): Promise<any>;
