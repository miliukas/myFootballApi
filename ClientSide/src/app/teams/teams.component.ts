import { Component, OnInit} from '@angular/core';
import { TeamsService } from '../shared/teams.service';
import { Team } from '../shared/team.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TeamComponent } from './team/team.component';
import { AuthGuard } from '../auth/auth.guard';
import { ToastrService } from 'ngx-toastr';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { TeamDetailsComponent } from './team-details/team-details.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styles: []
})
export class TeamsComponent implements OnInit {

  teamsList : Team[] = [];

  constructor(private service : TeamsService, private dialog : MatDialog, private authService: AuthGuard,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.refreshTeamList();
  }

  refreshTeamList()
  {
    this.service.getTeamsList().then(
      res => this.teamsList = res as Team[]
    );
  }

  AddTeam(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "80%";
    dialogConfig.data = {};
    this.dialog.open(TeamComponent, dialogConfig).afterClosed().subscribe(res => {
      this.refreshTeamList();
    });
  }

  EditTeam(team){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "80%";
    dialogConfig.data = {team};
    this.dialog.open(TeamEditComponent, dialogConfig).afterClosed().subscribe(res => {
      this.refreshTeamList();
    });
  }

  DetailsTeam(team)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    //dialogConfig.height = "100%";
    dialogConfig.data = {team};
    this.dialog.open(TeamDetailsComponent, dialogConfig);
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

  onTeamDelete(id:number){
    if(confirm("Are you sure to delete this record?")){
      this.service.deleteTeam(id).then(res =>{
        this.refreshTeamList();
        this.toastr.warning("Deleted successfully.", "MyFootballApi");
      });
    }
  }
}
