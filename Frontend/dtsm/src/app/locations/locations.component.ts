import { SelectionModel } from '@angular/cdk/collections';
import { Component, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Location } from '../models/model.location';
import { RepositoryService } from 'src/services/repository.service';
import { MatDialog } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarComponent } from '../snackbar/snackbar.component';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {
  locations: Location[] = [];;
  locationForm !: FormGroup;

  constructor(private repository: RepositoryService,
    private renderer: Renderer2, private dialog: MatDialog,
    private keycloak: KeycloakService, private formBuilder: FormBuilder,
    private notification: SnackbarComponent) {

  }

  ngOnInit(): void {
    this.getAllLocations()
    this.locationForm = this.formBuilder.group({
      location: ['', [Validators.required]],
      gate: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  /**
   * Retrieve all locations from DB
   */
  getAllLocations() {
    this.repository.getAllLocations().subscribe((result: any) => {
      this.locations = result;
    });

  }
  /**
   * Add gate in DB if is not already existing
   */
  addGate() {
    const body = {
      id: this.locationForm.value.gate,
      idLocation: this.locationForm.value.location
    }

    this.repository.findGate(body.id).subscribe((result: any) => {
      if (result != null) {
        this.notification.openSnackBarErr("Gate id already exists in database! Please choose another id!");
      } else {
        this.repository.addGate(body).subscribe({
          next: () => {
            location.reload();
            this.notification.openSnackBar("Gate added succesfully");
          },
          error: (err) => {
            this.notification.openSnackBarErr("Error! Check console for more information");
          }
        })
      }
    })
  }
  
  /**
   * Delete gate from DB if it's existing
   */
  deleteGate() {
    this.repository.findGate(this.locationForm.value.gate).subscribe((result: any) => {
      if (result == null) {
        this.notification.openSnackBarErr("Gate does not exists in database");
      } else {
        this.repository.deleteGate(this.locationForm.value.gate).subscribe({
          next: () => {
            location.reload();
            this.notification.openSnackBar("Gate deleted succesfully");
          },
          error: (err) => {
            this.notification.openSnackBarErr("Error! Check console for more information");
          }
        })
      }
    })
  }
  /**
   * Check if all required fields are filled
   * @returns 
   */
  isErrorShowing() {
    return this.locationForm.controls['location'].invalid
      || this.locationForm.controls['gate'].invalid
  }


}
