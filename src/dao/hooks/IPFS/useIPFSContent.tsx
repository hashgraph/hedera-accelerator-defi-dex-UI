import { useQuery } from "react-query";
import { DAOQueries } from "../types";
import daoSDK from "@dao/services";
import { isCIDValid } from "@dao/utils";

type UseIPFSContentQueryKey = [DAOQueries.IPFSContent, string | undefined];

export function useIPFSContent(CID: string) {
  return useQuery<string, Error, string, UseIPFSContentQueryKey>(
    [DAOQueries.IPFSContent, CID],
    async () => {
      return daoSDK.fetchFileByCID(CID);
    },
    {
      enabled: !!CID && isCIDValid(CID),
    }
  );
}
