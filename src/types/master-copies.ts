export enum MasterCopyDeployer {
  GNOSIS = 'Gnosis',
  CIRCLES = 'Circles',
}

export type MasterCopyReponse = {
  address: string
  version: string
  deployer: MasterCopyDeployer
  deployerRepoUrl: string
}[]
