export enum BaseDAOContractFunctions {
  CreateDAO = "createDAO",
  UpdateDAOInfo = "updateDaoInfo",
}

export enum MultiSigDAOContractFunctions {
  ProposeTransferTransaction = "proposeTransferTransaction",
  ProposeTransaction = "proposeTransaction",
  ProposeTokenAssociation = "proposeTokenAssociateTransaction",
  DepositTokens = "depositTokens",
  ProposeDAOUpgrade = "proposeUpgradeProxyTransaction",
}

export enum GovernorDAOContractFunctions {
  CreateProposal = "createProposal",
  CreateTokenTransferProposal = "createTokenTransferProposal",
  CreateHBarTransferProposal = "createHBarTransferProposal",
  CreateContractUpgradeProposal = "createContractUpgradeProposal",
  CreateTextProposal = "createTextProposal",
  CreateTokenAssociationProposal = "createTokenAssociateProposal",
}

export enum NFTDAOContractFunctions {
  MintTokens = "mintTokens",
}