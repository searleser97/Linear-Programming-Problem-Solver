import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {InputData} from './InputData';

@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.scss']
})
export class InputDataComponent implements OnInit {

  @Output() Execute = new EventEmitter<InputData>();
  numberOfVariables: number;
  numberOfRestrictions: number;
  inputMatrix: object[];
  variables: string[] = [];
  columnNames: string[] = [];
  rowNames: string[] = [];
  displayMatrix = false;
  isMaximization: boolean;

  constructor() {
  }

  ngOnInit() {
    this.isMaximization = true;
    this.numberOfVariables = 3;
    this.numberOfRestrictions = 3;
  }

  createInputMatrix() {
    this.variables = [];
    this.rowNames = ['Z'];
    for (let i = 0; i < this.numberOfVariables; i++)
      this.variables.push('X' + i);
    for (let i = 0; i < this.numberOfRestrictions; i++)
      this.rowNames.push('R' + i);
    this.columnNames = [' ', ...this.variables, 'Inequality Sign', 'Solution Vector'];

    this.inputMatrix = [];

    // const row = {};
    // for (let i = 0; i < this.numberOfVariables + 2; i++) {
    //   row[i] = 0;
    // }
    //
    // for (let i = 0; i < this.numberOfRestrictions + 1; i++) {
    //   this.inputMatrix.push(Object.assign({}, row));
    // }

    // const row0 = {0: 0, 1: 1, 2: 2, 3: 3, 4: 0};
    // const row1 = {0: -4, 1: -2, 2: 1, 3: -1, 4: -1};
    // const row2 = {0: 8, 1: 1, 2: 1, 3: 2, 4: -1};
    // const row3 = {0: -2, 1: 0, 2: -1, 3: 1, 4: -1};

    const row0 = {0: 0, 1: 5, 2: 4, 3: 5, 4: 0};
    const row1 = {0: 350, 1: 6, 2: 2, 3: 3, 4: -1};
    const row2 = {0: 150, 1: 5, 2: 3, 3: 0, 4: -1};
    const row3 = {0: 20, 1: 0, 2: 0, 3: 1, 4: 1};

    this.inputMatrix.push(Object.assign({}, row0));
    this.inputMatrix.push(Object.assign({}, row1));
    this.inputMatrix.push(Object.assign({}, row2));
    this.inputMatrix.push(Object.assign({}, row3));

    this.displayMatrix = true;
  }

  outputData() {
    const mat = Array.from({length: this.inputMatrix.length}, () => (Array(Object.keys(this.inputMatrix[0]).length).fill(0)));
    for (let i = 0; i < this.numberOfRestrictions + 1; i++)
      for (let j = 0; j < this.numberOfVariables + 2; j++) mat[i][j] = this.inputMatrix[i][j];
    this.Execute.emit(new InputData(mat, this.isMaximization, this.numberOfVariables, this.numberOfRestrictions));
  }

  range(from: number, to: number) {
    const arr = [];
    while (from < to) arr.push(from++);
    return arr;
  }

}
