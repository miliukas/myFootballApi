import { Component, OnInit, Inject } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { PlayerService } from 'src/app/shared/player.service';
import { ToastrService } from 'ngx-toastr';
import { TeamsService } from 'src/app/shared/teams.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Player } from 'src/app/shared/player.model';
import { Team } from 'src/app/shared/team.model';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styles: []
})
export class PlayerEditComponent implements OnInit {

  formData : Player;
  teamList : Team[] = [];
  isValid: boolean = false;

  constructor( @Inject(MAT_DIALOG_DATA) public data, public dialogRef:MatDialogRef<PlayerComponent>,
    private service:PlayerService, private toastr:ToastrService, private teamsService : TeamsService) { }

  ngOnInit()
  {
    this.teamsService.getTeamsList().then(res => this.teamList = res as Team[]);
    var substring = this.data.player.birth_date.split('T')[0];
    this.formData = {
      id : this.data.player.id,
      first_name : this.data.player.first_name,
      last_name : this.data.player.last_name,
      birth_date : substring,
      age : 0,
      possition : this.data.player.possition,
      nationality : this.data.player.nationality,
      weight : this.data.player.weight,
      height : this.data.player.height,
      goals : this.data.player.goals,
      injured : this.data.player.injured, 
      league : this.data.player.league,
      season : this.data.player.season,
      fk_TeamId : this.data.player.fk_TeamId
    }
  }

  validateForm(){
    if(this.formData.first_name.length > 3 && this.formData.last_name.length > 3 && this.formData.birth_date!=""
      && this.formData.possition != "" && this.formData.nationality.length > 3 && this.formData.height != 0 &&
      this.formData.weight != 0 && this.formData.injured != -1 && this.formData.league != "" &&
      this.formData.season != "" && this.formData.fk_TeamId != 0)
    {
      this.isValid = true;
    }
  }

  onSubmit()
  {
    this.validateForm();
    if(this.isValid)
    {
      var birthYears : number  = parseInt(this.formData.birth_date.split('-')[0]);
      var date = new Date();
      var year = date.getFullYear();
      this.formData.age = year - birthYears;
      this.service.editPlayer(this.formData).subscribe(
        (res:any) => {
          if(res.succeeded)
          {
              this.toastr.success('Player was edited!!', 'Edition successful.');
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
    else
    {
      this.toastr.error('The form was incorect!', 'Please check inputs.');
    }
  }

}
