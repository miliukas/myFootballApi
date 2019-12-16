import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { TeamsComponent } from '../teams.component';
import { Team } from 'src/app/shared/team.model';
import { AuthGuard } from 'src/app/auth/auth.guard';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styles: []
})
export class TeamDetailsComponent implements OnInit {
  formData : Team;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef:MatDialogRef<TeamsComponent>,
    private authService: AuthGuard) { }

  ngOnInit() {
    var substring = this.data.team.founded.split('T')[0];
    this.formData ={
    id : this.data.team.id,
    name : this.data.team.name,
    code : this.data.team.name,
    logo : this.data.team.logo,
    country : this.data.team.country,
    founded : substring,
    vanue_name : this.data.team.vanue_name,
    vanue_city : this.data.team.vanue_city,
    vanue_capacity : this.data.team.vanue_capacity
    }
  }

}
