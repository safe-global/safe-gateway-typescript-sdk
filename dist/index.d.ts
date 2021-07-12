import { operations, definitions } from './types/gateway';
export declare type GatewayDefinitions = definitions;
export declare function getSafeInfo(network: string, address: string): Promise<{
    address: import("./types/gateway").StringValue;
    nonce: number;
    threshold: number;
    owners: import("./types/gateway").StringValue[];
    implementation: import("./types/gateway").StringValue;
    modules: import("./types/gateway").StringValue[];
    fallbackHandler: import("./types/gateway").StringValue;
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
export declare function getTransactionDetails(network: string, safe_tx_hash: string): Promise<{
    executed_at?: number | undefined;
    tx_status: "SUCCESS" | "FAILED" | "CANCELLED" | "AWAITING_EXECUTION" | "AWAITINGCONFIRMATIONS";
    tx_info: {};
    tx_data?: {} | undefined;
    detailed_execution_info?: {} | undefined;
    tx_hash?: string | undefined;
    safe_app_info?: {
        address: import("./types/gateway").StringValue;
        nonce: number;
        threshold: number;
        owners: import("./types/gateway").StringValue[];
        implementation: import("./types/gateway").StringValue;
        modules: import("./types/gateway").StringValue[];
        fallbackHandler: import("./types/gateway").StringValue;
        version: string;
        collectiblesTag: string;
        txQueuedTag: string;
        txHistoryTag: string;
    } | undefined;
}>;
