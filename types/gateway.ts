export interface paths {
  "/safes/{address}/": {
    /** Get status of the safe */
    get: operations["safes_read"];
    parameters: {
      path: {
        address: string;
      };
    };
  };
  "/safes/{address}/balances/{currency}/": {
    get: operations["safes_balances_list"];
    parameters: {
      path: {
        address: string;
        currency: string;
      };
    };
  };
  "/safes/{address}/collectibles/": {
    /** Get collectibles (ERC721 tokens) and information about them */
    get: operations["safes_collectibles_list"];
    parameters: {
      path: {
        address: string;
      };
    };
  };
  "/transactions/{safe_tx_hash}/": {
    get: operations["transactions_read"];
    parameters: {
      path: {
        safe_tx_hash: string;
      };
    };
  };
}

export interface definitions {
  SafeInfoResponse: {
    address: string;
    nonce: number;
    threshold: number;
    owners: string[];
    masterCopy: string;
    modules: string[];
    fallbackHandler: string;
    guard: string;
    version: string;
  };
  Erc20Info: {
    name: string;
    symbol: string;
    decimals: number;
    logoUri: string;
  };
  SafeBalanceResponse: {
    tokenAddress: string;
    token: definitions["Erc20Info"];
    balance: string;
    ethValue: string;
    timestamp: string;
    fiatBalance: string;
    fiatConversion: string;
    fiatCode: string;
  };
  SafeCollectibleResponse: {
    address: string;
    tokenName: string;
    tokenSymbol: string;
    logoUri: string;
    id: string;
    uri: string;
    name: string;
    description: string;
    imageUri: string;
    metadata: { [key: string]: string };
  };
  /**
   * Filters confirmations queryset
   * :param obj: MultisigConfirmation instance
   * :return: Serialized queryset
   */
  SafeMultisigConfirmationResponse: {
    owner: string;
    submissionDate: string;
    transactionHash?: string;
    signature: string;
    signatureType?: string;
  };
  SafeMultisigTransactionResponse: {
    safe: string;
    to: string;
    value: string;
    data?: string;
    operation: number;
    gasToken?: string;
    safeTxGas: number;
    baseGas: number;
    gasPrice: string;
    refundReceiver?: string;
    nonce: number;
    executionDate: string;
    submissionDate: string;
    modified: string;
    blockNumber?: number;
    transactionHash: string;
    safeTxHash: string;
    executor?: string;
    isExecuted: boolean;
    isSuccessful?: boolean;
    ethGasPrice?: string;
    gasUsed?: number;
    fee?: number;
    origin: string;
    dataDecoded?: string;
    confirmationsRequired: number;
    confirmations?: definitions["SafeMultisigConfirmationResponse"];
    signatures: string;
  };
}

export interface operations {
  /** Get status of the safe */
  safes_read: {
    parameters: {
      path: {
        address: string;
      };
    };
    responses: {
      200: {
        schema: definitions["SafeInfoResponse"];
      };
      /** Safe not found */
      404: unknown;
      /**
       * code = 1: Checksum address validation failed
       * code = 50: Cannot get Safe info
       */
      422: unknown;
    };
  };
  /** Get balance for Ether and ERC20 tokens with USD fiat conversion */
  safes_balances_list: {
    parameters: {
      path: {
        address: string;
        currency: string;
      };
      query: {
        /** If `True` just trusted tokens will be returned */
        trusted?: boolean;
        /** If `True` spam tokens will not be returned */
        exclude_spam?: boolean;
      };
    };
    responses: {
      200: {
        schema: definitions["SafeBalanceResponse"][];
      };
      /** Safe not found */
      404: unknown;
      /** Safe address checksum not valid */
      422: unknown;
    };
  };
  /** Get collectibles (ERC721 tokens) and information about them */
  safes_collectibles_list: {
    parameters: {
      path: {
        address: string;
      };
      query: {
        /** If `True` just trusted tokens will be returned */
        trusted?: boolean;
        /** If `True` spam tokens will not be returned */
        exclude_spam?: boolean;
      };
    };
    responses: {
      200: {
        schema: definitions["SafeCollectibleResponse"][];
      };
      /** Safe not found */
      404: unknown;
      /** Safe address checksum not valid */
      422: unknown;
    };
  };
  transactions_read: {
    parameters: {
      path: {
        safe_tx_hash: string;
      };
    };
    responses: {
      200: {
        schema: definitions["SafeMultisigTransactionResponse"];
      };
    };
  };
}

export interface external {}
