import {Component, OnInit} from '@angular/core';
import {Method} from '../../interfaces/method';
import {InputData} from '../input-data/InputData';

@Component({
  selector: 'app-genetic',
  templateUrl: './genetic.component.html',
  styleUrls: ['./genetic.component.scss']
})
export class GeneticComponent implements OnInit, Method {

  INF = 1 << 30;
  TIME_LIMIT = 12000;
  rounds = [];
  displayMatrix = false;
  columnNames = [];

  constructor() {
  }

  ngOnInit() {
  }

  getLimits(restrictions) {
    const minMax = []; // limits[i][0] = lower, limits[i][1] = upper
    for (let i = 1; i < restrictions[0].length - 1; i++)
      minMax[i] = [this.INF, -1 * this.INF];
    for (let i = 1; i < restrictions.length; i++)
      for (let j = 1; j < restrictions[i].length - 1; j++)
        if (restrictions[i][j] !== 0) {
          const aux = restrictions[i][0] / restrictions[i][j];
          if (aux > minMax[j][1])
            minMax[j][1] = aux;
          else if (aux < minMax[j][0])
            minMax[j][0] = aux;
        }
    return minMax;
  }

  calculateConst(lowerLimit, upperLimit, mj) {
    return (upperLimit - lowerLimit) / ((1 << mj) - 1);
  }

  calculateXj(lowerLimit, subVector, constant) {
    return lowerLimit + (subVector * constant);
  }

  verifyVector(restrictions, xj) {
    let flag = 1;
    for (let i = 1; i < restrictions.length; i++) {
      let sum = 0; // Result of replace the value for a restriction
      for (let j = 1; j < restrictions[i].length - 1; j++)
        sum += restrictions[i][j] * xj[j];

      if (restrictions[i][restrictions[i].length - 1] === 1) {  // We have an >=
        if (sum < restrictions[i][0])
          flag = 0;
      } else if (sum > restrictions[i][0])
        flag = 0;
    }
    return flag;
  }

  genXjvector(limits, randoms, constants) {
    const xj = [];
    for (let i = 1; i < randoms.length; i++)
      xj[i] = this.calculateXj(limits[i][0], randoms[i], constants[i]);
    return xj;
  }

  generateVector(restrictions, mj, limits, constants) {
    const varCount = restrictions[0].length - 2;
    const randoms = [];
    let counter = 0;
    let flag;
    let xj;
    // CONSTANTS is an array that contain (bj - aj) / (x^{mj} - 1)
    // We generate a constants for each variable

    while (true) {
      if (counter === this.TIME_LIMIT) {
        console.log('Vector not found');
        break;
      }

      // We generate a random value that have a length of mj[i] for each variable
      // Is like a Vector_i
      for (let i = 1; i < varCount + 1; i++)
        randoms[i] = this.myRandom(0, 1 << mj[i]);

      // console.log(randoms);
      // We calculate the Xj value for each variable that is in random[i]
      xj = this.genXjvector(limits, randoms, constants);
      flag = this.verifyVector(restrictions, xj);
      if (flag) break;
      counter++;
    }
    return [flag, randoms, xj];
  }

  findClosest(acum, i) {
    // if (i <= acum[0]) return 0;
    // if (i >= acum[acum.length - 1]) return acum.length - 1;
    // let l = 1, r = acum.length - 1;
    // while (l <= r) {
    //   let mid = (l + r) >> 1;
    //   if (i < acum[mid]) r = mid - 1;
    //   else if (i > acum[mid]) l = mid + 1;
    //   else return mid;
    // }
    // return (acum[l] - i) < (i - acum[r]) ? l : r;

    let closest = -1;
    let closestDist = this.INF;
    for (let j = 1; j < acum.length; j++)
      if (Math.abs(acum[j] - i) < closestDist) {
        closest = j;
        closestDist = Math.abs(acum[j] - i);
      }

    return closest;
  }

