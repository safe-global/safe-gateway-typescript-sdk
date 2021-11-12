import { FiatCurrencies, OwnedSafes, SafeBalanceResponse, SafeCollectibleResponse, SafeInfo } from './common'
import {
  MultisigTransactionRequest,
  TransactionDetails,
  SafeTransactionEstimation,
  SafeTransactionEstimationRequest,
  TransactionListPage,
} from './transactions'
import { ChainListResponse, ChainInfo } from './chains'

export interface paths {
  '/chains/{chainId}/safes/{address}/': {
    /** Get status of the safe */
    get: operations['safes_read']
    parameters: {
      path: {
        chainId: string
        address: string
      }
    }
  }
  '/chains/{chainId}/safes/{address}/balances/{currency}/': {
    get: operations['safes_balances_list']
    parameters: {
      path: {
        chainId: string
        address: string
        currency: string
      }
    }
  }
  '/balances/supported-fiat-codes': {
    get: operations['get_supported_fiat']
    parameters: null
  }
  '/chains/{chainId}/safes/{address}/collectibles/': {
    /** Get collectibles (ERC721 tokens) and information about them */
    get: operations['safes_collectibles_list']
    parameters: {
      path: {
        chainId: string
        address: string
      }
    }
  }
  '/chains/{chainId}/safes/{safe_address}/transactions/history': {
    get: operations['history_transactions']
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
    }
  }
  '/chains/{chainId}/safes/{safe_address}/transactions/queued': {
    get: operations['queued_transactions']
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
    }
  }
  '/chains/{chainId}/transactions/{transactionId}': {
    get: operations['get_transactions']
    parameters: {
      path: {
        chainId: string
        transactionId: string
      }
    }
  }
  '/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations': {
    /** This is actually supposed to be POST but it breaks our type paradise */
    get: operations['post_safe_gas_estimation']
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
    }
  }
  '/chains/{chainId}/transactions/{safe_address}/propose': {
    /** This is actually supposed to be POST but it breaks our type paradise */
    get: operations['propose_transaction']
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
    }
  }
  '/chains/{chainId}/owners/{address}/safes': {
    get: operations['get_owned_safes']
    parameters: {
      path: {
        chainId: string
        address: string
      }
    }
  }
  '/chains/': {
    get: operations['chains_list']
    parameters: {
      query: {
        ordering?: string
        limit?: number
        offset?: number
      }
    }
  }
  '/chains/{chainId}/': {
    get: operations['chains_read']
    parameters: {
      path: {
        chainId: string
      }
    }
  }
}

export interface operations {
  /** Get status of the safe */
  safes_read: {
    parameters: {
      path: {
        chainId: string
        address: string
      }
    }
    responses: {
      200: {
        schema: SafeInfo
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
        chainId: string
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
        schema: SafeBalanceResponse
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  get_supported_fiat: {
    parameters: null
    responses: {
      200: {
        schema: FiatCurrencies
      }
    }
  }
  /** Get collectibles (ERC721 tokens) and information about them */
  safes_collectibles_list: {
    parameters: {
      path: {
        chainId: string
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
        schema: SafeCollectibleResponse[]
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  history_transactions: {
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
      query: {
        /** Taken from the Page['next'] or Page['previous'] */
        page_url?: string
      }
    }
    responses: {
      200: {
        schema: TransactionListPage
      }
    }
  }
  queued_transactions: {
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
      query: {
        /** Taken from the Page['next'] or Page['previous'] */
        page_url?: string
      }
    }
    responses: {
      200: {
        schema: TransactionListPage
      }
    }
  }
  get_transactions: {
    parameters: {
      path: {
        chainId: string
        transactionId: string
      }
    }
    responses: {
      200: {
        schema: TransactionDetails
      }
    }
  }
  post_safe_gas_estimation: {
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
      body: SafeTransactionEstimationRequest
    }
    responses: {
      200: {
        schema: SafeTransactionEstimation
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  propose_transaction: {
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
      body: MultisigTransactionRequest
    }
    responses: {
      200: {
        schema: TransactionDetails
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  get_owned_safes: {
    parameters: {
      path: {
        chainId: string
        address: string
      }
    }
    responses: {
      200: {
        schema: OwnedSafes
      }
    }
  }
  chains_list: {
    parameters: {
      query?: {
        /** Which field to use when ordering the results. */
        ordering?: string
        /** Number of results to return per page. */
        limit?: number
        /** The initial index from which to return the results. */
        offset?: number
      }
    }
    responses: {
      200: {
        schema: ChainListResponse
      }
    }
  }
  chains_read: {
    parameters: {
      path: {
        /** A unique value identifying this chain. */
        chainId: string
      }
    }
    responses: {
      200: {
        schema: ChainInfo
      }
    }
  }
}
