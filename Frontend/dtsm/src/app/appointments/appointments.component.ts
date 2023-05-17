import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Transport } from '../models/model.transport';
import { RepositoryService } from 'src/services/repository.service';
import { KeycloakService } from "keycloak-angular";
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatTableExporterDirective } from 'mat-table-exporter';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {
  @ViewChild(MatTable) table!: MatTable<Transport>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTableExporterDirective) matTableExporter!: MatTableExporterDirective;
  dataSource: MatTableDataSource<Transport>;
  selection = new SelectionModel<Transport>(true, []);
  isMobile = false;
  displayedColumns = ['transportSchedule.idGate.id', 'transport.id', 'transport.deliveryDate', 'transportSchedule.arrivalTime', 'accept', 'decline'];
  email: string = "";
  driver!: number;

  constructor(private repository: RepositoryService, private keycloak: KeycloakService, private notification: SnackbarComponent) {
    this.dataSource = new MatTableDataSource<Transport>;
    setInterval(() => {
      this.refreshPage();
    }, 60000);
  }

  ngOnInit(): void {
    this.keycloak.loadUserProfile().then(data => {
      if (data.email != null) {
        this.email = data.email
        console.log(this.email)
        this.getAppointments();
      }
    })

  }
  /**
   * Retrived all appointments from the DB with location of the location manager
   */
  getAppointments() {
    this.repository.findManagerByEmail(this.email).subscribe(result => {
      this.repository.getAppointmentsFromLocation(result.idLocation.id).subscribe(result => {
        this.dataSource.data = result
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  /**
   * Filtering method but is still in development
   * @param event 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  /**
   * Format the delivery date so it will look better in the interface
   * @param dateString 
   * @returns 
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const formattedDate = date.toISOString().substring(0, 10);
    return formattedDate;
  }

  /**
   * Accept an appointment.The selected appointment is accept and after that the status of the transport is updated to 'In Transit'
   * @param row 
   */
  acceptAppointment(row: any) {
    var body = {
      "id": row.transportSchedule.id,
      "arrivalTime": row.transportSchedule.arrivalTime,
      "idTransport": row.transportSchedule.idTransport,
      "idGate": {
        "id": row.transportSchedule.idGate.id
      },
      "status": 1
    }
    var transport = {
      "id": row.transport.id,
      "deliveryDate": row.transport.deliveryDate,
      "shippingDate": row.transport.shippingDate,
      "status": 1,
      "idDriver": {
        "id": row.transport.idDriver.id
      },
      "idLocation": {
        "id": row.transport.idLocation.id
      }
    }

    this.repository.updateTransportSchedule(row.transportSchedule.id, body).subscribe(result => {
      this.repository.updateTransport(row.transport.id, transport).subscribe(res => {
        this.notification.openSnackBar("Transport accepted with success!");
        this.refreshPage();
      })
    }
    )
  }

  /**
   * Decline an appointment.The selected appointment is declined and after that is deleted from the DB
   * @param row 
   */
  declineAppointment(row: any) {
    this.repository.deleteTransport(row.transportSchedule.idTransport.id).subscribe(result => {
      this.notification.openSnackBar("Transport declined with success!");
      this.refreshPage();
    })
  }
  
  /**
   * Refresh the page every minute so the location manager will get all appointments of his location
   */
  refreshPage() {
    location.reload();
  }

  /**
   * Export the table to XLS file except the last two columns
   */
  exportData(){
    
   this.matTableExporter.exportTable('other',{
    fileName:`SCH_${new Date().toLocaleDateString()}`,
    Props:{
      Author:`Draexlmaier Transport Management System`
    }
   })
  }
}
