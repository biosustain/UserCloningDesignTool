import { Feat } from './feat';

export interface SeqRecord {
  id: number;
  partId: string;
  name: string;
  sequence: string;
  description: string;
  order?: number;
  feats?: Feat[];
}
