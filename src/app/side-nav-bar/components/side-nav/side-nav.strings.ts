class SubOption {
  description: string;
  path: string;

  constructor(description, path) {
    this.description = description;
    this.path = path;
  }
}

class Option {
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

export const menuDB = [
  new Option('Random Variables', '/random', 'chevron_right', false, [], new Set([])),
  new Option('Simplex', '', 'chevron_right', true,
    [
      new SubOption('Simplex 1.0', '/simplex1'),
      new SubOption('Simplex 2.0', '/simplex2'),
      new SubOption('Dual Simplex', '/dualsimplex')
    ],
    new Set([])),
  new Option('Genetic', '/genetic', 'chevron_right', false, [],
    new Set([4, 5, 6, 9]))];

