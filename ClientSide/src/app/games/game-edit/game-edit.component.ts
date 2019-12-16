import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { GamesComponent } from '../games.component';
import { GamesService } from 'src/app/shared/games.service';
import { Game } from 'src/app/shared/game.model';
import { Team } from 'src/app/shared/team.model';
import { TeamsService } from 'src/app/shared/teams.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styles: []
})
export class GameEditComponent implements OnInit {

  formData : Game;
  teamsList : Team[] = [];
  isValid: boolean = false;

  constructor( @Inject(MAT_DIALOG_DATA) public data, public dialogRef:MatDialogRef<GamesComponent>,
  private service:GamesService, private toastr:ToastrService, private teamsService : TeamsService) { }

  ngOnInit() 
  {
    var substring = this.data.game.eventDate.split('T')[0];
    this.teamsService.getTeamsList().then(res => this.teamsList = res as Team[]);
    this.formData =
    {
      id : this.data.game.id,
      eventDate : substring,
      goalsHomeTeam : this.data.game.goalsHomeTeam,
      goalsAwayTeam : this.data.game.goalsAwayTeam,
      venue : this.data.game.venue,
      elapsed : this.data.game.elapsed,
      fk_Teamid : this.data.game.fk_Teamid,
      fk_Teamid1 : this.data.game.fk_Teamid1
    }
  }

  selectVenueByHomeTeam()
  {
    for(let team of this.teamsList)
    {
      if(team.id == this.formData.fk_Teamid)
      {
        this.formData.venue = team.vanue_name;
      }
    }
    console.log(this.formData.venue);
  }

  validateForm(){
    if(this.formData.fk_Teamid != 0 && this.formData.fk_Teamid1 != 0 && this.formData.eventDate != ""
      && this.formData.fk_Teamid != this.formData.fk_Teamid1)
    {
      this.isValid = true;
    }
  }

  onSubmit()
  {
    this.validateForm();
    if(this.isValid)
    {
      this.service.editGames(this.formData).subscribe(
        (res:any) => {
          if(res.succeeded)
          {
              this.toastr.success('Match was updated!', 'Update successful.');
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
      this.toastr.error('The form was incorect!', 'Please check inputs.');
    }
  }

}
