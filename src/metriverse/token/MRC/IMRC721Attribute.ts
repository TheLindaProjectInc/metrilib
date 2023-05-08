export type MRC721AttributeDataType =
  | 'string'
  | 'date'
  | 'number'
  | 'percentage'
  | 'uri';

export interface IMRC721Attribute {
  trait_type: string;
  value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  display_type?: MRC721AttributeDataType;
}
