import { MessageTypes } from "hashconnect";
import { ConnectionStatus } from "../types";
import { TransactionResponse } from "@hashgraph/sdk";

export enum ActionType {
  INITIALIZE_WALLET_CONNECTION_STARTED = "INITIALIZE_WALLET_CONNECTION_STARTED",
  INITIALIZE_WALLET_CONNECTION_SUCCEEDED = "INITIALIZE_WALLET_CONNECTION_SUCCEEDED",
  INITIALIZE_WALLET_CONNECTION_FAILED = "INITIALIZE_WALLET_CONNECTION_FAILED",
  PAIR_WITH_CONNECTED_WALLET_STARTED = "PAIR_WITH_CONNECTED_WALLET_STARTED",
  PAIR_WITH_CONNECTED_WALLET_SUCCEEDED = "PAIR_WITH_CONNECTED_WALLET_SUCCEEDED",
  PAIR_WITH_CONNECTED_WALLET_FAILED = "PAIR_WITH_CONNECTED_WALLET_FAILED",
  PAIR_WITH_SELECTED_WALLET_EXTENSION_STARTED = "PAIR_WITH_SELECTED_WALLET_EXTENSION_STARTED",
  PAIR_WITH_SELECTED_WALLET_EXTENSION_SUCCEEDED = "PAIR_WITH_SELECTED_WALLET_EXTENSION_SUCCEEDED",
  PAIR_WITH_SELECTED_WALLET_EXTENSION_FAILED = "PAIR_WITH_SELECTED_WALLET_EXTENSION_FAILED",
  FETCH_ACCOUNT_BALANCE_STARTED = "FETCH_ACCOUNT_BALANCE_STARTED",
  FETCH_ACCOUNT_BALANCE_SUCCEEDED = "FETCH_ACCOUNT_BALANCE_SUCCEEDED",
  FETCH_ACCOUNT_BALANCE_FAILED = "FETCH_ACCOUNT_BALANCE_FAILED",
  FETCH_SPOT_PRICES_STARTED = "FETCH_SPOT_PRICES_STARTED",
  FETCH_SPOT_PRICES_SUCCEEDED = "FETCH_SPOT_PRICES_SUCCEEDED",
  FETCH_SPOT_PRICES_FAILED = "FETCH_SPOT_PRICES_FAILED",
  SEND_SWAP_TRANSACTION_TO_WALLET_STARTED = "SEND_SWAP_TRANSACTION_TO_WALLET_STARTED",
  SEND_SWAP_TRANSACTION_TO_WALLET_SUCCEEDED = "SEND_SWAP_TRANSACTION_TO_WALLET_SUCCEEDED",
  SEND_SWAP_TRANSACTION_TO_WALLET_FAILED = "SEND_SWAP_TRANSACTION_TO_WALLET_FAILED",
  SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_STARTED = "SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_STARTED",
  SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_SUCCEEDED = "SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_SUCCEEDED",
  SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_FAILED = "SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_FAILED",
  CLEAR_WALLET_PAIRINGS = "CLEAR_WALLET_PAIRINGS",
  ADD_INSTALLED_EXTENSION = "ADD_INSTALLED_EXTENSION",
  WALLET_PAIRING_APPROVED = "WALLET_PAIRING_APPROVED",
  RECEIVED_CONNECTION_STATUS_CHANGED = "RECEIVED_CONNECTION_STATUS_CHANGED",
  LOCAL_CONNECTION_STATUS_CHANGED = "LOCAL_CONNECTION_STATUS_CHANGED",
  FETCH_POOL_LIQUIDITY_STARTED = "FETCH_POOL_LIQUIDITY_STARTED",
  FETCH_POOL_LIQUIDITY_SUCCEEDED = "FETCH_POOL_LIQUIDITY_SUCCEEDED",
  FETCH_POOL_LIQUIDITY_FAILED = "FETCH_POOL_LIQUIDITY_FAILED",
  SET_TRANSACTION_WAITING_TO_BE_SIGNED = "SET_TRANSACTION_WAITING_TO_BE_SIGNED",
}

type AsyncAction = (dispatch: (action: any) => any) => void;

/** INITIALIZE_WALLET_CONNECTION Action Types */

interface InitializeWalletConnectionStarted {
  type: ActionType.INITIALIZE_WALLET_CONNECTION_STARTED;
}

interface InitializeWalletConnectionSucceeded {
  type: ActionType.INITIALIZE_WALLET_CONNECTION_SUCCEEDED;
  field: "walletData";
  payload: any;
}

interface InitializeWalletConnectionFailed {
  type: ActionType.INITIALIZE_WALLET_CONNECTION_FAILED;
  payload: string;
}

/** PAIR_WITH_CONNECTED_WALLET Action Types */

interface PairWithConnectedWalletStarted {
  type: ActionType.PAIR_WITH_CONNECTED_WALLET_STARTED;
}

interface PairWithConnectedWalletSucceeded {
  type: ActionType.PAIR_WITH_CONNECTED_WALLET_SUCCEEDED;
}

interface PairWithConnectedWalletFailed {
  type: ActionType.PAIR_WITH_CONNECTED_WALLET_FAILED;
  payload: string;
}

/** PAIR_WITH_SELECTED_WALLET_EXTENSION Action Types */

