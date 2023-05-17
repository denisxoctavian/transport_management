import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Users } from '../models/model.users';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { RepositoryService } from 'src/services/repository.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { RowDialogComponent } from 'src/app/row-dialog/row-dialog.component';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Users>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Users>;
  selection = new SelectionModel<Users>(true, []);
  isMobile = false;
  title: string = "";
  operationType: string = "";

  displayedColumns = ['select', 'firstName', 'lastName', 'phoneNumber', 'email'];

  constructor(private repository: RepositoryService,
    private renderer: Renderer2, private dialog: MatDialog,
    private keycloak: KeycloakService) {
    this.dataSource = new MatTableDataSource<Users>;
  }

  ngOnInit(): void {
    this.allDrivers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Retrieve all drivers from DB
   */
  allDrivers() {
    this.repository.getAllDrivers().subscribe((result: any) => {
      this.dataSource.data = result
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Open a dialog with delete/update options
   * @param row 
   */
  openSelection(row: any) {
    this.verifyToken();
    this.dialog.open(RowDialogComponent, {
      width: '500px',
      height: "617px",
      data: { row, title: "DRIVER" },
    }).afterClosed().subscribe(val => {

    })
  }
  
  /**
   * Verify if keycloak token is still available if not refresh it
   */
  verifyToken() {
    this.keycloak.keycloakEvents$.subscribe({
      next: (e) => {
        if (e.type == KeycloakEventType.OnTokenExpired) {
          this.keycloak.updateToken(20);
          console.log("Token updated")
        }
      }
    });

  }
}
