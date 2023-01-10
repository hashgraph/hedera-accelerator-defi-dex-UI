import { BigNumber } from "bignumber.js";
import { StateCreator } from "zustand";
import { DEXState } from "..";
import { TransactionResponse } from "@hashgraph/sdk";
import { MirrorNodeTokenBalance } from "../../services";

enum PoolsActionType {
  FETCH_ALL_POOL_METRICS_STARTED = "pools/FETCH_ALL_POOL_METRICS_STARTED",
  FETCH_ALL_METRICS_SUCCEEDED = "pools/FETCH_ALL_POOL_METRICS_SUCCEEDED",
  FETCH_ALL_METRICS_FAILED = "pools/FETCH_ALL_POOL_METRICS_FAILED",
  FETCH_USER_POOL_METRICS_STARTED = "pools/FETCH_USER_POOL_METRICS_STARTED",
  FETCH_USER_POOL_METRICS_SUCCEEDED = "pools/FETCH_USER_POOL_METRICS_SUCCEEDED",
  FETCH_USER_POOL_METRICS_FAILED = "pools/FETCH_USER_POOL_METRICS_FAILED",
  SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_STARTED = "pools/SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_STARTED",
  SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_SUCCEEDED = "pools/SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_SUCCEEDED",
  SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_FAILED = "pools/SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_FAILED",
  SEND_REMOVE_LIQUIDITY_TRANSACTION_TO_WALLET_STARTED = "pools/SEND_REMOVE_LIQUIDITY_TRANSACTION_TO_WALLET_STARTED",
  SEND_REMOVE_LIQUIDITY_TRANSACTION_TO_WALLET_SUCCEEDED = "pools/SEND_REMOVE_LIQUIDITY_TRANSACTION_TO_WALLET_SUCCEEDED",
  SEND_REMOVE_LIQUIDITY_TRANSACTION_TO_WALLET_FAILED = "pools/SEND_REMOVE_LIQUIDITY_TRANSACTION_TO_WALLET_FAILED",
  RESET_WITHDRAW_STATE = "pools/RESET_WITHDRAW_STATE",
  FETCH_SPOT_PRICES_STARTED = "pools/FETCH_SPOT_PRICES_STARTED",
  FETCH_SPOT_PRICES_SUCCEEDED = "pools/FETCH_SPOT_PRICES_SUCCEEDED",
  FETCH_SPOT_PRICES_FAILED = "pools/FETCH_SPOT_PRICES_SUCCEEDED",
}
interface SendAddLiquidityTransactionParams {
  inputToken: {
    symbol: string;
    amount: number;
    address: string;
  };
  outputToken: {
    symbol: string;
    amount: number;
    address: string;
  };
  contractId: string;
}
interface FetchSpotPriceParams {
  inputTokenAddress: string;
  outputTokenAddress: string;
  contractId: string;
}

/* Add Symbol */
interface Pool {
  name: string;
  fee: BigNumber | undefined;
  totalVolumeLocked: BigNumber;
  past24HoursVolume: BigNumber;
  past7daysVolume: BigNumber;
}

interface UserPool {
  name: string;
  fee: BigNumber | undefined;
  liquidity: BigNumber;
  percentOfPool: BigNumber;
  unclaimedFees: BigNumber;
  userTokenPair: TokenPair | undefined;
}

interface TokenBalance {
  /** Should update this field to be tokenId */
  token_id: string;
  accountId: string;
  balance: BigNumber;
  decimals?: string;
}
interface PairTokenBalance {
  pairAccountId: string | undefined;
  tokenBalances: MirrorNodeTokenBalance[];
}
interface WithdrawState {
  status: "init" | "in progress" | "success" | "error";
  successPayload: {
    lpTokenSymbol: string;
    lpTokenAmount: number;
    fee: string;
    transactionResponse: TransactionResponse;
  } | null;
  errorMessage: string;
}
interface PoolsState {
  allPoolsMetrics: Pool[];
  userPoolsMetrics: UserPool[];
  poolTokenBalances: PairTokenBalance[];
  userTokenBalances: TokenBalance[];
  status: string; // "init" | "fetching" | "success" | "error";
  errorMessage: string | null;
  spotPrices: Record<string, BigNumber | undefined>;
  withdrawState: WithdrawState;
}

interface PoolsActions {
  sendAddLiquidityTransaction: ({
    firstTokenAddr,
    firstTokenQty,
    secondTokenAddr,
    secondTokenQty,
    addLiquidityContractAddr,
  }: any) => Promise<void>;
  fetchAllPoolMetrics: () => Promise<void>;
  fetchUserPoolMetrics: (userAccountId: string) => Promise<void>;
  fetchSpotPrices: ({ inputTokenAddress, outputTokenAddress, pairAccountId }: any) => Promise<void>;
  sendRemoveLiquidityTransaction: (
    lpTokenSymbol: string,
    lpTokenAmount: number,
    fee: string,
    pairAccountId: string
  ) => Promise<void>;
  resetWithdrawState: () => Promise<void>;
  // Temporary - should be removed
  send100LabTokensToWallet: (receivingAccountId: string) => Promise<void>;
}
interface TokenPair {
  tokenA: Token;
  tokenB: Token;
  pairToken: {
    symbol: string | undefined;
    pairLpAccountId: string | undefined;
    totalSupply?: Long | null;
    decimals: number;
  };
}
interface Token {
  amount: number;
  displayAmount: string;
  balance: number | undefined;
  poolLiquidity: number | undefined;
  symbol: string | undefined;
  tokenName: string | undefined;
  totalSupply: Long | null;
  maxSupply: Long | null;
  tokenMeta: {
    pairAccountId: string | undefined;
    tokenId: string | undefined;
  };
}

type PoolsStore = PoolsState & PoolsActions;

type PoolsSlice = StateCreator<DEXState, [["zustand/devtools", never], ["zustand/immer", never]], [], PoolsStore>;

export { PoolsActionType };
export type {
  PoolsSlice,
  PoolsStore,
  PoolsState,
  PoolsActions,
  UserPool,
  Pool,
  SendAddLiquidityTransactionParams,
  TokenPair,
  Token,
  FetchSpotPriceParams,
};
