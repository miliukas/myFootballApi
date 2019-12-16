import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../shared/player.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlayerComponent } from './player/player.component';
import { Player } from '../shared/player.model';
import { AuthGuard } from '../auth/auth.guard';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styles: []
})
export class PlayersComponent implements OnInit {

  playersList : Player[] = [];
  
  constructor(private dialog : MatDialog, private service : PlayerService, private authService: AuthGuard,
      private toastr : ToastrService) { }

  ngOnInit() 
  {
    this.refreshPlayersList();
  }

  refreshPlayersList()
  {
    this.service.getPlayersList().then( res => this.playersList = res as Player[]);
  }

  addPlayer(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "80%";
    //dialogConfig.data = {};
    this.dialog.open(PlayerComponent, dialogConfig).afterClosed().subscribe(res => 
    {
      this.refreshPlayersList();
    });
  }

  editPlayer(player : Player){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "80%";
    dialogConfig.data = {player};
    this.dialog.open(PlayerEditComponent, dialogConfig).afterClosed().subscribe(res => {
      this.refreshPlayersList();
    });
  }

  detailsPlayer(player : Player)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    //dialogConfig.height = "100%";
    dialogConfig.data = {player};
    this.dialog.open(PlayerDetailsComponent, dialogConfig);
  }

  onPlayerDelete(id:number){
    if(confirm("Are you sure to delete this record?")){
      this.service.deletePlayer(id).then(res =>{
        this.refreshPlayersList();
        this.toastr.warning("Deleted successfully.", "MyFootballApi");
      });
    }
  }

}
