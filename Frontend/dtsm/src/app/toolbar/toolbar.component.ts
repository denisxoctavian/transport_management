import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SideNavService } from '../sidenav/sidenav.service';
import { ProfileComponent } from '../profile/profile.component';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import {TooltipPosition} from '@angular/material/tooltip';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  title: string = "Dashboard";
  below:TooltipPosition='below'

  constructor(private sideNavService: SideNavService, public matDialog: MatDialog) { }
  openDialog() {
    this.matDialog.open(ProfileComponent);
  }
  clickMenu() {
    this.sideNavService.toggle();
  }

  openDialogHelp() {
    this.matDialog.open(HelpDialogComponent)
  }
}
