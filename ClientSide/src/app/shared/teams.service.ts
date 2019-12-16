import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http:HttpClient) { }

  getTeamsList()
  {
    return this.http.get(environment.apiURL + 'Teams').toPromise();

  }

  deleteTeam(id:number)
  {
    return this.http.delete(environment.apiURL + 'Teams/'+id).toPromise();
  }
}
