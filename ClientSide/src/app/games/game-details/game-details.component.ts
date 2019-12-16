import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { GamesComponent } from '../games.component';
import { GamesService } from 'src/app/shared/games.service';
import { TeamsService } from 'src/app/shared/teams.service';
import { Game } from 'src/app/shared/game.model';
import { Team } from 'src/app/shared/team.model';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { TeamService } from 'src/app/shared/team.service';


@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styles: []
})
export class GameDetailsComponent implements OnInit {

  formData : Game;
  homeTeam : Team = new Team();
  awayTeam : Team = new Team();
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef:MatDialogRef<GamesComponent>,
  private service : GamesService, private teamsService : TeamsService, private authService: AuthGuard,
  private teamService : TeamService) { }

  ngOnInit() {
    var substring = this.data.game.eventDate.split('T')[0];
    
    this.teamService.getTeamById(this.data.game.fk_Teamid).then(res => this.homeTeam = res as Team);
    this.teamService.getTeamById(this.data.game.fk_Teamid1).then(res => this.awayTeam = res as Team);
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
}
