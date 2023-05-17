import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RepositoryService } from 'src/services/repository.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Location } from '../models/model.location';


@Component({
  selector: 'app-row-dialog',
  templateUrl: './row-dialog.component.html',
  styleUrls: ['./row-dialog.component.scss']
})
export class RowDialogComponent implements OnInit {

  title: string = "";
  bttAction: string = "Save";
  addOperation: boolean = false;
  selectedLocation: any;
  locations: Location[] = []
  userForm !: FormGroup;


  constructor(private repository: RepositoryService, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RowDialogComponent>,
    private notification: SnackbarComponent) { }


  ngOnInit(): void {
    this.loadDetails();
  }

  /**
   * Load all details from the table to the dialog (eg. name, first name , email etc.)
   */
  loadDetails() {
    this.title = this.data.title
    this.userForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.pattern(/^[^\d\s]*$/)]],
      firstName: ['', [Validators.required, Validators.pattern(/^[^\d\s]*$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^07\d{8}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/i)]],
      location: [''],
      id: ['']
    })
    this.getLocation();
    console.log(this.locations)
    this.userForm.controls['id'].setValue(this.data.row.id);
    this.userForm.controls['lastName'].setValue(this.data.row.lastName);
    this.userForm.controls['firstName'].setValue(this.data.row.firstName);
    this.userForm.controls['phoneNumber'].setValue(this.data.row.phoneNumber);
    this.userForm.controls['email'].setValue(this.data.row.email);
    if (this.title == "DRIVER") {
      this.userForm.controls['location'].setValue("");
    } else {
      this.userForm.controls['location'].setValue(this.data.row.location);
    }

    if (this.data.row == "addOperation") {
      this.bttAction = "Add"
      this.addOperation = true;
    } else {
      this.bttAction = "Save"
    }
  }

  /**
   * Retrieve all locations from DB
   */
  getLocation() {
    this.repository.getAllLocations().subscribe(
      (result: any) => {
        this.locations = result;
      },
      (error: any) => {
        this.notification.openSnackBarErr("Error! Check console for more information");
      })
  }
  /**
   * Add manager to DB also add it in Keycloak server
   */
  addManager() {
    const password = 'manager' + Math.floor(1000 * Math.random());
    const body = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      phoneNumber: this.userForm.value.phoneNumber,
      idLocation: this.selectedLocation
    }

    this.repository.addManager(body).subscribe({
      next: () => {
        delete body.idLocation;
        delete body.phoneNumber;
        const keyCloakBody = {
          ...body,
          ...{
            username: (body.firstName + body.lastName).toLowerCase(),
            groups: ['manager'],
            enabled: true,
            credentials: [
              {
                type: 'password',
                value: password,
                temporary: false,
              },
            ],
          },
        };
        this.repository.addUserKeyCloak(keyCloakBody).subscribe({
          next: () => {
             this.sendEmail(
               keyCloakBody.email,
               keyCloakBody.username,
              password,
                keyCloakBody.firstName
              );
            this.dialogRef.close();
            this.notification.openSnackBar("Account created with success");
            location.reload()
          },
          error: (err) => {
            this.notification.openSnackBarErr("Error! Check console for more information");
          },
        });
      },
      error: (err) => {
        this.notification.openSnackBarErr("Error! Check console for more information");
      },
    });
  }

  /**
   * Update manager in DB also update it in keycloak server
   */
  updateManager() {
    const managerId = this.data.row.id;
    const managerEmail = this.data.row.email;
    const body = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      phoneNumber: this.userForm.value.phoneNumber,
      idLocation: this.data.row.location
    }

    const keycloakBody = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email
    };

    this.repository.updateDriver(managerId, body).subscribe({
      next: () => {
        this.repository.getKeyCloakUserByEmail(managerEmail).subscribe((keycloakUser: any) => {
          const keycloakUserId = keycloakUser[0].id;
          this.repository.updateUserKeyCloak(keycloakUserId, keycloakBody).subscribe({
            next: () => {
              this.dialogRef.close();
              location.reload();
              this.notification.openSnackBar("Account updated with success");
            },
            error: (err) => {
              this.notification.openSnackBarErr("Error! Check console for more information");
            }
          });
        });
      },
      error: (err) => {
        this.notification.openSnackBarErr("Error! Check console for more information");
      }
    });
  }

  /**
   * Delete manager from DB also delete it from keycloak server
   */
  deleteManager() {
    this.repository.getKeyCloakUserByEmail(this.data.row.email).subscribe(
      (result: any) => {
        this.repository.deleteKeyCloakUserById(result[0].id).subscribe({
          next: () => {
            this.repository.deleteManager(this.data.row.id).subscribe({
              next: () => {
                this.dialogRef.close();
                this.notification.openSnackBar("Account deleted with success");
                location.reload()
              }
            })
          },
          error: (err) => {
            this.notification.openSnackBarErr("Error! Check console for more information");
          },
        })
      }
    )
  }

  /**
   * Add driver to DB also add it to keycloak server
   */
  addDriver() {
    const body = this.userForm.value;
    delete body.id;
    const password = 'driver' + Math.floor(1000 * Math.random());

    if (this.title == "DRIVER") {
      delete body.location;
    }
    this.repository.addDriver(body).subscribe({
      next: () => {
      },
      error: (err) => {
        this.notification.openSnackBarErr("Error! Check console for more information");
      },
    });

    delete body.phoneNumber;
    const keyCloakBody = {
      ...body,
      ...{
        username: (body.firstName + body.lastName).toLowerCase(),
        groups: ['driver'],
        enabled: true,
        credentials: [
          {
            type: 'password',
            value: password,
            temporary: false,
          },
        ],
      },
    };

    this.repository.addUserKeyCloak(keyCloakBody).subscribe({
      next: () => {
        this.sendEmail(
          keyCloakBody.email,
          keyCloakBody.username,
          password,
          keyCloakBody.firstName
        );
        this.dialogRef.close();
        this.notification.openSnackBar("Account created with success");
        location.reload()
      },
      error: (err) => {
        this.notification.openSnackBarErr("Error! Check console for more information");
      },
    });

  }
  /**
   * Update driver in DB also update it in keycloak server
   */
  updateDriver() {
    const body = this.userForm.value;
    const driverId = this.data.row.id;
    const driverEmail = this.data.row.email;
    const keycloakBody = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email
    };
    this.repository.updateDriver(driverId, body).subscribe({
      next: () => {
        this.repository.getKeyCloakUserByEmail(driverEmail).subscribe((keycloakUser: any) => {
          const keycloakUserId = keycloakUser[0].id;
          this.repository.updateUserKeyCloak(keycloakUserId, keycloakBody).subscribe({
            next: () => {
              this.dialogRef.close();
              location.reload();
              this.notification.openSnackBar("Account updated with success");
            },
            error: (err) => {
              this.notification.openSnackBarErr("Error! Check console for more information");
            }
          });
        });
      },
      error: (err) => {
        this.notification.openSnackBarErr("Error! Check console for more information");
      }
    });
  }

  /**
   * Delete the driver from DB also delete it from keycloak server
   */
  deleteDriver() {
    this.repository.getKeyCloakUserByEmail(this.data.row.email).subscribe(
      (result: any) => {
        this.repository.deleteKeyCloakUserById(result[0].id).subscribe({
          next: () => {
            this.repository.deleteDriver(this.data.row.id).subscribe({
              next: () => {
                this.dialogRef.close();
                this.notification.openSnackBar("Account deleted with success");
                location.reload()
              }
            })
          },
          error: (err) => {
            this.notification.openSnackBarErr("Error! Check console for more information");
          },
        })
      }
    )
  }

  /**
   *  Send email to the created user with the above parameters from template
   * @param email -email of the user
   * @param username -username which is a combination of last_name+first_name
   * @param password -password, randomly generated(not the best idea !!!)
   * @param name - name of the user
   */
  sendEmail(email: string, username: string, password: string, name: string) {
    var data = {
      service_id: 'service_dtsm',
      template_id: 'template_ysuhjf4',
      user_id: 'g_NYmICMkmqUcI0cK',
      template_params: {
        'name': name,
        'to_email': email,
        'username': username,
        'password': password,
      }
    };
    this.repository.sendEmail(data).subscribe({})
  }
  
  /**
   * Check if all required fields are filled
   * @returns 
   */
  isErrorShowing() {
    return this.userForm.controls['lastName'].invalid
      || this.userForm.controls['firstName'].invalid
      || this.userForm.controls['phoneNumber'].invalid
      || this.userForm.controls['email'].invalid;
  }

  /**
   * Close the dialog
   */
  close() {
    this.dialogRef.close();
  }

}
