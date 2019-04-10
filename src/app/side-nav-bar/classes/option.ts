import {SubOption} from './sub-option';

export class Option {
  description: string;
  path: string;
  icon: string;
  hasSuboptions: boolean;
  suboptions: SubOption[];
  ranks: Set<number>;
  animate: boolean;

  constructor(description, path, icon, hasSuboptions, suboptions, animate = false, ranks?) {
    this.description = description;
    this.path = path;
    this.icon = icon;
    this.hasSuboptions = hasSuboptions;
    this.suboptions = suboptions;
    this.animate = animate;
    this.ranks = ranks;
  }
}
