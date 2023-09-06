export enum RichFragmentType {
  Text = 'text',
  TokenValue = 'tokenValue',
  Address = 'address',
}

export interface RichDecodedInfoFragment {
  type: RichFragmentType
  value: string
}

export interface RichTokenValueFragment extends RichDecodedInfoFragment {
  symbol: string | null
  logoUri: string | null
}

export type RichDecodedInfo = {
  fragments: Array<RichDecodedInfoFragment>
}
