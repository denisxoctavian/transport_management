import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './drivers/users.component';
import { ManagersComponent } from './managers/managers.component';
import { LocationsComponent } from './locations/locations.component';
import { TransportsComponent } from './transports/transports.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CheckInComponent } from './check-in/check-in.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './utility/app.guard';

const routes: Routes = [
  {
    component: HomeComponent,
    path: 'home',
    data: {
      roles: ['driver'],
    },
    canActivate: [AuthGuard]
  },
  {
    component: UsersComponent,
    path: 'drivers',
    data: {
      roles: ['admin'],
    },
    canActivate: [AuthGuard]
  },
  {
    component: ManagersComponent,
    path: 'managers',
    data: {
      roles: ['admin'],
    },
    canActivate: [AuthGuard]
  },
  {
    component: LocationsComponent,
    path: 'locations',
    data: {
      roles: ['location manager']

    },
    canActivate: [AuthGuard]
  },
  {
    component: TransportsComponent,
    path: 'transports',
    data: {
      roles: ['driver']

    },
    canActivate: [AuthGuard]
  },
  {
    component: AppointmentsComponent,
    path: 'appointments',
    data: {
      roles: ['location manager']

    },
    canActivate: [AuthGuard]
  },
  {
    component: CheckInComponent,
    path: 'checkin',
    data: {
      roles: ['location manager']

    },
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'welcome' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
