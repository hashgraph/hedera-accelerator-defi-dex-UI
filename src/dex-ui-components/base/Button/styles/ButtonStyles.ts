import { theme, ComponentStyleConfig } from "@chakra-ui/react";

/**
 * Base Chakra UI styles and variants for the Hedera DEX Button and IconButton components.
 */
export const ButtonStyles: ComponentStyleConfig = {
  baseStyle: {},
  variants: {
    primary: {
      bg: "black",
      color: "white",
      height: "44px",
      padding: "16px",
      borderRadius: "8px",
      fontWeight: "bold",
    },
    "switch-token-inputs": (props) => ({
      ...theme.components.Button.variants?.outline(props),
      height: "42px",
      width: "42px",
      bg: "white",
      color: "black",
      borderColor: "black",
      marginTop: "0.5rem",
    }),
    settings: {
      height: "42px",
      width: "42px",
      bg: "white",
      color: "black",
    },
    "xs-text": {
      height: "fit-content",
      width: "fit-content",
      bg: "transparent",
      color: "#31A9BD",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "xs",
    },
  },
  defaultProps: {
    variant: "primary",
  },
};