  nlength(n) {
    let length = 0;
    while (n) {
      n >>= 1;
      length++;
    }
    return length;
  }

  mutate(n) {
    const m = this.arrayCopy(n);
    // 011 101 10
    // [3, 5, 2]
    const random1 = this.myRandom(1, n.length);
    const random = this.myRandom(1, this.nlength(n[random1]));
    m[random1] ^= (1 << random);
    return m;
  }

  cross(a, b) {
    // 011 101 10    011 101 10
    // [3, 5, 2]     [3, 5, 2]
    const aux = this.arrayCopy(a);
    const random = this.myRandom(1, a.length);
    aux[random] = b[b.length - random];
    return aux;
  }

  getStrongest(newVectors) {
    let strongest = -1;
    let mostCommon = 0;
    const helper = {};
    for (let i = 1; i < newVectors.length; i++)
      helper[newVectors[i]] = 0;
    for (let i = 1; i < newVectors.length; i++)
      if (++helper[newVectors[i]] > mostCommon) {
        mostCommon = helper[newVectors[i]];
        strongest = newVectors[i];
      }
    return [strongest, mostCommon];
  }

  calculateRound(vectors, restrictions) {
    const round = [];
    for (let i = 1; i < vectors.length; i++)
      round[i] = [];

    for (let i = 1; i < vectors.length; i++)
      for (let j = 1; j < vectors[i].length; j++)
        round[i][j] = vectors[i][j];

    let sum = 0;
    // Calculate Z
    for (let i = 1; i < vectors.length; i++) {
      let z = 0; // Result of replace the value for a restriction
      for (let j = 1; j < vectors[i].length; j++)
        z += restrictions[0][j] * vectors[i][j];
      round[i][round[i].length] = z;
      sum += z;
    }
    // Calculate %Z and Zacum
    let Zacum = 0;
    const acumColumn = [];  // Get %Z acum column
    for (let i = 1; i < vectors.length; i++) {
      let z = 0; // Result of replace the value for a restriction
      z = (round[i][round[i].length - 1] / sum) * 100;
      round[i][round[i].length] = z;
      Zacum += z;
      round[i][round[i].length] = Zacum;
      acumColumn[i] = Zacum;
    }
    // It always have to be 100 because is the max
    round[vectors.length - 1][round[vectors.length - 1].length - 1] = 100;
    acumColumn[acumColumn.length - 1] = 100;

    // Calculate #Random[0 1]
    for (let i = 1; i < vectors.length; i++) {
      let random = 0; // Result of replace the value for a restriction
      random = Math.floor(Math.random() * 11) * 10;
      round[i][round[i].length] = random;
    }
    for (let i = 1; i < vectors.length; i++)
      round[i][round[i].length] = this.findClosest(acumColumn, round[i][round[i].length - 1]);
    return round;
  }

  matrixCopy(matrix) {
    const copy = [];
    for (let i = 0; i < matrix.length; i++)
      copy[i] = this.arrayCopy(matrix[i]);
    return copy;
  }

  arrayCopy(array) {
    const copy = [];
    for (let i = 0; i < array.length; i++)
      copy[i] = array [i];
    return copy;
  }

  getColumn(matrix, index) {
    const col = [];
    for (let i = 1; i < matrix.length; i++)
      col[i] = matrix[i][index];
    return col;
  }

  bestZ(column, isMaximization) {
    let index = -1;
    let best = isMaximization ? -1 * this.INF : this.INF;

    for (let i = 1; i < column.length; i++)
      if (isMaximization) {
        if (column[i] > best) {
          best = column[i];
          index = i;
        }
      } else if (column[i] < best) {
        best = column[i];
        index = i;
      }
    return index;
  }

