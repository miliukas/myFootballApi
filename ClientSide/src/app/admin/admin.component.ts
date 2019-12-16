import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { AdminService } from '../shared/admin.service';
import { AuthGuard } from '../auth/auth.guard';
import { Team } from '../shared/team.model';
import { TeamsService } from '../shared/teams.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {

  userList : User[] = [];
  teamList : Team[] = [];
  constructor(private service : AdminService, private authService: AuthGuard,
    private teamsService: TeamsService, private dialog : MatDialog, private toastr : ToastrService) { }

  ngOnInit() {
    this.refreshUserList();
    this.teamsService.getTeamsList().then(res => this.teamList = res as Team[]);
  }

  refreshUserList()
  {
    this.service.getUserList().then(res => this.userList = res as User[]);
  }

  addUser(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "80%";
    dialogConfig.data = {};
    this.dialog.open(UserCreateComponent, dialogConfig).afterClosed().subscribe(res => {
      this.refreshUserList();
    });
  }

  DetailsUser(id : number, teamName : string)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    //dialogConfig.height = "100%";
    dialogConfig.data = {id, teamName};
    this.dialog.open(UserDetailsComponent, dialogConfig);
  }
  
  EditUser(user){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "80%";
    dialogConfig.data = {user};
    this.dialog.open(UserEditComponent, dialogConfig).afterClosed().subscribe(res => {
      this.refreshUserList();
    });
  }

  onUserDelete(id:number){
    if(confirm("Are you sure to delete this record?")){
      this.service.deleteUser(id).then(res =>{
        this.refreshUserList();
        this.toastr.warning("Deleted successfully.", "MyFootballApi");
      });
    }
  }

  getTeamNameById(id : number)
  {
    for(let team of this.teamList)
    {
      if (team.id == id)
          return team.name;
      
    }
    return "None";
  }

}
