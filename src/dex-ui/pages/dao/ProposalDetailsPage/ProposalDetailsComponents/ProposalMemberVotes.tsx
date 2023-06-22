import { Text, Flex } from "@chakra-ui/react";
import { HashScanLink, HashscanData } from "@dex-ui-components";

interface ProposalMemberVotesProps {
  approvers: string[];
  approvalCount: number;
}

export function ProposalMemberVotes(props: ProposalMemberVotesProps) {
  const { approvers, approvalCount } = props;

  const ApproversList =
    approvalCount === 0 ? (
      <Text textStyle="p small italic">This transaction has not yet been confirmed by an owner.</Text>
    ) : (
      <>
        {approvers.map((approver) => (
          <HashScanLink id={approver} type={HashscanData.Account} />
        ))}
      </>
    );

  return (
    <Flex direction="column" gap="2" width="100%">
      <Text textStyle="p small medium">Votes from</Text>
      {ApproversList}
    </Flex>
  );
}