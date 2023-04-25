import { Box, Button, Center, Flex, Spacer, Text, useRadioGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  ArrowLeftIcon,
  Color,
  RadioCard,
  TextIcon,
  TokenIcon,
  TrendingUpIcon,
  WalletIcon,
} from "../../../dex-ui-components";
import { Page, PageHeader } from "../../layouts";

const newProposalOptions = [
  {
    name: "new-token",
    type: "New Token",
    icon: <TokenIcon fill={Color.Yellow_01} options={{ boxSize: "2rem" }} />,
    description: "Proposal to add a new token to the exchange",
  },
  {
    name: "text",
    type: "Text",
    icon: <TextIcon fill={Color.Blue_01} options={{ boxSize: "2rem" }} />,
    description: "Create a text only proposal",
  },
  {
    name: "token-transfer",
    type: "Token Transfer",
    icon: <WalletIcon fill={Color.Red_01_Opaque} options={{ boxSize: "2rem" }} />,
    description: "Proposal to transfer tokens from the community pool",
  },
  {
    name: "contract-upgrade",
    type: "Contract Upgrade",
    icon: <TrendingUpIcon fill={Color.Green_02} options={{ boxSize: "2rem" }} />,
    description: "Upgrade an existing contract",
  },
];

export const SelectProposalType = (props: any) => {
  const selectedProposalType = useRef<string>("new-token");
  const navigate = useNavigate();

  const handleProposalSelectionChange = (event: any) => {
    selectedProposalType.current = event;
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: "new-token",
    onChange: handleProposalSelectionChange,
  });

  const group = getRootProps();
  return (
    <Page
      header={
        <PageHeader
          leftContent={[<Text textStyle="h2">Create New Proposal</Text>]}
          rightContent={[
            <Breadcrumb to="/governance" as={ReachLink} label="Back to Proposals" leftIcon={<ArrowLeftIcon />} />,
          ]}
        />
      }
      body={
        <Center flexDirection="column" alignItems="center">
          <Text textStyle="h3">What kind of proposal is this?</Text>
          <Spacer padding="1.5rem" />
          <Flex direction="row" gap={6} {...group}>
            {newProposalOptions.map((option, index) => {
              const radio = getRadioProps({ value: option.name });
              return (
                <Box flex="1" width="255px" height="155px">
                  <RadioCard key={index} {...radio} padding="0.75rem">
                    <Flex height="100%" flexDirection="column" alignItems="center" justifyContent="space-between">
                      <Text textStyle="h3">{option.type}</Text>
                      {option.icon}
                      <Text textStyle="b2">{option.description}</Text>
                    </Flex>
                  </RadioCard>
                </Box>
              );
            })}
          </Flex>
          <Spacer padding="3rem" />
          <Button
            width="437px"
            onClick={() => navigate(`/governance/select-proposal-type/${selectedProposalType.current}`)}
          >
            Continue
          </Button>
          <Spacer padding="0.25rem" />
          <Button variant="cancel" width="437px" onClick={() => navigate(`/governance`)}>
            Cancel
          </Button>
        </Center>
      }
    />
  );
};
