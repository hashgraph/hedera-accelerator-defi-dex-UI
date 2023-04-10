import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider, Container, extendTheme, Flex } from "@chakra-ui/react";
import {
  SwapPage,
  AddLiquidityPage,
  WithdrawPage,
  Pools,
  Governance,
  ProposalDetails,
  CreateProposal,
  SelectProposalType,
  CreatePoolPage,
  DAOsListPage,
  CreateADAOPage,
} from "./pages";
import { TopMenuBar } from "./layouts/TopMenuBar";
import {
  ButtonStyles,
  CardStyles,
  InputStyles,
  NumberInputStyles,
  TextStyles,
  SelectStyles,
  TooltipStyles,
  StepsV2Theme,
  Color,
} from "../dex-ui-components";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useWalletConnection } from "./hooks";
import { ScrollToTop } from "./utils";

const menuOptions = ["Swap", "Pools", "Governance", "DAOs"];
const SEVEN_SECONDS = 7 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * All React Queries will reference cached data for 7 seconds before
       * refetching the latest set of data (unless `staleTime` is overridden in a specific query).
       * Note that refreshing the page or refocusing the browser tab that contains the application
       * will always cause a refetch. This is a temporary default to reduce the volume of
       * calls we make to the hashio JSON RPC service.
       *
       * @see {@link file://./../../architecture/05_Event_Based_Historical_Queries.md} for more details
       * regarding a long term solution to reduce our hashio JSON RPC service hbar usage.
       */
      staleTime: SEVEN_SECONDS,
    },
  },
});

export const DEXTheme = extendTheme({
  styles: {
    global: {
      body: {
        background: Color.Primary_Bg,
      },
    },
  },
  textStyles: TextStyles,
  components: {
    Button: ButtonStyles,
    NumberInput: NumberInputStyles,
    Input: InputStyles,
    Card: CardStyles,
    Select: SelectStyles,
    Tooltip: TooltipStyles,
    Steps: StepsV2Theme,
  },
});

const DEX = () => {
  useWalletConnection();
  return (
    <ChakraProvider theme={DEXTheme}>
      <QueryClientProvider client={queryClient}>
        <Container
          color="black"
          w="100%"
          maxHeight="100%"
          maxWidth="100%"
          bg={Color.Primary_Bg}
          padding="0"
          marginBottom="5rem"
          centerContent
        >
          <Router>
            <ScrollToTop>
              <TopMenuBar menuOptions={menuOptions} />
              <Flex width="80rem" justifyContent="center">
                <Routes>
                  <Route path="/" element={<Navigate to="/swap" />} />
                  <Route path="/swap" element={<SwapPage />} />
                  <Route path="/pools" element={<Pools />} />
                  <Route path="/pools/add-liquidity" element={<AddLiquidityPage />} />
                  <Route path="/pools/withdraw" element={<WithdrawPage />} />
                  <Route path="/pools/create-pool" element={<CreatePoolPage />} />
                  <Route path="/governance" element={<Governance />} />
                  <Route path="/governance/proposal-details/:id" element={<ProposalDetails />} />
                  <Route path="/governance/select-proposal-type" element={<SelectProposalType />} />
                  <Route
                    path="/governance/select-proposal-type/new-token"
                    element={<CreateProposal proposalType="new-token" />}
                  />
                  <Route
                    path="/governance/select-proposal-type/text"
                    element={<CreateProposal proposalType="text" />}
                  />
                  <Route
                    path="/governance/select-proposal-type/token-transfer"
                    element={<CreateProposal proposalType="token-transfer" />}
                  />
                  <Route
                    path="/governance/select-proposal-type/contract-upgrade"
                    element={<CreateProposal proposalType="contract-upgrade" />}
                  />
                  <Route path="/DAOs" element={<DAOsListPage />} />
                  <Route path="DAOs/create-a-DAO" element={<CreateADAOPage />} />
                </Routes>
              </Flex>
            </ScrollToTop>
          </Router>
        </Container>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export { DEX };
