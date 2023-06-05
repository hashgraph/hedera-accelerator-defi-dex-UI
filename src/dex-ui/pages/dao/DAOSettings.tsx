import { Button, Divider, Flex, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { FormInput, Color, MetricLabel, FormTextArea, FormInputList } from "@dex-ui-components";
import { isValidUrl } from "@utils";
import { useOutletContext } from "react-router-dom";
import { GovernanceDAODetailsContext } from "./GovernanceDAODashboard/types";
import { DAOFormContainer } from "./CreateADAO/forms/DAOFormContainer";
import { DAOSettingsForm } from "./CreateADAO/types";

export function DAOSettings() {
  const { dao } = useOutletContext<GovernanceDAODetailsContext>();

  const daoSettingsForm = useForm<DAOSettingsForm>({
    defaultValues: {
      ...dao,
    },
  });

  const {
    control,
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = daoSettingsForm;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "daoLinks",
  });
  const { logoUrl } = getValues();

  function onSubmit(data: DAOSettingsForm) {
    console.log("Details", data);
  }

  return (
    <form id="dao-settings-submit">
      <Flex direction="column" alignItems="center" maxWidth="841px" margin="auto" gap="8" paddingTop="2rem">
        <DAOFormContainer>
          <Flex direction="column" gap={2} marginBottom="0.4rem">
            <Text textStyle="p medium medium">Governance</Text>
            <Text textStyle="p small regular" marginBottom="0.7rem" color={Color.Neutral._500}>
              Manage the governance related DAO properties.
            </Text>
            <Divider />
          </Flex>
          <SimpleGrid minWidth="100%" columns={2} spacingX="2rem" spacingY="1.2rem">
            <Flex layerStyle="content-box">
              <MetricLabel
                label="MINIMUM PROPOSAL DEPOSIT"
                labelTextColor={Color.Neutral._500}
                labelTextStyle="p xsmall medium"
                labelOpacity="1.0"
                value={dao.minimumProposalDeposit ?? 0}
                valueStyle="p large medium"
                valueTextColor={Color.Neutral._900}
                valueUnitSymbol="HEY"
                valueUnitSymbolColor={Color.Neutral._900}
              />
            </Flex>
            <Flex layerStyle="content-box">
              <MetricLabel
                label="QUORUM"
                labelTextColor={Color.Neutral._500}
                labelTextStyle="p xsmall medium"
                labelOpacity="1.0"
                value={dao.quorumThreshold ?? 0}
                valueStyle="p large medium"
                valueTextColor={Color.Neutral._900}
                valueUnitSymbol="%"
                valueUnitSymbolColor={Color.Neutral._900}
              />
            </Flex>
            <Flex layerStyle="content-box">
              <MetricLabel
                label="VOTING DURATION"
                labelTextColor={Color.Neutral._500}
                labelTextStyle="p xsmall medium"
                labelOpacity="1.0"
                value={dao.votingPeriod}
                valueStyle="p large semibold"
                valueTextColor={Color.Neutral._900}
                valueUnitSymbol="days"
                valueUnitSymbolColor={Color.Neutral._900}
              />
            </Flex>
            <Flex layerStyle="content-box">
              <MetricLabel
                label="LOCKING PERIOD"
                labelTextColor={Color.Neutral._500}
                labelTextStyle="p xsmall medium"
                labelOpacity="1.0"
                value={dao.votingDelay}
                valueStyle="p large semibold"
                valueTextColor={Color.Neutral._900}
                valueUnitSymbol="days"
                valueUnitSymbolColor={Color.Neutral._900}
              />
            </Flex>
            <Flex layerStyle="content-box">
              <MetricLabel
                label="Vault locking period"
                labelTextColor={Color.Neutral._500}
                labelTextStyle="p xsmall medium"
                labelOpacity="1.0"
                value="1, 7, 30"
                valueStyle="p large semibold"
                valueTextColor={Color.Neutral._900}
                valueUnitSymbol="days"
                valueUnitSymbolColor={Color.Neutral._900}
              />
            </Flex>
          </SimpleGrid>
        </DAOFormContainer>
        <DAOFormContainer>
          <Flex direction="column" gap={2} marginBottom="0.4rem">
            <Text textStyle="p medium medium">General</Text>
            <Text textStyle="p small regular" marginBottom="0.7rem" color={Color.Neutral._500}>
              Manage the general DAO properties.
            </Text>
            <Divider />
          </Flex>
          <FormInput<"name">
            inputProps={{
              id: "name",
              label: "Name",
              type: "text",
              placeholder: "Enter the name of your DAO",
              register: {
                ...register("name", {
                  required: { value: true, message: "A name is required." },
                }),
              },
            }}
            isInvalid={Boolean(errors.name)}
            errorMessage={errors.name && errors.name.message}
          />
          <Flex direction="row" alignItems="center" gap="10">
            <FormInput<"logoUrl">
              inputProps={{
                id: "logoUrl",
                label: "Logo URL",
                type: "text",
                placeholder: "Enter the logo url of your DAO",
                register: {
                  ...register("logoUrl", {
                    validate: (value) => isValidUrl(value) || "Enter a Valid URL.",
                  }),
                },
              }}
              isInvalid={Boolean(errors.logoUrl)}
              errorMessage={errors.logoUrl && errors.logoUrl.message}
            />
            {isValidUrl(logoUrl) ? <Image src={logoUrl} boxSize="64px" objectFit="cover" alt="Logo Url" /> : undefined}
          </Flex>
          <FormTextArea<"description">
            textAreaProps={{
              id: "description",
              label: "Description",
              placeholder: "Add a description for your DAO",
              register: {
                ...register("description", {
                  required: { value: true, message: "A description is required." },
                  validate: (value) => value.length <= 240 || "Maximum character count for the description is 240.",
                }),
              },
            }}
            isInvalid={Boolean(errors.description)}
            errorMessage={errors.description && errors.description.message}
          />
          <Text textStyle="p small medium">Social</Text>
          <SimpleGrid row={1} spacingX="1rem">
            <FormInputList<DAOSettingsForm, "daoLinks">
              fields={fields}
              defaultFieldValue={{ value: "" }}
              formPath="daoLinks"
              fieldPlaceholder="Enter URL"
              fieldLabel=""
              fieldButtonText="+ Add Link"
              append={append}
              remove={remove}
              register={register}
            />
          </SimpleGrid>
          <Divider marginBottom="0.4rem" />
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            variant="primary"
            padding="10px 10px"
            height="40px"
            width="123px"
          >
            Save Changes
          </Button>
        </DAOFormContainer>
      </Flex>
    </form>
  );
}
