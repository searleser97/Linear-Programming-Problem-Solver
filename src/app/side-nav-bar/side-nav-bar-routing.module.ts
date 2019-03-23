import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {lppRoutes} from '../lppmethods/lppmethods-routing.module';

const childrenRoutes = [
  ...lppRoutes
];

const routes: Routes = [
  {path: '', component: SideNavComponent, children: childrenRoutes}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideNavBarRoutingModule {
}
