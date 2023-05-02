import { Button, Box, Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Color, HashScanLink, HashscanData, MetricLabel } from "@dex-ui-components";
import * as R from "ramda";
import { TokenBalance } from "@hooks";
interface AssetsListProps {
  assets: TokenBalance[];
  totalAssetValue: number;
}

export function AssetsList(props: AssetsListProps) {
  const { assets, totalAssetValue } = props;
  // change to token id match
  const hbarIndex = assets?.findIndex((asset) => asset.name === "HBAR");
  // @ts-ignore - @types/ramda has not yet been updated with a type for R.swap
  const assetsWithHBARFirst: Asset[] = R.swap(0, hbarIndex, assets);
  return (
    <>
      <Text textStyle="p medium medium" marginBottom="1rem">
        Total Value: {totalAssetValue} USD
      </Text>
      <Flex direction="row" minWidth="100%">
        <SimpleGrid minWidth="100%" columns={2} spacingX="2rem" spacingY="2rem">
          {assetsWithHBARFirst.map((asset, index) => {
            const { name, tokenId, balance, symbol, value } = asset;
            return (
              <Flex
                key={index}
                direction="column"
                bg={Color.White_02}
                justifyContent="space-between"
                height="177px"
                border={`1px solid ${Color.Neutral._200}`}
                borderRadius="4px"
                padding="1.5rem"
              >
                <Flex direction="row" justifyContent="space-between" gap="2">
                  <Box flexGrow="2">
                    <Text textStyle="p medium semibold">{name}</Text>
                    <HashScanLink id={tokenId} type={HashscanData.Token} />
                  </Box>

                  <Button isDisabled={true}>Send</Button>
                </Flex>
                <Divider />
                <Flex direction="row" justifyContent="space-between">
                  <Box flex="1">
                    <MetricLabel label="BALANCE" value={`${balance} ${symbol}`} />
                  </Box>
                  <Box flex="1">
                    <MetricLabel label="VALUE" value={value} />
                  </Box>
                </Flex>
              </Flex>
            );
          })}
        </SimpleGrid>
      </Flex>
    </>
  );
}