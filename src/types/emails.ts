export type RegisterEmailRequestBody = {
  emailAddress: string
  signer: string
}

export type ChangeEmailRequestBody = {
  emailAddress: string
}

export type RegisterEmailRequestHeader = {
  ['Safe-Wallet-Signature']: string
  ['Safe-Wallet-Signature-Timestamp']: string
}

export type VerifyEmailRequestBody = {
  code: string
}
