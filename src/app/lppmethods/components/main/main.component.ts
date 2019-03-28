import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DualsimplexComponent} from '../dualsimplex/dualsimplex.component';
import {methodsUrl} from '../../../side-nav-bar/components/side-nav/side-nav.strings';
import {InputData} from '../input-data/InputData';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})

export class MainComponent implements OnInit {

  @ViewChild(DualsimplexComponent) dualSimplex;

  @Input() method: string;
  methods: object = {};
  titles: object = {};
  methodsUrl = methodsUrl;

  constructor() {
    this.titles[methodsUrl[0]] = 'Random Algorithm';
    this.titles[methodsUrl[1]] = 'Simplex 1.0';
    this.titles[methodsUrl[2]] = 'Simplex 2.0';
    this.titles[methodsUrl[3]] = 'Dual Simplex';
    this.titles[methodsUrl[4]] = 'Genetic Algorithm';
  }


  ngOnInit() {
    this.methods[methodsUrl[3]] = this.dualSimplex;
  }

  execute(inputData: InputData) {
    console.log(this.methods);
    this.methods[this.method].execute(inputData);
  }

}
