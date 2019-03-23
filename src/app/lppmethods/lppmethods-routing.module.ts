import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DualsimplexComponent} from './components/dualsimplex/dualsimplex.component';

export const lppRoutes: Routes = [
  {path: 'dualsimplex', component: DualsimplexComponent}
];

@NgModule({
  imports: [RouterModule.forChild(lppRoutes)],
  exports: [RouterModule]
})
export class LppmethodsRoutingModule { }
