import { Component, OnInit} from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/shared/team.model';
import { TeamsService } from 'src/app/shared/teams.service';
import { PlayerService } from 'src/app/shared/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styles: []
})
export class PlayerComponent implements OnInit {
  formData : Player = new Player();
  teamList : Team[] = [];
  isValid : boolean = false;

  constructor(private teamsService : TeamsService, private toastr: ToastrService,
      private service : PlayerService) { }

  ngOnInit() 
  {
    //this.service.formModel.reset();
    this.teamsService.getTeamsList().then(res => this.teamList = res as Team[]);
    this.formData = {
      id : 0,
      first_name : "",
      last_name : "",
      birth_date : "",
      age : 0,
      possition : "",
      nationality : "",
      weight : 0,
      height : 0,
      goals : 0,
      injured : -1, 
      league : "",
      season : "",
      fk_TeamId : 0
    }
  }

  validateForm(){
    if(this.formData.first_name.length > 3 && this.formData.last_name.length > 3 && this.formData.birth_date!=""
      && this.formData.possition != "" && this.formData.nationality.length > 3 && this.formData.height != 0 &&
      this.formData.weight != 0 && this.formData.injured != -1 && this.formData.league != "" &&
      this.formData.season != "" && this.formData.fk_TeamId != 0)
    {
      this.isValid = true;
    }
  }

  onSubmit()
  {
    this.validateForm();
    if(this.isValid)
    {
      var birthYears : number  = parseInt(this.formData.birth_date.split('-')[0]);
      var date = new Date();
      var year = date.getFullYear();
      this.formData.age = year - birthYears;
      this.service.addNewPlayer(this.formData).subscribe(
        (res:any) => {
          if(res.succeeded)
          {
              this.resetForm();
              this.toastr.success('New player created!!', 'Creation successful.');
          }
          else {
            res.errors.forEach(element => {
              switch (element.code) {
                case 'DublicateUserName':
                  //Username already taken
                  this.toastr.error('Username is already taken.', 'Registration failed');
                  break;
              
                default:
                  //Registration failed
                  this.toastr.error(element.description, 'Registration failed');
                  break;
              }
            });
          }
        },
      );
    }
    else
    {
      this.toastr.error('The form was incorect!', 'Please check inputs.');
    }
  }

  resetForm()
  {
    this.formData = {
      id : 0,
      first_name : "",
      last_name : "",
      birth_date : "",
      age : 0,
      possition : "",
      nationality : "",
      weight : 0,
      height : 0,
      goals : 0,
      injured : -1, 
      league : "",
      season : "",
      fk_TeamId : 0
    }
  }

}
