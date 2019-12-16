import { Component, OnInit } from '@angular/core';
import { GamesService } from '../shared/games.service';
import { Team } from '../shared/team.model';
import { Game } from '../shared/game.model';
import { AuthGuard } from '../auth/auth.guard';
import { TeamsService } from '../shared/teams.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styles: []
})
export class GamesComponent implements OnInit {

  teamsList : Team[] = [];
  gamesList : Game[] = [];

  constructor(private service : GamesService, private authService: AuthGuard,
     private teamsService : TeamsService, private dialog : MatDialog, private toastr:ToastrService) { }

  ngOnInit() {
    this.teamsService.getTeamsList().then(res => this.teamsList = res as Team[]);
    this.refreshGamesList();
    
  }

  refreshGamesList()
  {
    this.service.getGamesList().then(res => this.gamesList = res as Game[]);
  }

  getTeamNameById(id : number)
  {
    for(let team of this.teamsList)
    {
      if (team.id == id)
          return team.name;
    }
  }

  AddGames(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "80%";
    dialogConfig.data = {};
    this.dialog.open(GameCreateComponent, dialogConfig).afterClosed().subscribe(res => {
      this.refreshGamesList();
    });
  }

  EditGames(game : Game){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "80%";
    dialogConfig.data = {game};
    this.dialog.open(GameEditComponent, dialogConfig).afterClosed().subscribe(res => {
      this.refreshGamesList();
    });
  }

  DetailsGames(game : Game)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    //dialogConfig.height = "100%";
    dialogConfig.data = {game};
    this.dialog.open(GameDetailsComponent, dialogConfig);
  }
  
  onGamesDelete(id:number){
    if(confirm("Are you sure to delete this record?")){
      this.service.deleteGame(id).then(res =>{
        this.refreshGamesList();
        this.toastr.warning("Deleted successfully.", "MyFootballApi");
      });
    }
  }
 
}
