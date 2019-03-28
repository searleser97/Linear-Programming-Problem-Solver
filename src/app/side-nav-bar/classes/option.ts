import {SubOption} from './sub-option';

export class Option {
  description: string;
  path: string;
  icon: string;
  hasSuboptions: boolean;
  suboptions: SubOption[];
  ranks: Set<number>;

  constructor(description, path, icon, hasSuboptions, suboptions, ranks?) {
    this.description = description;
    this.path = path;
    this.icon = icon;
    this.hasSuboptions = hasSuboptions;
    this.suboptions = suboptions;
    this.ranks = ranks;
  }
}
