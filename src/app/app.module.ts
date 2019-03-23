import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SideNavBarModule} from './side-nav-bar/side-nav-bar.module';
import {LppmethodsModule} from './lppmethods/lppmethods.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SideNavBarModule,
    LppmethodsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
