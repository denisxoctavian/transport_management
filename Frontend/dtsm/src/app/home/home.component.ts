import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { RepositoryService } from 'src/services/repository.service';
import { map } from 'rxjs/operators';
import { Location } from '../models/model.location';
import { Gate } from '../models/model.gate';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MY_CUSTOM_LOCALE } from '../models/model.date';
import { Time } from '@angular/common';
import { KeycloakService } from "keycloak-angular";
import { formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { printPdf } from '../utility/printing.pdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true }
    }
  ],
  styleUrls: ['./home.component.scss']

})

export class HomeComponent implements OnInit {
  @ViewChild(MatStepper) stepper!: MatStepper;
  allHours: string[] = [
    "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00"];
  availableHours!: string[];
  selected!: Date
  firstFormGroup = this._formBuilder.group({
    selectedLocation: ['', Validators.required],
    selectedGate: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  locations: Location[] = [];
  selectedGate!: Gate;
  selectedDate!: any;
  selectedLocation!: string;
  selectedHour!: string;
  idTransport!: string;
  transport: any;
  idDriver!: string;
  email: string = "";
  gates: Gate[] = [];
  shippingDate = new Date()
  status: string = "0";
  minDate = new Date();
  maxDate = new Date(2023, 11, 31);
  noLocationSelected: boolean = true;

  constructor(private router: Router, private repository: RepositoryService, private notification: SnackbarComponent, private _formBuilder: FormBuilder,
    private keycloak: KeycloakService, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }


  ngOnInit(): void {
    this.getAllLocations();
    this.keycloak.loadUserProfile().then(data => {
      if (data.email != null) {
        this.email = data.email
      }
    })
  }
  /**
   * Create a transport and insert it in DB after user selects a location
   */
  createTransport() {
    const selectedLocationId = this.firstFormGroup.controls['selectedLocation'].value;
    this.repository.getDriverByEmail(this.email).subscribe(result => {
      this.idDriver = result.id;
      var body = {
        "idDriver": {
          "id": result.id
        },
        "idLocation": selectedLocationId,
        "status": this.status,
        "shippingDate": this.shippingDate,
        "deliveryDate": null
      }

      this.repository.addTransport(body).subscribe(result => {
        this.idTransport = result.id;
        this.transport = result;
      })
    })


  }
  /**
   * Retrieve gates of the specified locations
   * @param id 
   */
  getGatesOfLocation(id: string) {
    this.noLocationSelected = false;
    this.selectedLocation = id;
    this.repository.getGatesOfLocation(parseInt(id)).subscribe(result => {
      this.gates = result;
    })
  }

  /**
   * Retrived all locations from database
   */
  getAllLocations() {
    this.repository.getAllLocations().subscribe(result => {
      this.locations = result;
    })
  }
  /**
   * When user selects a date check if it has available hours from appointment
   */
  onDateSelection() {
    this.selectedDate = formatDate(this.selected, 'yyyy-MM-dd', 'en-US');
    console.log(this.selectedDate);
    this.repository.getNotAvailableHours(this.selectedLocation, this.selectedDate).subscribe(notAvailableHours => {
      this.availableHours = this.allHours.filter(hour => !notAvailableHours.includes(hour));
      console.log(notAvailableHours);
    })
  }

  /**
   * After user selects the date and press complete update the transport delivery date and status 
   */
  updateTransport() {
    const selectedLocationId = this.firstFormGroup.controls['selectedLocation'].value;
    const selectedGateId = this.firstFormGroup.controls['selectedGate'].value;
    const deliveryDate = new Date(this.selectedDate);
    deliveryDate.setHours(0, 0, 0, 0);
    var body = {
      "id": this.transport.id,
      "idDriver": {
        "id": this.idDriver
      },
      "idLocation": selectedLocationId,
      "status": this.status,
      "shippingDate": this.shippingDate,
      "deliveryDate": deliveryDate.toISOString().slice(0, 19)
    }
    this.repository.updateTransport(this.transport.id, body).subscribe({
      next: () => {

      },
      error: () => {
        this.notification.openSnackBarErr("Error! Check console for more information");
      }
    })
  }

  /**
   * Add an appointment in DB
   */
  addTransportSchedule() {
    const selectedGateId = this.firstFormGroup.controls['selectedGate'].value;
    var body2 = {
      "arrivalTime": this.selectedHour,
      "idGate": selectedGateId,
      "idTransport": this.transport,
      "status": "0"
    }
    this.repository.addTransportSchedule(body2).subscribe({
      next: () => {
        this.notification.openSnackBar("Appointment made with success");
      },
      error: (err) => {
        this.notification.openSnackBarErr("Error! Check console for more information");
      },
    })
  }

  /**
   * The functions from above combined in one
   */
  makeAppoiment() {
    this.addTransportSchedule();
    this.updateTransport()
    this.stepper.next();
  }

  /**
   * Print the appointment to PDF and navigate the user to his tranports menu
   */
  printAndGo() {
    printPdf(this.idTransport,this.selectedHour,this.selectedDate,this.selectedLocation)
    this.router.navigateByUrl('/transports')
    window.close();
  }

  /**
   * Check if all required fields are filled
   * @returns 
   */
  isErrorShowing() {
    return this.firstFormGroup.controls['selectedLocation'].invalid
      || this.firstFormGroup.controls['selectedGate'].invalid
  }

  /**
   * Select available hour from the wanted delivery date
   * @param hour 
   */
  selectHour(hour: string) {
    this.selectedHour = hour;
  }
}
