import { Component, OnInit } from '@angular/core';
import { KeycloakService } from "keycloak-angular";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: string = "default";
  roles: string[] = [];
  role: string = "default";
  email: string = "default";

  constructor(private service: KeycloakService) { }

  ngOnInit(): void {
    this.initializeUserDetails();
    this.service.getToken().then((token) => {
      console.log(token)
    })
  }
  
  /**
   * Get all wanted details from the keycloak server
   */
  private initializeUserDetails(): void {
    this.user = this.service.getUsername();
    this.roles = this.service.getUserRoles()
    this.roles.forEach(role => {
      if (role == "admin" || role == "driver" || role == "location manager") {
        this.role = role;
      }
    });
    this.service.loadUserProfile().then(data => {
      if (data.email != null) {
        this.email = data.email
      }

    })
  }
  /**
   * Logout the current user
   */
  logout() {
    this.service.logout();
  }

  /**
   * Close the dialog
   */
  public close() {
    this.close();
  }

}
