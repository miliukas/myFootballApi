import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from '../shared/players.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlayerComponent } from './player/player.component';
import { Player } from '../shared/player.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styles: []
})
export class PlayersComponent implements OnInit {

  playersList : Player[] = [];
  
  constructor(private dialog : MatDialog, private service : PlayersService) { }

  ngOnInit() {
    this.service.getPlayersList().then(
      res => this.playersList = res as Player[]
    );
  }

  AddOrEditPlayer(playerId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "80%";
    dialogConfig.data = {playerId};
    this.dialog.open(PlayerComponent, dialogConfig);
  }
}
