import { Injectable } from '@angular/core';
import { Player } from './player.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http:HttpClient) { }

  getPlayersList()
  {
    return this.http.get(environment.apiURL + 'Players').toPromise();
  }
 
  addNewPlayer(formData : Player)
  {
      //formData.birth_date+="T18:00:00";
      return this.http.post(environment.apiURL + 'Players', formData);
  }

  editPlayer(formData : Player)
  {
      return this.http.put(environment.apiURL + 'Players/' + formData.id, formData);
  }

  deletePlayer(id:number)
  {
    return this.http.delete(environment.apiURL + 'Players/'+id).toPromise();
  }

}
