import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { LandingComponent } from '../landing/landing.component';
import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { LoginPageComponent } from '../login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [{ path: '', component: LandingComponent }],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
