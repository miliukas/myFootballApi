import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getUserList()
  {
    return this.http.get(environment.apiURL + 'Users').toPromise();
  }

  addNewUser(formData : User)
  {
      return this.http.post(environment.apiURL + 'Users/', formData);
  }

  getUserById(id:number)
  {
    return this.http.get(environment.apiURL + 'Users/'+id).toPromise();
  }

  editUser(formData : User)
  {
      return this.http.put(environment.apiURL + 'Users/'+formData.id, formData);
  }

  deleteUser(id:number)
  {
    return this.http.delete(environment.apiURL + 'Users/'+id).toPromise();
  }
}
