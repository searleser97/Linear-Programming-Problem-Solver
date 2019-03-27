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
  variables = [];
  displayMatrix = false;
  auxColumnNames = [];

  constructor() {
  }

  ngOnInit() {
  }

  execDualSimplex(data: InputData) {

    const dsData = new DualSimplexData(this.matrixCopy(data.restrictions), data.isMaximization);
    this.fixInput(dsData);

    alert(dsData.zj.length);

    this.variables = [];

    for (let i = 0; i < dsData.zj.length - dsData.slackVariablesSol.length - 1; i++) this.variables.push('X' + i);

    for (let i = 0; i < dsData.slackVariablesSol.length; i++) {
      this.variables.push('S' + i);
      this.rowNames.push('S' + i);
    }

    this.columnNames = ['Name', ...this.variables, 'Solution Vector'];
    this.auxColumnNames = ['Solution Vector', ...this.variables];
    this.rowNames = ['Cj', ...this.rowNames, 'Zj', 'Zj - Cj'];

    dsData.rowNames = this.arrayCopy(this.rowNames);

    this.iterations = [dsData];

    this.dualSimplex(this.matrixCopy(dsData.restrictions), this.arrayCopy(dsData.zj), this.arrayCopy(dsData.slackVariablesSol));

    this.displayMatrix = true;
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
    if (keyCol === -1) {
      alert('This problem is not feasible, cannot be solved using Dual Simplex');
      return false;
    }
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

    this.rowNames[keyRow] = (keyCol > ((zj.length - 1) >> 1) ? 'S' : 'X') + (keyCol - 1);

    this.iterations.push(
      new DualSimplexData(
        this.matrixCopy(mat), false, this.arrayCopy(zj), this.arrayCopy(ssol), [keyRow, keyCol], this.arrayCopy(this.rowNames)
      )
    );

    if (!isFinalIteration)
      return this.dualSimplex(mat, zj, ssol);
    return mat[0][0];
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

  fixInput(data: DualSimplexData) {
    for (const restriction of data.restrictions)
      if (restriction.pop() === 1)
        for (let j = 0; j < restriction.length; j++)
          restriction[j] = -1 * restriction[j];

    if (data.isMaximization) data.restrictions = this.modifiedTranspose(data.restrictions);

    data.zj = Array(data.restrictions[0].length).fill(0);
    data.slackVariablesSol = Array(data.restrictions.length - 1).fill(0);

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

  matrixCopy(mat: number[][]) {
    const copy = Array.from({
      length: mat.length
    }, () => (Array(mat[0].length).fill(0)));
    for (let i = 0; i < mat.length; i++)
      for (let j = 0; j < mat[i].length; j++)
        copy[i][j] = mat[i][j];
    return copy;
  }

  arrayCopy(arr: any[]) {
    const copy = Array(arr.length);
    for (let i = 0; i < arr.length; i++)
      copy[i] = arr[i];
    return copy;
  }

  getIntOrFixed(n: number) {
    if (n === Math.floor(n))
      return n;
    else
      return n.toFixed(3);
  }

  getCoef(i: number, j: number, iteration: DualSimplexData) {
    if (i === iteration.restrictions.length)
      return this.getIntOrFixed(iteration.zj[j]);
    if (i > iteration.restrictions.length)
      return this.getIntOrFixed(iteration.zj[j] - iteration.restrictions[0][j]);
    return this.getIntOrFixed(iteration.restrictions[i][j]);
  }
}
