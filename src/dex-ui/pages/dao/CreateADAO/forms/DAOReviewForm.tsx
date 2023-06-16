import {
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  SimpleGrid,
  Checkbox,
  Flex,
  Image,
} from "@chakra-ui/react";
import { ReactElement, cloneElement } from "react";
import { FormInput, Tag } from "@dex-ui-components";
import { DAOFormContainer } from "./DAOFormContainer";
import { DAOType } from "@services";
import { DefaultLogoIcon, Color } from "@dex-ui-components";

interface DAOReviewFormProps {
  details: {
    name: string;
    description: string;
    logoUrl: string | undefined;
    isPublic: boolean;
    type: DAOType | undefined;
  };
  governance: ReactElement<typeof FormInput>[];
  voting: ReactElement<typeof FormInput>[];
}

export function DAOReviewForm(props: DAOReviewFormProps) {
  const { details, governance, voting } = props;
  return (
    <DAOFormContainer>
      <Accordion defaultIndex={[0]} allowMultiple padding={"0.2rem"}>
        <AccordionItem border="none">
          <Text textStyle="p medium medium">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Details & Type
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4}>
            <Flex direction="row" flex="7" alignItems="top" gap="1">
              <Flex flex="1" alignItems="top">
                <Image
                  src={details.logoUrl}
                  objectFit="contain"
                  borderRadius="full"
                  alt="DAO Logo URl"
                  boxSize="4rem"
                  fallback={<DefaultLogoIcon boxSize="4rem" color={Color.Grey_Blue._100} />}
                />
              </Flex>
              <Flex direction="column" flex="6" gap="4" alignItems="start">
                <FormInput<"name">
                  inputProps={{
                    id: "name",
                    label: "Name",
                    type: "text",
                    value: details.name,
                    isReadOnly: true,
                  }}
                />
                <FormInput<"description">
                  inputProps={{
                    id: "description",
                    label: "Description",
                    type: "text",
                    value: details.description,
                    isReadOnly: true,
                  }}
                />
                <Checkbox isChecked={details.isPublic} isReadOnly>
                  List DAO publicly
                </Checkbox>
                <Flex direction="column" gap="0.2rem">
                  <Text textStyle="p xsmall medium" color={Color.Neutral._500}>
                    TYPE
                  </Text>
                  <Tag label={details.type} />
                </Flex>
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <Text textStyle="p medium medium">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Governance
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={2} spacingX="1rem" spacingY="0.75rem">
              {governance.map((formInput, index) => {
                return cloneElement(formInput, { key: index });
              })}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <Text textStyle="p medium medium">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Voting
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={2} spacingX="1rem" spacingY="0.75rem">
              {voting.map((formInput, index) => {
                return cloneElement(formInput, { key: index });
              })}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </DAOFormContainer>
  );
}
