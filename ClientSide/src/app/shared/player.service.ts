import { Injectable } from '@angular/core';
import { Player } from './player.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  formData : Player;

  constructor(private fb: FormBuilder, private http:HttpClient) { }

    formModel = this.fb.group({
      Id : [''],
      FirstName : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      LastName : ['', [Validators.required, Validators.minLength(3)]],
      BirthDate :['', Validators.required],
      Age : ['', Validators.required],
      Possition : ['', Validators.required],
      Nationality : ['', Validators.required],
      Weight : ['', Validators.required],
      Height : ['', Validators.required],
      Goals : ['', Validators.required],
      Inured : ['', Validators.required],
      League : ['', Validators.required],
      fk_TeamId : ['', Validators.required]
  });

  /*addNewPlayer()
  {
    var body ={
      Id : '',
      first_name: this.formModel.value.FirstName,
      last_name: this.formModel.value.LastName,
      birth_date: this.formModel.value.BirthDate,
      age : this.formModel.value.Age,
      possition : this.formModel.value.Possition,
      nationality : this.formModel.value.Nationality,
      weight : this.formModel.value.Weight,
      height : this.formModel.value.Height,
      goals : this.formModel.value.Goals,
      injured : this.formModel.value.Inured,
      league : this.formModel.value.League,
      fk_TeamId : this.formModel.value.fk_TeamId
    };
    return this.http.post(environment.apiURL + 'Players', body);
  }*/

  getTeamList()
  {
    return this.http.get(environment.apiURL + 'Teams').toPromise();
  }
}
