import { Part } from './part'
import { Project } from './project'
import { AmuserSetting } from './amuser-settings'

export interface Combinatorial {
  id?: number;
  name: string;
  description?: string;
  parts: Part[][];
  projects?: Project[];
  amusercloning: AmuserSetting;
}
