import { Component, OnInit } from '@angular/core';
import {Method} from '../../interfaces/method';
import {InputData} from '../input-data/InputData';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit, Method {

  constructor() {
  }

  ngOnInit() {
  }

  execute(data: InputData) {
  }

  run() {

  }

}
