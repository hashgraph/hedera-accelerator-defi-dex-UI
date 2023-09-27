import { Link, Flex } from "@chakra-ui/react";
import { Text, Color, GithubIcon } from "@shared/ui-kit";

export function PageFooter() {
  return (
    <Flex layerStyle="footer">
      <Text.P_XSmall_Regular>Hedera © 2023</Text.P_XSmall_Regular>
      <Flex direction="row" alignItems="center" gap="8">
        <Link
          textStyle="p small regular link"
          color={Color.Primary._500}
          href="https://github.com/hashgraph/hedera-accelerator-defi-dex-ui"
          isExternal={true}
        >
          <Flex direction="row" gap="1" alignItems="center">
            <GithubIcon fill={Color.Primary._500} /> UI
          </Flex>
        </Link>
        <Link
          textStyle="p small regular link"
          color={Color.Primary._500}
          href="https://github.com/hashgraph/hedera-accelerator-defi-dex"
          isExternal={true}
        >
          <Flex direction="row" gap="1" alignItems="center">
            <GithubIcon fill={Color.Primary._500} /> Smart Contracts
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
}
