import {Component, OnInit} from '@angular/core';
import {Method} from '../../interfaces/method';
import {InputData} from '../input-data/InputData';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit, Method {

  displayMatrix = false;
  columnNames = [];
  INF = 1 << 30;

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

  execute(data: InputData) {
    const limits = this.getLimits(data.restrictions);
    limits.shift();
    const mat = this.metodoAleatorio(data.restrictions, data.iterationsCount, data.populationSize, limits, 0);
    console.log(mat);
    this.displayMatrix = true;
  }

  arrayValores(restricciones, ef) {
    const valores = [];
    for (let i = 0; i < restricciones.length; i++)
      valores[i] = this.numAleatorio(restricciones[i][0], restricciones[i][1], ef);
    return valores;
  }

  numAleatorio(min, max, ef) {

    const random = Math.random() * (max - min) + min;
    return (ef === 0) ? Math.floor(random) : random;
  }

  minimo(mat) {
    return mat[0];
  }

  maximo(mat) {
    return mat[mat.length - 1];
  }

  cumpleCondiciones(mat, valores) {
    let resultado = 1;
    for (let i = 1; i < mat.length; i++) {
      resultado *= this.cumpleCondicion(mat[i], valores);
    }
    return resultado;
  }

  cumpleCondicion(condicion, valores) {
    let res = 0;
    const restriccion = condicion[condicion.length - 1];
    const valor = condicion[0];

    for (let i = 1; i < condicion.length - 1; i++) {
      res += condicion[i] * valores[i - 1];
    }
    switch (restriccion) {
      case -1:
        return (res <= valor) ? 1 : 0;
      case 1:
        return (res >= valor) ? 1 : 0;
      case 0:
        return (res === valor) ? 0 : 0;
      default:
        return 0;
    }
  }

  poblacion(matriz, nPoblacion, rango, ef) {
    const arrayPoblacion = [];
    for (let i = 0; i < nPoblacion; i++) {
      const valores = this.arrayValores(rango, ef);
      if (this.cumpleCondiciones(matriz, valores) === 1) {
        arrayPoblacion.push(this.getZ(matriz[0], valores));
      }
    }
    if (arrayPoblacion.length !== 0 || arrayPoblacion === undefined)
      return arrayPoblacion.sort((a, b) => {
        return a[0] - b[0];
      });
    else
      return 'E';
  }

  getZ(z, valores) {
    const zRes = [];
    let res = 0;
    for (let i = 1; i < z.length - 1; i++) {
      res += z[i] * valores[i - 1];
      zRes[i] = valores[i - 1];
    }
    zRes[0] = res;
    zRes[z.length - 1] = 0;
    return zRes;
  }

  metodoAleatorio(matriz, nMuestra, nPoblacion, rango, ef) {
    console.log(matriz, nMuestra, nPoblacion, rango, ef);
    let muestraMin = [];
    let muestraMax = [];
    const muestra = [];
    const metodoAl = [];
    let conf;
    for (let i = 0; i < nMuestra; i++) {
      conf = this.poblacion(matriz, nPoblacion, rango, ef);
      if (conf !== 'E')
        muestra.push(conf);
    }
    for (let i = 0; i < muestra.length; i++) {
      muestraMin[i] = this.minimo(muestra[i]);
      muestraMax[i] = this.maximo(muestra[i]);
    }
    console.log('muestra', muestra);
    muestraMin.sort((a, b) => {
      return a[0] - b[0];
    });
    muestraMax.sort((a, b) => {
      return a[0] - b[0];
    });
    muestraMin = this.minimo(muestraMin);
    muestraMax = this.maximo(muestraMax);

    metodoAl[0] = muestraMin;
    metodoAl[1] = muestraMax;

    for (const unamuestra of muestra)
      metodoAl.push(unamuestra);
    console.log(metodoAl);
    return metodoAl;
  }
}