  execute(input: InputData) {
    this.displayMatrix = false;
    const limits = this.getLimits(input.restrictions);
    console.log(limits);

    const mj = [];
    // MJ is an array that contain the number of bits for each variable
    // We generate MJ with the precision of Bits that the user says
    for (let i = 1; i < limits.length; i++)
      mj[i] = Math.ceil(Math.log2((limits[i][1] - limits[i][0]) * Math.pow(10, input.precisionBits)));

    const varCount = input.restrictions[0].length - 2;
    const constants = [];
    for (let i = 1; i <= varCount; i++)
      constants[i] = this.calculateConst(limits[i][0], limits[i][1], mj[i]);
    let vectors = [];
    const randoms = [];
    for (let i = 1; i <= input.populationSize; i++) {
      const v = this.generateVector(input.restrictions, mj, limits, constants);
      if (v[0] === 1) {
        // We have to save valid vector
        vectors[i] = v[2];
        randoms[i] = v[1];
      } else {
        alert('Feasible vector not found in time');
        console.log('We don\'t have vectors that satisfy the conditions');
        return;
      }
    }
    // CALCULATE ROUNDS
    this.rounds = [];
    const zs = [];
    for (let i = 1; i <= input.iterationsCount; i++) {
      // console.log(vectors)
      this.rounds[i] = this.calculateRound(this.arrayCopy(vectors), this.matrixCopy(input.restrictions));
      const newVectors = [];
      console.log(this.rounds);

      const strongest = this.getStrongest(this.getColumn(this.rounds[i], this.rounds[i][1].length - 1));
      const z = this.bestZ(this.getColumn(this.rounds[i], this.rounds[i][1].length - 5), input.isMaximization);
      // console.log(z);
      zs[i] = this.rounds[i][z][this.rounds[i][z].length - 5]; // AUIIIIIIIIIIIIIIIII NO MOVI NADAAAAAAAAAAAAAAAA ATTT SERGIOOOOOOOOOOOOOO
      if (strongest[1] > 1) {
        newVectors[1] = this.arrayCopy(vectors[strongest[0]]);
        console.log('preveNewVector', newVectors);
        for (let j = 1; j < vectors.length; j++) {
          let counter = 0;
          while (true) {
            if (counter === this.TIME_LIMIT) {
              alert('Feasible vector not found in time');
              console.log('Vector not found for method 1');
              return;
            }
            const mutation = this.mutate(randoms[strongest[0]]);
            const crossed = this.cross(mutation, randoms[j]);
            newVectors[j] = this.genXjvector(limits, crossed, constants);
            if (this.verifyVector(input.restrictions, newVectors[j]))
              break;
            counter++;
          }
        }
      } else for (let j = 1; j < vectors.length; j++) {
        let counter = 0;
        while (true) {
          if (counter === this.TIME_LIMIT) {
            alert('Feasible vector not found in time');
            console.log('Vector not found for method 2');
            return;
          }
          newVectors[j] = this.genXjvector(limits, this.cross(randoms[strongest[0]], randoms[z]), constants);
          if (this.verifyVector(input.restrictions, newVectors[j]))
            break;
          counter++;
        }
      }
      // console.log('newVectors', newVectors);
      vectors = newVectors;
      // console.log("ROUND:" , i);
      // console.log("");
      // printRound(rounds[i]);
    }
    const best = this.bestZ(zs, input.isMaximization);

    console.log('ANSWER:', zs[best]);
    console.log('');
    this.display(varCount);
  }

  display(varcount: number) {
    const variables = [];
    for (let i = 0; i < varcount; i++)
      variables.push('X' + i);
    this.columnNames = [...variables, 'Z', '%Z', 'Cummulative %Z', 'Random[0, 1]', 'Vector'];
    this.displayMatrix = true;
  }

  range(from: number, to: number) {
    const arr = [];
    while (from < to)
      arr.push(from), from++;
    return arr;
  }

  myRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getIntOrFixed(n: number) {
    if (n === Math.floor(n))
      return n;
    else
      return n.toFixed(3);
  }
}
