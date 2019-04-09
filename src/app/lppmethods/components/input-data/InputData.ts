export class InputData {
  restrictions: number[][];
  isMaximization: boolean;
  variablesCount: number;
  restrictionsCount: number;
  iterationsCount: number;
  populationSize: number;
  precisionBits: number;

  constructor(restrictions: number[][], isMaximization: boolean, variablesCount: number, restrictionsCount: number,
              iterationsCount: number = 0, populationSize: number = 0, precisionBits: number = 0) {
    this.restrictions = restrictions;
    this.isMaximization = isMaximization;
    this.variablesCount = variablesCount;
    this.restrictionsCount = restrictionsCount;
    this.iterationsCount = iterationsCount;
    this.populationSize = populationSize;
    this.precisionBits = precisionBits;
  }
}
