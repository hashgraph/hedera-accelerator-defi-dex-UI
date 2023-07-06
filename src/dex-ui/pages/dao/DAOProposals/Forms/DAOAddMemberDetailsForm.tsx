import { Flex, Text } from "@chakra-ui/react";
import { Color, FormInput, FormTextArea } from "@dex-ui-components";
import { useFormContext } from "react-hook-form";
import { CreateDAOMemberOperationForm, CreateDAOProposalContext, DAOProposalType } from "../types";
import { useOutletContext } from "react-router-dom";
import { checkForValidAccountId, checkForValidPositiveNumber } from "@utils";

export function DAOAddMemberDetailsForm() {
  const { threshold, membersCount, proposalType } = useOutletContext<CreateDAOProposalContext>();
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext<CreateDAOMemberOperationForm>();

  if (proposalType !== DAOProposalType.AddMember) {
    setValue("type", DAOProposalType.AddMember);
  }

  return (
    <Flex direction="column" gap="1.3rem">
      <FormInput<"title">
        inputProps={{
          id: "title",
          label: "Title",
          type: "text",
          placeholder: "Enter Title",
          register: {
            ...register("title", {
              required: { value: true, message: "A title is required." },
            }),
          },
        }}
        isInvalid={Boolean(errors?.title)}
        errorMessage={errors?.title && errors?.title?.message}
      />
      <FormTextArea<"description">
        textAreaProps={{
          id: "description",
          label: "Description",
          placeholder: "Add a description",
          register: {
            ...register("description", {
              required: { value: true, message: "A description is required." },
              validate: (value) => value.length <= 240 || "Maximum character count for the description is 240.",
            }),
          },
        }}
        isInvalid={Boolean(errors?.description)}
        errorMessage={errors?.description && errors?.description?.message}
      />
      <FormInput<"memberAddress">
        inputProps={{
          id: "memberAddress",
          label: "Member Address",
          type: "text",
          placeholder: "Enter Member Address",
          register: {
            ...register("memberAddress", {
              required: { value: true, message: "A member address is required." },
              validate: (value) => checkForValidAccountId(value) || "Invalid address, please, enter a different one.",
            }),
          },
        }}
        isInvalid={Boolean(errors?.memberAddress)}
        errorMessage={errors?.memberAddress && errors?.memberAddress?.message}
      />
      <Flex direction="column" gap="1">
        <Flex direction="row" gap="1" alignItems="center">
          <Text textStyle="p medium regular" color={Color.Neutral._500}>
            Proposal threshold confirmation requirement is
          </Text>
          <Text textStyle="p medium semibold">{`${threshold} / ${membersCount} members`}</Text>
        </Flex>
        <Text textStyle="p medium regular" color={Color.Neutral._500}>
          By adding the new member the threshold changes to:
        </Text>
      </Flex>
      <Flex direction="row" gap="2" alignItems="center">
        <FormInput<"newThreshold">
          flex="4"
          inputProps={{
            id: "newThreshold",
            isTooltipVisible: true,
            tooltipLabel: "",
            flex: 4,
            label: "Threshold",
            type: "number",
            unit: "members",
            placeholder: "Enter Threshold",
            register: {
              ...register("newThreshold", {
                validate: (value) =>
                  checkForValidPositiveNumber({ input: value, maxCapValue: membersCount + 1 }) ||
                  "A valid threshold is required.",
              }),
            },
          }}
          isInvalid={Boolean(errors?.newThreshold)}
          errorMessage={errors?.newThreshold && errors?.newThreshold?.message}
        />
        <Text flex="1" textStyle="p medium semibold" paddingTop="0.8rem">{`/ ${membersCount + 1} members`}</Text>
      </Flex>
    </Flex>
  );
}
