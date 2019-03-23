import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavBarRoutingModule } from './side-nav-bar-routing.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {MaterialModule} from '../shared/modules/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    SideNavBarRoutingModule,
    MaterialModule
  ],
  declarations: [SideNavComponent]
})
export class SideNavBarModule { }
