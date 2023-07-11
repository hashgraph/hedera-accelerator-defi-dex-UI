import BigNumber from "bignumber.js";
import { AccountId } from "@hashgraph/sdk";

enum ProposalType {
  Text = "Text",
  TokenTransfer = "Token Transfer",
  CreateToken = "Create Token",
  ContractUpgrade = "Contract Upgrade",
}

enum ProposalStatus {
  Active = "Active",
  Passed = "Passed",
  Failed = "Failed",
}

/**
 * The current Governor contract only utilizes three states: Active, Defeated, and Executed.
 */
enum ContractProposalState {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed,
}

enum ProposalState {
  Pending = "Pending",
  Active = "Active",
  Canceled = "Canceled",
  Defeated = "Defeated",
  Succeeded = "Succeeded",
  Queued = "Queued",
  Expired = "Expired",
  Executed = "Executed",
}

enum ProposalStateIcon {
  Active = "Active",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Disabled = "Disabled",
}

interface ProposalStates {
  status: string;
  iconType: string;
  timeRemaining?: string;
}

interface Proposal {
  id: string;
  contractId: string;
  type: ProposalType | undefined;
  title: string | undefined;
  author: AccountId;
  description: string;
  link: string;
  status: ProposalStatus | undefined;
  timeRemaining: BigNumber | undefined;
  state: ProposalState | undefined;
  timestamp: string | undefined;
  transferFromAccount?: string | undefined;
  transferToAccount?: string | undefined;
  tokenToTransfer?: string | undefined;
  transferTokenAmount?: number | undefined;
  votedUser: string | undefined;
  isQuorumReached: boolean | undefined;
  voted: boolean | undefined;
  votes: {
    yes: BigNumber | undefined;
    no: BigNumber | undefined;
    abstain: BigNumber | undefined;
    quorum: BigNumber | undefined;
    max: BigNumber | undefined;
  };
}

export { ProposalType, ContractProposalState, ProposalState, ProposalStatus, ProposalStateIcon };
export type { Proposal, ProposalStates };
