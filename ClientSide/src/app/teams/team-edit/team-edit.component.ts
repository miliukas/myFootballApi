import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { TeamsComponent } from '../teams.component';
import { Team } from 'src/app/shared/team.model';
import { TeamService } from 'src/app/shared/team.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styles: []
})
export class TeamEditComponent implements OnInit {
  
  formData : Team;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data, public dialogRef:MatDialogRef<TeamsComponent>,
    private service:TeamService, private toastr:ToastrService) 
    { }

  ngOnInit() {
    //console.log(this.service.getTeamById(this.data.teamId).then(res => this.team = res as Team));
    var substring = this.data.team.founded.split('T')[0];
    this.formData ={
    id : this.data.team.id,
    name : this.data.team.name,
    code : this.data.team.code,
    logo : this.data.team.logo,
    country : this.data.team.country,
    founded : substring,
    vanue_name : this.data.team.vanue_name,
    vanue_city : this.data.team.vanue_city,
    vanue_capacity : this.data.team.vanue_capacity
    }
  }

  onSubmit()
  {
    this.service.editTeam(this.formData).subscribe(
      (res:any) => {
        if(res.succeeded)
        {
            this.toastr.success('Team updated!', 'Update successful.');
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
}
