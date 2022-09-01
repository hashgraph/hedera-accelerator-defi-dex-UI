import { Box, Flex, Text } from "@chakra-ui/react";
import { Button, TokenAmountInput, TokenSelector } from "../base";
import { WalletConnectionStatus } from "../../hooks/useHashConnect";
import { ChangeEvent, MouseEvent, useCallback } from "react";
import { CONNECT_TO_VIEW, SELECT_TOKEN_TO_VIEW } from "./constants";
export interface TokenInputProps {
  "data-testid": string;
  isDisabled?: boolean;
  title: string;
  tokenAmount: number;
  tokenSymbol: string | undefined;
  tokenBalance: number | undefined;
  walletConnectionStatus: WalletConnectionStatus;
  onTokenAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onTokenSymbolChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMaxButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onHalfButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * A Token Input component provides an input for a token amount, a dropdown to select a token symbol,
 * and text to display a user's wallet balance for the selected token symbol.
 * type: Stateless
 * @param props -
 * @returns
 */
const TokenInput = (props: TokenInputProps) => {
  const {
    title,
    isDisabled = false,
    tokenAmount,
    tokenSymbol,
    tokenBalance,
    walletConnectionStatus,
    onTokenAmountChange,
    onTokenSymbolChange,
    onMaxButtonClick,
    onHalfButtonClick,
  } = props;

  const showTokenBalance = useCallback(() => {
    if (walletConnectionStatus !== WalletConnectionStatus.PAIRED) {
      return CONNECT_TO_VIEW;
    }
    if (tokenSymbol === undefined || tokenSymbol === "") {
      return SELECT_TOKEN_TO_VIEW;
    }
    return tokenBalance;
  }, [walletConnectionStatus, tokenSymbol, tokenBalance]);

  return (
    <>
      <Text color="#4D4D4D" fontSize="xs">
        {title}
      </Text>
      <Box border="1px solid black" borderRadius="5px" backgroundColor="#F2F2F2">
        <Flex>
          <Box flex="5">
            <TokenAmountInput
              data-testid={props["data-testid"]}
              isDisabled={isDisabled}
              value={tokenAmount}
              onChangeHandler={onTokenAmountChange}
              variant="token-amount-input"
            />
          </Box>
          <Box flex="4">
            <TokenSelector value={tokenSymbol} onChangeHandler={onTokenSymbolChange} />
          </Box>
        </Flex>
        <Flex padding="0.25rem 0" alignItems="center" backgroundColor="#F2F2F2">
          <Text fontSize="xs" paddingLeft="0.5rem" paddingRight="0.75rem" fontWeight="bold">
            Balance: {showTokenBalance()}
          </Text>
          <Button padding="0" variant="xs-text" onClick={onHalfButtonClick}>
            Half
          </Button>
          <Button padding="0" variant="xs-text" onClick={onMaxButtonClick}>
            Max
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export { TokenInput };
