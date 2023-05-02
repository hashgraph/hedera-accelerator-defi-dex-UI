import { Flex, SimpleGrid, Tag, Text } from "@chakra-ui/react";
import { Color, HashScanLink, HashscanData } from "@dex-ui-components";
import * as R from "ramda";
import { Member } from "./MultiSigDAODashboard";

interface MembersListProps {
  adminAccountId: string;
  members: Member[];
  memberCount: number;
}

export function MembersList(props: MembersListProps) {
  const { members, adminAccountId, memberCount } = props;
  const adminIndex = members?.findIndex((member) => member.accountId === adminAccountId);
  // @ts-ignore - @types/ramda has not yet been updated with a type for R.swap
  const membersWithAdminFirst: Member[] = R.swap(0, adminIndex, members);
  return (
    <>
      <Text textStyle="p medium medium" marginBottom="1rem">
        {memberCount} Members
      </Text>
      <Flex direction="row" minWidth="100%">
        <SimpleGrid minWidth="100%" columns={3} spacingX="2rem" spacingY="2rem">
          {membersWithAdminFirst?.map((member, index) => {
            const { accountId } = member;
            const isAdmin = accountId === adminAccountId;
            return (
              <Flex
                key={index}
                direction="column"
                bg={Color.White_02}
                justifyContent="space-between"
                border={`1px solid ${Color.Neutral._200}`}
                borderRadius="4px"
                padding="1.5rem"
              >
                <Flex direction="row" justifyContent="space-between" gap="4">
                  <HashScanLink id={accountId} type={HashscanData.Account} />
                  {isAdmin ? (
                    <Tag textStyle="p small medium" color={Color.Grey_Blue._500}>
                      Admin
                    </Tag>
                  ) : (
                    <></>
                  )}
                </Flex>
              </Flex>
            );
          })}
        </SimpleGrid>
      </Flex>
    </>
  );
}