interface PairWithSelectedWalletExtensionStarted {
  type: ActionType.PAIR_WITH_SELECTED_WALLET_EXTENSION_STARTED;
}

interface PairWithSelectedWalletExtensionSucceeded {
  type: ActionType.PAIR_WITH_SELECTED_WALLET_EXTENSION_SUCCEEDED;
}

interface PairWithSelectedWalletExtensionFailed {
  type: ActionType.PAIR_WITH_SELECTED_WALLET_EXTENSION_FAILED;
  payload: string;
}

/** FETCH_ACCOUNT_BALANCE Action Types */

interface FetchAccountBalanceStarted {
  type: ActionType.FETCH_ACCOUNT_BALANCE_STARTED;
}

interface FetchAccountBalanceSucceeded {
  type: ActionType.FETCH_ACCOUNT_BALANCE_SUCCEEDED;
  field: "walletData";
  payload: any; // AccountBalanceJson;
}

interface FetchAccountBalanceFailed {
  type: ActionType.FETCH_ACCOUNT_BALANCE_FAILED;
  payload: string;
}

/** GET_SPOT_PRICE Action Types */

interface FetchSpotPricesStarted {
  type: ActionType.FETCH_SPOT_PRICES_STARTED;
}

interface FetchSpotPricesSucceeded {
  type: ActionType.FETCH_SPOT_PRICES_SUCCEEDED;
  payload: Map<string, number | undefined> | undefined;
}

interface FetchSpotPricesFailed {
  type: ActionType.FETCH_SPOT_PRICES_FAILED;
  payload: string;
}

/** SEND_SWAP_TRANSACTION_TO_WALLET Action Types */
interface SendSwapTransactionToWalletStarted {
  type: ActionType.SEND_SWAP_TRANSACTION_TO_WALLET_STARTED;
}

interface SendSwapTransactionToWalletSucceeded {
  type: ActionType.SEND_SWAP_TRANSACTION_TO_WALLET_SUCCEEDED;
  payload: TransactionResponse;
}

interface SendSwapTransactionToWalletFailed {
  type: ActionType.SEND_SWAP_TRANSACTION_TO_WALLET_FAILED;
  payload: string;
}

interface SendAddLiquidityTransactionToWalletStarted {
  type: ActionType.SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_STARTED;
}

interface SendAddLiquidityTransactionToWalletSucceeded {
  type: ActionType.SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_SUCCEEDED;
}

interface SendAddLiquidityTransactionToWalletFailed {
  type: ActionType.SEND_ADD_LIQUIDITY_TRANSACTION_TO_WALLET_FAILED;
  errorMessage: string;
}

interface ClearWalletPairings {
  type: ActionType.CLEAR_WALLET_PAIRINGS;
  field: "walletData";
}

interface AddInstalledExtension {
  type: ActionType.ADD_INSTALLED_EXTENSION;
  payload: any;
}

interface WalletPairingApproved {
  type: ActionType.WALLET_PAIRING_APPROVED;
  field: "walletData";
  payload: MessageTypes.ApprovePairing;
}

interface LocalConnectionStatusChanged {
  type: ActionType.LOCAL_CONNECTION_STATUS_CHANGED;
  payload: any;
}

interface ReceivedConnectionStatusChanged {
  type: ActionType.RECEIVED_CONNECTION_STATUS_CHANGED;
  payload: ConnectionStatus;
}

/** FETCH_POOL_LIQUIDITY Action Types */

interface FetchPoolLiquidityStarted {
  type: ActionType.FETCH_POOL_LIQUIDITY_STARTED;
}

interface FetchPoolLiquiditySucceeded {
  type: ActionType.FETCH_POOL_LIQUIDITY_SUCCEEDED;
  payload: any; // PoolLiquidityJson;
}

interface FetchPoolLiquidityFailed {
  type: ActionType.FETCH_POOL_LIQUIDITY_FAILED;
  payload: string;
}

interface SetTransactionWaitingToBeSigned {
  type: ActionType.SET_TRANSACTION_WAITING_TO_BE_SIGNED;
  payload: boolean;
}

export type HashConnectAction =
  | AsyncAction
  | InitializeWalletConnectionStarted
  | InitializeWalletConnectionSucceeded
  | InitializeWalletConnectionFailed
  | PairWithConnectedWalletStarted
  | PairWithConnectedWalletSucceeded
  | PairWithConnectedWalletFailed
  | PairWithSelectedWalletExtensionStarted
  | PairWithSelectedWalletExtensionSucceeded
  | PairWithSelectedWalletExtensionFailed
  | FetchAccountBalanceStarted
  | FetchAccountBalanceSucceeded
  | FetchAccountBalanceFailed
  | FetchSpotPricesStarted
  | FetchSpotPricesSucceeded
  | FetchSpotPricesFailed
  | FetchPoolLiquidityStarted
  | FetchPoolLiquiditySucceeded
  | FetchPoolLiquidityFailed
  | SendSwapTransactionToWalletStarted
  | SendSwapTransactionToWalletSucceeded
  | SendSwapTransactionToWalletFailed
  | SendAddLiquidityTransactionToWalletStarted
  | SendAddLiquidityTransactionToWalletSucceeded
  | SendAddLiquidityTransactionToWalletFailed
  | AddInstalledExtension
  | WalletPairingApproved
  | ReceivedConnectionStatusChanged
  | LocalConnectionStatusChanged
  | ClearWalletPairings;
