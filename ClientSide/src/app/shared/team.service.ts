import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { Team } from './team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private fb: FormBuilder, private http:HttpClient) { }

  formModel = this.fb.group({
    TeamName :['', [Validators.required,  Validators.minLength(5)]],
    Code :['', [Validators.required,  Validators.maxLength(3)]],
    Logo :[''],
    Country :['', Validators.required],
    Founded :['',  Validators.required],
    VanueName :['', [Validators.required,  Validators.minLength(6)]],
    VanueCity :['', [Validators.required,  Validators.minLength(4)]],
    VanueCapacity :['', Validators.required]
  });
  
  addNewTeam()
  {
    var body ={
      name: this.formModel.value.TeamName,
      code: this.formModel.value.Code,
      logo: this.formModel.value.Logo = 'www.random.com',
      country: this.formModel.value.Country,
      founded: this.formModel.value.Founded,
      vanue_name: this.formModel.value.VanueName,
      vanue_city: this.formModel.value.VanueCity,
      vanue_capacity: this.formModel.value.VanueCapacity
    };
    //console.log(JSON.stringify(body));
    return this.http.post(environment.apiURL + 'Teams', body);
  }

  getTeamById(id:number)
  {
    return this.http.get(environment.apiURL + 'Teams/'+id).toPromise();
  }

  editTeam(formData : Team)
  {
      return this.http.put(environment.apiURL + 'Teams/'+formData.id, formData);
  }
}
