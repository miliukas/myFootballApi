import { Component, OnInit, Inject } from '@angular/core';
import { PlayerService } from 'src/app/shared/player.service';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Player } from 'src/app/shared/player.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/shared/team.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styles: []
})
export class PlayerComponent implements OnInit {
  formData : Player;
  playersList : Player[];
  teamList : Team[];

  constructor(private http:HttpClient, public service : PlayerService, @Inject(MAT_DIALOG_DATA) public data, public dialogRef : MatDialogRef<PlayerComponent>,
  private toastr: ToastrService) { }

  ngOnInit() {
    console.log("afsasf");
    this.getTeamList().then(
      res => this.teamList = res as Team[]
    );
    console.log(this.teamList.length.toString());
    console.log("afsasf");
    this.service.getPlayersList().then(
      res => this.playersList = res as Player[]
    );

    this.formData = {
      id : this.data.id,
      first_name : '',
      last_name : '',
      birth_date : null,
      age : 0,
      possition : '',
      nationality : '',
      weight : 0,
      height : 0,
      goals : 0,
      injured : null, 
      league : '',
      season : '',
      fk_TeamId : 0
    }
  }

  onSubmit(form:NgForm)
  {
    
  }

  refresh()
  {
    this.service.formModel.reset();
  }

  getTeamList()
  {
    console.log(this.http.get(environment.apiURL + 'Teams').toPromise());
    return this.http.get(environment.apiURL + 'Teams').toPromise();
  }

}
