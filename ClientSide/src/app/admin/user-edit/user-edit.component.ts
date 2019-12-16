import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { AdminComponent } from '../admin.component';
import { User } from 'src/app/shared/user.model';
import { Team } from 'src/app/shared/team.model';
import { TeamsService } from 'src/app/shared/teams.service';
import { AdminService } from 'src/app/shared/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit {

  formData : User;
  teamList : Team[] = [];
  user : User = new User();
  isValid : boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef:MatDialogRef<AdminComponent>,
    private teamsService : TeamsService, private service : AdminService, private toastr : ToastrService) { }

  ngOnInit() {
    this.service.getUserById(this.data.user.id).then(res => this.user = res as User);
    this.teamsService.getTeamsList().then(res => this.teamList = res as Team[]);
    this.formData =
    {
      id : this.data.user.id,
      username : this.data.user.username,
      password : "",
      email : this.data.user.email,
      favouriteTeam : this.data.user.favouriteTeam,
      role : this.data.user.role
    }

  }

  validateForm(){
    if(this.formData.username.length > 2 && this.formData.email.length > 10 &&
        this.formData.role != "")
    {
      this.isValid = true;
    }
  }

  onSubmit()
  {
    if(this.formData.password.length == 0)
    {
      this.formData.password = this.user.password;
    }
    this.validateForm();
    if(this.isValid)
    {
      this.service.editUser(this.formData).subscribe(
        (res:any) => {
          if(res.succeeded)
          {
              this.formData.password = "";
              this.toastr.success('User was edited!!', 'Edition successful.');
          }
          else {
            res.errors.forEach(element => {
              switch (element.code) {
                case 'DublicateUserName':
                  //Username already taken
                  this.toastr.error('Username is already taken.', 'Registration failed');
                  break;
              
                default:
                  //Registration failed
                  this.toastr.error(element.description, 'Registration failed');
                  break;
              }
            });
          }
        },
      );
    }
    else{
      this.toastr.error('The form is incorect!', 'Please check inputs.');
    }
  }
}
