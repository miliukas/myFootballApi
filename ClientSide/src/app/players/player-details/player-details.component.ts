import { Component, OnInit, Inject } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { PlayerService } from 'src/app/shared/player.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Player } from 'src/app/shared/player.model';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Team } from 'src/app/shared/team.model';
import { TeamService } from 'src/app/shared/team.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styles: []
})
export class PlayerDetailsComponent implements OnInit {

  formData : Player = new Player();
  team : Team = new Team();

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef:MatDialogRef<PlayerComponent>,
  private service : PlayerService, private authService: AuthGuard, private teamService : TeamService) { }

  ngOnInit() 
  {
    this.teamService.getTeamById(this.data.player.fk_TeamId).then(res => this.team = res as Team);

    var substring = this.data.player.birth_date.split('T')[0];
    this.formData = {
      id : this.data.player.id,
      first_name : this.data.player.first_name,
      last_name : this.data.player.last_name,
      birth_date : substring,
      age : this.data.player.age,
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

  isInjured()
  {
    if(this.formData.injured == 1)
    {
      return "Yes";
    }
    else
      return "No";
  }

}
