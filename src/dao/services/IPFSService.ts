import { PinataPinResponse } from "@pinata/sdk";
import axios from "axios";
import * as process from "node:process";

export async function pinMarkdownToIPFS(metadata: string, fileName: string): Promise<PinataPinResponse> {
  const data = {
    metadata,
    fileName,
  };
  let url = "/.netlify/functions/pinToIPFS";
  if (process.env.VITE_PUBLIC_VERCEL) {
    url = "/api/pinToIPFS";
  }
  const pinataResponse = await axios.post<PinataPinResponse>(url, data);
  if (pinataResponse.status === 200) {
    return pinataResponse.data;
  } else {
    throw new Error("Failed to pin content to IPFS.");
  }
}

export async function fetchFileByCID(CID: string): Promise<string> {
  let url = "/.netlify/functions/ipfs";
  if (process.env.VITE_PUBLIC_VERCEL) {
    url = "/api/ipfs";
  }
  const pinataResponse = await axios.get(url, { params: { CID } });
  if (pinataResponse.status === 200) {
    return pinataResponse.data;
  } else {
    throw new Error(`Failed to fetch content with CID: ${CID} from IPFS.`);
  }
}
