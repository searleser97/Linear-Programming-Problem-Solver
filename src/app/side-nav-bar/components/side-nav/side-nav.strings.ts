import {Option} from '../../classes/option';
import {SubOption} from '../../classes/sub-option';

export const methodsUrl = [
  'random',
  'simplex1',
  'simplex2',
  'dualsimplex',
  'genetic',
  'analitic'
];

export const menuDB: Option[] = [
  new Option('Random Variables', methodsUrl[0], 'chevron_right', false, [], new Set([])),
  new Option('Simplex', '', 'chevron_right', true,
    [
      new SubOption('Simplex 1.0', methodsUrl[1]),
      new SubOption('Simplex 2.0', methodsUrl[2]),
      new SubOption('Dual Simplex', methodsUrl[3])
    ],
    new Set([])),
  new Option('Genetic', methodsUrl[4], 'chevron_right', false, [], new Set([])),
  new Option('Analitic', methodsUrl[5], 'chevron_right', false, [], new Set([]))
];
