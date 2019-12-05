import { Injectable } from '@angular/core';
import { Player } from './player.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http:HttpClient) { }

  getPlayersList()
  {
    return this.http.get(environment.apiURL + 'Players').toPromise();
  }
}
