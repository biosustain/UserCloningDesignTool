import { Part } from './part'
import { AmuserSetting } from './amuser-settings'
import { Report }    from './report'

export interface Project {
  id?: number;
  ice_id?: number;
  name: string;
  description?: string;
  parts: Part[];
  amusercloning: AmuserSetting;
  report?: Report;
  genbank?: string;
  errors: string[];
}
