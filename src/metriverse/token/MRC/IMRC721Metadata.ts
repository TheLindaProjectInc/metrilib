import { IMRC721Attribute } from './IMRC721Attribute';

export interface IMRC721Metadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  animation_url?: string;
  attributes?: IMRC721Attribute[];
}
