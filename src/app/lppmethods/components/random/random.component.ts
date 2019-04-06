import { Component, OnInit } from '@angular/core';
import {Method} from '../../interfaces/method';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit, Method {

  hide = true;
  numberOfIterations: number;
  populationSize: number;

  constructor() {
  }

  ngOnInit() {
  }

  execute() {
    this.hide = true;
  }

  run() {

  }

}
