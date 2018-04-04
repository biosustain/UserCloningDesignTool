import { Feat } from './feat'

export interface Part {
  id?: number;
  ice_id?: number;
  ice_name?: string;
  order?: number;
  name: string;
  feats?: Feat[];
  sequence: string;
  errors: string[];
}
