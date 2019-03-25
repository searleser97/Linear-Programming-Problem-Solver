import {Component, OnInit} from '@angular/core';
import {InputData} from '../input-data/InputData';
import {DualSimplexData} from './DualSimplexData';

@Component({
  selector: 'app-dualsimplex',
  templateUrl: './dualsimplex.component.html',
  styleUrls: ['./dualsimplex.component.scss']
})
export class DualsimplexComponent implements OnInit {

  INF = 1073741824;
  epsilon = 0.00001;
  iterations: DualSimplexData[];
  columnNames: string[] = [];
  rowNames: string[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  execDualSimplex(data: InputData) {
    const variables = [];
    for (let i = 0; i < data.variablesCount; i++) variables.push('X' + i);
    for (let i = 0; i < data.variablesCount; i++) {
      variables.push('S' + i);
      this.rowNames.push('S' + i);
    }
    // this.columnNames = ['Name', 'CBi', ...variables, ' ', 'Solution Vector'];
    this.rowNames = [' ', ...this.rowNames, 'Zj', 'Cj'];
    this.columnNames = ['Solution Vector'];

    const dsData = new DualSimplexData(data.restrictions, data.isMaximization);
    this.fixInput(dsData);
    this.iterations = [dsData];
    // this.dualSimplex(dsData.restrictions, dsData.zj, dsData.slackVariablesSol);
  }

  makeZeroIfCloseToZero(n) {
    return Math.abs(n) < this.epsilon ? 0 : n;
  }

  getKeyColumn(keyRow, zj, cj) {
    let minRatio = this.INF;
    let column = -1;
    for (let i = 1; i < keyRow.length; i++)
      if (keyRow[i] < 0) {
        const ratio = (zj[i] - cj[i]) / keyRow[i];
        if (ratio < minRatio)
          minRatio = ratio, column = i;
      }
    return column;
  }

  getKeyRow(mat) {
    let mostNegative = this.INF;
    let row = -1;
    for (let i = 1; i < mat.length; i++)
      if (mat[i][0] < mostNegative)
        mostNegative = mat[i][0], row = i;
    return row;
  }

  dualSimplex(mat, zj, ssol) {
    const keyRow = this.getKeyRow(mat);
    const keyCol = this.getKeyColumn(mat[keyRow], zj, mat[0]);
    if (keyCol === -1)
      return false;
    const keyPivot = mat[keyRow][keyCol];
    ssol[keyRow - 1] = mat[0][keyCol]; // cj.size * 2 = ssol.size Check exception

    for (let j = 0; j < mat[keyRow].length; j++) {
      mat[keyRow][j] /= keyPivot;
      zj[j] = ssol[keyRow - 1] * mat[keyRow][j];
    }

    let isFinalIteration = true;
    for (let i = 1; i < mat.length; i++) {
      if (i !== keyRow) {
        const keyColValInRowI = mat[i][keyCol];
        for (let j = 0; j < mat[i].length; j++) {
          mat[i][j] = this.makeZeroIfCloseToZero(mat[i][j] - mat[keyRow][j] * keyColValInRowI);
          zj[j] += ssol[i - 1] * mat[i][j];
        }
      }
      if (mat[i][0] < 0)
        isFinalIteration = false;
    }

    this.iterations.push(new DualSimplexData(mat, false, zj, ssol, [keyRow, keyCol]));

    if (!isFinalIteration)
      return this.dualSimplex(mat, zj, ssol);
    let ans = 0;
    const limit = ((mat[0].length - 1) >> 1) + 1;
    for (let i = 1; i < limit; i++) ans += mat[0][i] * mat[i][0];
    console.log('Ans', ans);
    return ans;
  }

  modifiedTranspose(mat) {
    const transposed = Array.from({
      length: mat[0].length
    }, () => (Array(mat.length).fill(0)));
    for (let i = 0; i < mat.length; i++)
      for (let j = 0; j < mat[i].length; j++)
        transposed[j][i] = j ? -1 * mat[i][j] : mat[i][j];
    return transposed;
  }

  fixInput(data) {
    for (const restriction of data.restrictions)
      if (restriction.pop() === 1)
        for (let j = 0; j < restriction.length; j++)
          restriction[j] = -1 * restriction[j];

    if (data.isMaximitation) data.restrictions = this.modifiedTranspose(data.restrictions);

    for (let i = 1; i < data.restrictions.length; i++) {
      for (let j = 1; j < data.restrictions.length; j++)
        data.restrictions[i].push(i ^ j ? 0 : 1);
      data.restrictions[0].push(0);
      data.zj.push(0);
    }
  }

  range(from: number, to: number) {
    const arr = [];
    while (from < to)
      arr.push(from), from++;
    return arr;
  }

  getSolution(i, mat) {
    console.log(mat);
    if (i >= mat.length) return ' ';
    else return mat[i][0];
  }
}
