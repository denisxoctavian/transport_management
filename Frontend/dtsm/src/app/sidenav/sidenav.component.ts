import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from './sidenav.service';
import { KeycloakService } from 'keycloak-angular';
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') public sidenav!: MatSidenav;
  isAdmin: boolean = false;
  isManager: boolean = false;
  isDriver: boolean = false;
  right:TooltipPosition='right'
  roles: string[] = [];


  constructor(private sideNavService: SideNavService, private service: KeycloakService) {

  }

  ngOnInit() {
    this.verifyRole();
    this.sideNavService.sideNavToggleSubject.subscribe(() => {
      this.sidenav.toggle();
    });

  }

  close() {
    this.sidenav.toggle();
  }
  /**
   * Get the role from keycloak server and check it
   */
  verifyRole() {
    this.roles = this.service.getUserRoles();
    this.roles.forEach(role => {
      if (role == 'admin') {
        this.isAdmin = true;
      }
      if (role == 'location manager') {
        this.isManager = true;
      }
      if (role == 'driver') {
        this.isDriver = true;
      }
    });
  }
}