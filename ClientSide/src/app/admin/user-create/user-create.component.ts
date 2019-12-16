import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/user.model';
import { Team } from 'src/app/shared/team.model';
import { TeamsService } from 'src/app/shared/teams.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styles: []
})
export class UserCreateComponent implements OnInit {

  formData : User;
  conPassword : String = "";
  teamList : Team[] = [];
  isValid : boolean = false;

  constructor(private service : AdminService, private toastr:ToastrService, 
    private teamsService: TeamsService) { }

  ngOnInit()
  {
    this.teamsService.getTeamsList().then(res => this.teamList = res as Team[]);
    this.formData =
    {
      id : 0,
      username : "",
      password : "",
      email : "",
      favouriteTeam : 0,
      role : ""
    }
  }

  validateForm(){
    if(this.formData.username.length > 4 && this.formData.password.length > 5 &&
      this.formData.password == this.conPassword && this.formData.role != "")
    {
      this.isValid = true;
    }
  }

  resetForm()
  {
    this.formData =
    {
      id : 0,
      username : "",
      password : "",
      email : "",
      favouriteTeam : 0,
      role : ""
    }
  }

  onSubmit()
  {
    this.validateForm();
    if(this.isValid)
    {
      this.service.addNewUser(this.formData).subscribe(
        (res:any) => {
          if(res.succeeded)
          {
              this.resetForm();
              this.conPassword = "";
              this.toastr.success('New user created!!', 'Creation successful.');
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
