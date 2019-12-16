import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getGamesList()
  {
    return this.http.get(environment.apiURL + 'Games').toPromise();
  }

  addNewGames(formData : Game)
  {
      formData.eventDate+="T18:00:00";
      return this.http.post(environment.apiURL + 'Games/', formData);
  }

  editGames(formData : Game)
  {
      return this.http.put(environment.apiURL + 'Games/'+formData.id, formData);
  }

  deleteGame(id:number)
  {
    return this.http.delete(environment.apiURL + 'Games/'+id).toPromise();
  }
}
