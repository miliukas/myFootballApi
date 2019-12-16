import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/shared/team.model';
import { TeamsService } from 'src/app/shared/teams.service';
import { Game } from 'src/app/shared/game.model';
import { GamesService } from 'src/app/shared/games.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styles: []
})
export class GameCreateComponent implements OnInit {
  
  teamsList : Team[] = [];
  formData : Game;
  isValid: boolean = false;

  constructor( private teamsService : TeamsService, private service : GamesService,
    private toastr:ToastrService) { }

  ngOnInit() 
  {
    this.teamsService.getTeamsList().then(res => this.teamsList = res as Team[]);
    this.formData =
    {
      id : 0,
      eventDate : "",
      goalsHomeTeam : 0,
      goalsAwayTeam : 0,
      venue : "",
      elapsed : 0,
      fk_Teamid : 0,
      fk_Teamid1 : 0
    }
  }

  resetForm()
  {
    this.formData =
    {
      id : 0,
      eventDate : "",
      goalsHomeTeam : 0,
      goalsAwayTeam : 0,
      venue : "",
      elapsed : 0,
      fk_Teamid : 0,
      fk_Teamid1 : 0
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
      this.service.addNewGames(this.formData).subscribe(
        (res:any) => {
          if(res.succeeded)
          {
              this.resetForm();
              this.toastr.success('New games created!!', 'Creation successful.');
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
