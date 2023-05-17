import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SideNavService } from './sidenav/sidenav.service';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersComponent } from './drivers/users.component';
import { KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './utility/app.init';
import { KeycloakAngularModule } from 'keycloak-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RepositoryService } from 'src/services/repository.service';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RowDialogComponent } from './row-dialog/row-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { ManagersComponent } from './managers/managers.component';
import { LocationsComponent } from './locations/locations.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { TransportsComponent } from './transports/transports.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CheckInComponent } from './check-in/check-in.component';
import { jsPDF } from 'jspdf';
import { WelcomeComponent } from './welcome/welcome.component';


moment.locale('en', {
  week: {
    dow: 1, // Monday is the first day of the week
  },
});


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    SidenavComponent,
    UsersComponent,
    ProfileComponent,
    RowDialogComponent,
    SnackbarComponent,
    ManagersComponent,
    LocationsComponent,
    TransportsComponent,
    HelpDialogComponent,
    AppointmentsComponent,
    CheckInComponent,
    WelcomeComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    FlexLayoutModule,
    KeycloakAngularModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatMomentDateModule,
    PdfViewerModule,
    MatTableExporterModule
  ],
  providers: [SideNavService, SnackbarComponent, KeycloakService, RepositoryService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, HttpClient]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
