import { Text, Flex } from "@chakra-ui/react";
import { useWizardContext } from "./WizardContext";
import { Breadcrumb } from "../Breadcrumb";

export function WizardHeader() {
  const { title, backLabel, backTo } = useWizardContext();
  return (
    <Flex layerStyle="wizard__header">
      <Text textStyle="h4 medium">{title}</Text>
      <Breadcrumb to={backTo} label={backLabel} />
    </Flex>
  );
}
