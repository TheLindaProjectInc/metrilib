export type MRC721AttributeDataType = 'string' | 'date' | 'number';

export interface IMRC721Attribute {
  trait_type: string;
  value: any;
  display_type?: MRC721AttributeDataType;
}
