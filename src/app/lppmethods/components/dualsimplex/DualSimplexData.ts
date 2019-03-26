export class DualSimplexData {
  zj: number[];
  slackVariablesSol: number[];
  restrictions: number[][];
  isMaximization: boolean;
  pivot: number[];
  rowNames: string[];

  constructor(restrictions: number[][], isMaximization: boolean, zj?: number[], slackVariablesSol?: number[], pivot?: number[],
              rowNames?: string[]) {
    this.zj = zj || Array(restrictions[0].length - 1).fill(0);
    this.slackVariablesSol = slackVariablesSol || Array(restrictions.length - 1).fill(0);
    this.restrictions = restrictions;
    this.isMaximization = isMaximization;
    this.pivot = pivot;
    this.rowNames = rowNames;
  }
}
