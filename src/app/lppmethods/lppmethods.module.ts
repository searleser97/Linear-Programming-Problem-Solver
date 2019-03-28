import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LppmethodsRoutingModule } from './lppmethods-routing.module';
import { DualsimplexComponent } from './components/dualsimplex/dualsimplex.component';
import {MaterialModule} from '../shared/modules/material/material.module';
import { InputDataComponent } from './components/input-data/input-data.component';
import {FormsModule} from '@angular/forms';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [DualsimplexComponent, InputDataComponent, MainComponent],
  imports: [
    CommonModule,
    LppmethodsRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports: [MainComponent]
})
export class LppmethodsModule { }
