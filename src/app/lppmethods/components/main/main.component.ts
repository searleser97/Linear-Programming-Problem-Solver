import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DualsimplexComponent} from '../dualsimplex/dualsimplex.component';
import {methodsUrl} from '../../../side-nav-bar/components/side-nav/side-nav.strings';
import {InputData} from '../input-data/InputData';
import {RandomComponent} from '../random/random.component';
import {GeneticComponent} from '../genetic/genetic.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  @ViewChild(DualsimplexComponent) dualSimplex;
  @ViewChild(RandomComponent) random;
  @ViewChild(GeneticComponent) genetic;

  @Input() method: string;
  methods: object = {};
  titles: object = {};
  methodsUrl = methodsUrl;
  requireExtra = [
    methodsUrl[0],
    methodsUrl[4]
  ];

  constructor() {
    this.titles[methodsUrl[0]] = 'Random Algorithm';
    this.titles[methodsUrl[1]] = 'Simplex 1.0';
    this.titles[methodsUrl[2]] = 'Simplex 2.0';
    this.titles[methodsUrl[3]] = 'Dual Simplex';
    this.titles[methodsUrl[4]] = 'Genetic Algorithm';
    this.titles[methodsUrl[5]] = 'Analitic Algorithm';
  }


  ngOnInit() {
    this.method = methodsUrl[3];
    this.methods[methodsUrl[0]] = this.random;
    this.methods[methodsUrl[3]] = this.dualSimplex;
    this.methods[methodsUrl[4]] = this.genetic;
  }

  execute(inputData: InputData) {
    if (this.methods[this.method] === undefined) {
      alert('Select a method');
      return;
    }
    this.methods[this.method].execute(inputData);
  }

  showExtraInputs() {
    return this.requireExtra.includes(this.method);
  }

  isInfo() {
    return !methodsUrl.includes(this.method);
  }
}
