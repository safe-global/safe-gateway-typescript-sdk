import { operations, definitions } from './types/gateway';
export declare type GatewayDefinitions = definitions;
export declare function getSafeInfo(network: string, address: string): Promise<{
    address: {
        value: string;
    };
    nonce: number;
    threshold: number;
    owners: {
        value: string;
    }[];
    implementation: {
        value: string;
    };
    modules: {
        value: string;
    }[];
    fallbackHandler: {
        value: string;
    };
    version: string;
    collectiblesTag: string;
    txQueuedTag: string;
    txHistoryTag: string;
}>;
export declare function getBalances(network: string, address: string, currency?: string, query?: operations['safes_balances_list']['parameters']['query']): Promise<{
    fiatTotal: string;
    items: {
        tokenInfo: {
            type: "ERC20" | "ETHER" | "NATIVE_TOKEN";
            address: string;
            decimals: number;
            symbol: string;
            name: string;
            logoUri: string | null;
        };
        balance: string;
        fiatBalance: string;
        fiatConversion: string;
    }[];
}>;
export declare function getFiatCurrencies(network: string): Promise<string[]>;
export declare function getCollectibles(network: string, address: string, query?: operations['safes_collectibles_list']['parameters']['query']): Promise<{
    address: string;
    tokenName: string;
    tokenSymbol: string;
    logoUri: string;
    id: string;
    uri: string;
    name: string;
    description: string;
    imageUri: string;
    metadata: {
        [key: string]: string;
    };
}[]>;
export declare function getTransactionHistory(network: string, address: string, pageUrl?: string): Promise<{
    next?: string | undefined;
    previous?: string | undefined;
    results: import("./types/transactions").TransactionListItem[];
}>;
export declare function getTransactionQueue(network: string, address: string, pageUrl?: string): Promise<{
    next?: string | undefined;
    previous?: string | undefined;
    results: import("./types/transactions").TransactionListItem[];
}>;
