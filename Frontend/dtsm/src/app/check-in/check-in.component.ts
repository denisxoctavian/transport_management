import { SelectionModel } from '@angular/cdk/collections';
import { Component, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Transport } from '../models/model.transport';
import { RepositoryService } from 'src/services/repository.service';
import { MatDialog } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent {
  transports: Transport[] = [];;
  locationForm !: FormGroup;
  email: string = "";
  constructor(private repository: RepositoryService,
    private renderer: Renderer2, private dialog: MatDialog,
    private keycloak: KeycloakService, private formBuilder: FormBuilder,
    private notification: SnackbarComponent) {

  }

  ngOnInit(): void {
    this.keycloak.loadUserProfile().then(data => {
      if (data.email != null) {
        this.email = data.email
        this.getTransportFromLocation();
      }
    })

    this.locationForm = this.formBuilder.group({
      transport: ['', [Validators.required]],
    });
  }

  /**
   * Retrieve all the transport from DB with location of the location manager
   */
  getTransportFromLocation() {
    this.repository.findManagerByEmail(this.email).subscribe(result => {
      this.repository.getTransportFromLocation(result.idLocation.id).subscribe(result => {
        this.transports = result;
      })
    })
  }

  /**
   * Update tranport status to 'Done' when transport has arrived to destination
   */
  completeTransport() {
    console.log(this.locationForm.value.transport)
    var transport = {
      "id": this.locationForm.value.transport.id,
      "deliveryDate": this.locationForm.value.transport.deliveryDate,
      "shippingDate": this.locationForm.value.transport.shippingDate,
      "status": 2,
      "idDriver": {
        "id": this.locationForm.value.transport.idDriver.id
      },
      "idLocation": {
        "id": this.locationForm.value.transport.idLocation.id
      }
    }
    this.repository.updateTransport(this.locationForm.value.transport.id, transport).subscribe(result => {
      this.notification.openSnackBar("Transport completed with success!");
      location.reload();
    })
  }

  /**
   * Show error until user select a transport
   * @returns 
   */
  isErrorShowing() {
    return this.locationForm.controls['transport'].invalid
  }

}
