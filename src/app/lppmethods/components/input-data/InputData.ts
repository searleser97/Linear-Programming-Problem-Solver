export class InputData {
  restrictions: number[][];
  isMaximization: boolean;
  variablesCount: number;
  restrictionsCount: number;

  constructor(restrictions: number[][], isMaximization: boolean, variablesCount: number, restrictionsCount: number) {
    this.restrictions = restrictions;
    this.isMaximization = isMaximization;
    this.variablesCount = variablesCount;
    this.restrictionsCount = restrictionsCount;
  }
}
