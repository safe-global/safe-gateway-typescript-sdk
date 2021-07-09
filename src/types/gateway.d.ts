export interface paths {
  '/safes/{address}/': {
    /** Get status of the safe */
    get: operations['safes_read']
    parameters: {
      path: {
        address: string
      }
    }
  }
  '/safes/{address}/balances/{currency}/': {
    get: operations['safes_balances_list']
    parameters: {
      path: {
        address: string
        currency: string
      }
    }
  }
  '/safes/{address}/collectibles/': {
    /** Get collectibles (ERC721 tokens) and information about them */
    get: operations['safes_collectibles_list']
    parameters: {
      path: {
        address: string
      }
    }
  }
  '/transactions/{safe_tx_hash}/': {
    get: operations['transactions_read']
    parameters: {
      path: {
        safe_tx_hash: string
      }
    }
  }
}

type StringValue = {
  value: string
}

export interface definitions {
  SafeAppInfo: {
    address: StringValue
    nonce: number
    threshold: number
    owners: StringValue[]
    implementation: StringValue
    modules: StringValue[]
    fallbackHandler: StringValue
    version: string
    collectiblesTag: string
    txQueuedTag: string
    txHistoryTag: string
  }
  TokenInfo: {
    type: 'ERC20' | 'ETHER'
    address: string
    decimals: number
    symbol: string
    name: string
    logoUri: string | null
  }
  SafeBalanceResponse: {
    fiatTotal: string
    items: Array<{
      tokenInfo: definitions['TokenInfo']
      balance: string
      fiatBalance: string
      fiatConversion: string
    }>
  }
  SafeCollectibleResponse: Array<{
    address: string
    tokenName: string
    tokenSymbol: string
    logoUri: string
    id: string
    uri: string
    name: string
    description: string
    imageUri: string
    metadata: { [key: string]: string }
  }>

  TransactionInfo: {}
  TransactionData: {}
  DetailedExecutionInfo: {}
  TransactionDetails: {
    executed_at?: number
    tx_status: 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'AWAITING_EXECUTION' | 'AWAITINGCONFIRMATIONS'
    tx_info: definitions['TransactionInfo']
    tx_data?: definitions['TransactionData']
    detailed_execution_info?: definitions['DetailedExecutionInfo']
    tx_hash?: string
    safe_app_info?: definitions['SafeAppInfo']
  }
}

export interface operations {
  /** Get status of the safe */
  safes_read: {
    parameters: {
      path: {
        address: string
      }
    }
    responses: {
      200: {
        schema: definitions['SafeAppInfo']
      }
      /** Safe not found */
      404: unknown
      /**
       * code = 1: Checksum address validation failed
       * code = 50: Cannot get Safe info
       */
      422: unknown
    }
  }
  /** Get balance for Ether and ERC20 tokens with USD fiat conversion */
  safes_balances_list: {
    parameters: {
      path: {
        address: string
        currency: string
      }
      query: {
        /** If `True` just trusted tokens will be returned */
        trusted?: boolean
        /** If `True` spam tokens will not be returned */
        exclude_spam?: boolean
      }
    }
    responses: {
      200: {
        schema: definitions['SafeBalanceResponse']
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  /** Get collectibles (ERC721 tokens) and information about them */
  safes_collectibles_list: {
    parameters: {
      path: {
        address: string
      }
      query: {
        /** If `True` just trusted tokens will be returned */
        trusted?: boolean
        /** If `True` spam tokens will not be returned */
        exclude_spam?: boolean
      }
    }
    responses: {
      200: {
        schema: definitions['SafeCollectibleResponse'][]
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  transactions_read: {
    parameters: {
      path: {
        safe_tx_hash: string
      }
    }
    responses: {
      200: {
        schema: definitions['TransactionDetails']
      }
    }
  }
}
