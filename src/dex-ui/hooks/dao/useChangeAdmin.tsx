import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { DAOMutations, DAOQueries, HandleOnSuccess, useDexContext } from "@hooks";
import { TransactionResponse } from "@hashgraph/sdk";
import { DexService } from "@services";
import { isNil } from "ramda";

export type UseChangeAdminMutationResult = UseMutationResult<
  TransactionResponse | undefined,
  Error,
  UseChangeAdminParams,
  DAOMutations.ChangeAdmin
>;

interface UseChangeAdminParams {
  safeAccountId: string;
  proxyAddress: string;
}

export function useChangeAdmin(handleOnSuccess: HandleOnSuccess) {
  const queryClient = useQueryClient();
  const { wallet } = useDexContext(({ wallet }) => ({
    wallet,
  }));
  const signer = wallet.getSigner();
  return useMutation<TransactionResponse | undefined, Error, UseChangeAdminParams, DAOMutations.ChangeAdmin>(
    async (params: UseChangeAdminParams) => {
      const { safeAccountId, proxyAddress } = params;
      return DexService.sendChangeAdminForProposalTransaction(safeAccountId, proxyAddress, signer);
    },
    {
      onSuccess: (transactionResponse: TransactionResponse | undefined) => {
        if (isNil(transactionResponse)) return;
        queryClient.invalidateQueries([DAOQueries.DAOs, DAOQueries.Proposals]);
        handleOnSuccess(transactionResponse);
      },
    }
  );
}
