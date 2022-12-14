import { Proposal } from "../../store/governanceSlice";
import { formatDuration } from "../../utils";
import { FormattedProposal } from "./types";

/**
 * Coverts proposal data into a format that will be displayed in the UI.
 * @param proposal - The proposal data to be formatted.
 * @returns A formatted version of the proposal data.
 */
export const formatProposal = (proposal: Proposal): FormattedProposal => {
  const { contractId, id, title, author, description, status, timeRemaining, state, votes } = proposal;
  const [yes, no, abstain, quorum, max] = [
    votes.yes?.toNumber(),
    votes.no?.toNumber(),
    votes.abstain?.toNumber(),
    votes.quorum?.toNumber(),
    votes.max?.toNumber(),
  ];
  return {
    contractId,
    id: id.toString(),
    title,
    author: author.toString(),
    description,
    status,
    timeRemaining: timeRemaining ? formatDuration(timeRemaining) : undefined,
    state,
    votes: {
      yes,
      no,
      abstain,
      quorum,
      remaining: Number(max) - (Number(yes) + Number(no) + Number(abstain)),
      max,
    },
  };
};
