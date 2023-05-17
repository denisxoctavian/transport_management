import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Transport } from '../models/model.transport';
import { RepositoryService } from 'src/services/repository.service';
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: 'app-transports',
  templateUrl: './transports.component.html',
  styleUrls: ['./transports.component.scss']
})
export class TransportsComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Transport>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Transport>;
  selection = new SelectionModel<Transport>(true, []);
  isMobile = false;
  displayedColumns = ['transport.deliveryDate','transportSchedule.arrivalTime', 'transport.shippingDate', 'location.address', 'transport.status', 'transportSchedule.status'];
  email: string = "";
  driver!: number;

  constructor(private repository: RepositoryService, private keycloak: KeycloakService) {
    this.dataSource = new MatTableDataSource<Transport>;

  }

  ngOnInit(): void {
    this.keycloak.loadUserProfile().then(data => {
      if (data.email != null) {
        this.email = data.email
        console.log(this.email)
        this.allTransportsInformation()
      }
    })

  }
  /**
   * Retrieve all transport possible information from DB
   */
  allTransportsInformation() {
    this.repository.getDriverByEmail(this.email).subscribe(result => {
      this.repository.getTransportInformation(result.id).subscribe(result => {
        this.dataSource.data = result
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Format the date so it will look better in interface
   */
  formatDateDelivery(dateString: string): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const formattedDate = date.toISOString().substring(0, 10);
    return formattedDate;
  }

  /**
   * Format the date so it will look better in interface
   */
  formatDateShipping(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().substring(0, 10);
    return formattedDate;
  }


}
