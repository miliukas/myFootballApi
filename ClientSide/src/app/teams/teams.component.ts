import { Component, OnInit } from '@angular/core';
import { TeamService } from '../shared/team.service';
import { Team } from '../shared/team.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TeamComponent } from './team/team.component';
import { AuthGuard } from '../auth/auth.guard';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styles: []
})
export class TeamsComponent implements OnInit {

  teamsList : Team[] = [];

  constructor(private service : TeamService, private dialog : MatDialog, private authService: AuthGuard) { }

  ngOnInit() {
    this.authService.checkIsAdmin();
    this.service.getTeamsList().then(
      res => this.teamsList = res as Team[]
    );
  }

  AddOrEditTeam(teamId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "80%";
    dialogConfig.data = {teamId};
    this.dialog.open(TeamComponent, dialogConfig);
  }

  //nedaudojamas
  operate()
  {
    console.log("aasf");
    this.teamsList.forEach(element => {
      var substring = element.founded.split('T')[0];
      var str = JSON.stringify(substring);
      console.log(str);
      element.founded = substring;
    });
  }

}
