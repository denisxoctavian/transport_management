import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(private service: KeycloakService,private router:Router){}
  isAdmin: boolean = false;
  isManager: boolean = false;
  isDriver: boolean = false;
  roles: string[] = [];

  ngOnInit() {
    this.verifyRole();

  }

  verifyRole(){
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

    startApp(){
      if(this.isAdmin){
        this.router.navigateByUrl('/drivers')
      }
      if(this.isDriver){
        this.router.navigateByUrl('/home')
      }
      if(this.isManager){
        this.router.navigateByUrl('/appointments')
      }
    }
}

