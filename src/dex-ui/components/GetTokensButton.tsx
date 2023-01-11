import { TokenBalanceJson } from "@hashgraph/sdk/lib/account/AccountBalance";
import { TransactionResponse } from "@hashgraph/sdk";
import { HashConnectSigner } from "hashconnect/dist/esm/provider/signer";
import { useMutation } from "react-query";
import { useDexContext } from "../hooks";
import { HederaService } from "../services";
import { Link, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { Notification, LoadingDialog, NotficationTypes } from "../../dex-ui-components";
import { createHashScanLink } from "../utils";

/**
 * This is a temporary component used to add L49A, L49B, L49C, and L49D to a
 * connected wallet for testing purposes.
 * TODO: This should be removed in the future.
 */

interface UseGetL49TokensParams {
  receivingAccountId: string;
  associatedTokenIds: string[] | undefined;
  signer: HashConnectSigner;
}

function useGetL49Tokens() {
  return useMutation<TransactionResponse, Error, UseGetL49TokensParams, "getL49Tokens">(
    (params: UseGetL49TokensParams) => {
      const { receivingAccountId, associatedTokenIds, signer } = params;
      return HederaService.get10L49ABCDTokens(receivingAccountId, associatedTokenIds, signer);
    }
  );
}

export function GetTokensButton() {
  const { wallet } = useDexContext(({ wallet }) => ({ wallet }));
  const receivingAccountId = wallet.savedPairingData?.accountIds[0] ?? "";
  const getL49Tokens = useGetL49Tokens();

  function handleClickSendL49TokensToWallet() {
    const signer = wallet.getSigner();
    const associatedTokenIds = wallet.pairedAccountBalance?.tokens.map((token: TokenBalanceJson) => token.tokenId);
    getL49Tokens.mutate({ receivingAccountId, associatedTokenIds, signer });
  }

  function resetServerState() {
    getL49Tokens.reset();
  }

  function handleErrorDialogDismissButtonClicked() {
    resetServerState();
  }

  function handleNotificationCloseButtonClicked() {
    resetServerState();
  }

  return (
    <>
      <Notification
        type={NotficationTypes.SUCCESS}
        textStyle="b3"
        message={`10 L49A, L49B, L49C, and L49D Tokens sent to the connected wallet (${receivingAccountId}).`}
        isLinkShown={true}
        linkText="View in HashScan"
        linkRef={createHashScanLink(getL49Tokens.data?.transactionId.toString())}
        isCloseButtonShown={true}
        isVisible={getL49Tokens.isSuccess}
        handleClickClose={handleNotificationCloseButtonClicked}
      />
      <Link width="fit-content" color="#0180FF" onClick={handleClickSendL49TokensToWallet}>
        <Text variant="link" textDecoration="underline">
          Send 10 L49 Tokens to Wallet
        </Text>
      </Link>
      <LoadingDialog
        isOpen={getL49Tokens.isLoading}
        message={`Sending 10 L49A, L49B, L49C, and L49D Tokens to the connected wallet (${receivingAccountId}).`}
      />
      <LoadingDialog
        isOpen={getL49Tokens.isError}
        message={getL49Tokens.error?.message ?? ""}
        icon={<WarningIcon h={10} w={10} />}
        buttonConfig={{
          text: "Dismiss",
          onClick: handleErrorDialogDismissButtonClicked,
        }}
      />
    </>
  );
}
