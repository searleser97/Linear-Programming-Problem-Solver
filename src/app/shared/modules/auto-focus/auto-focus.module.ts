import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutofocusDirective} from './directives/autofocus.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AutofocusDirective
  ],
  exports: [
    AutofocusDirective
  ]
})
export class AutoFocusModule { }
