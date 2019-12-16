import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TeamService } from 'src/app/shared/team.service';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/shared/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styles: []
})
export class TeamComponent implements OnInit {
  team : Team; 
  constructor(private service : TeamService, private toastr:ToastrService) {
  }
  
  ngOnInit() {
  }

  onSubmit()
  {
    this.service.addNewTeam().subscribe(
      (res:any) => {
        if(res.succeeded)
        {
            this.service.formModel.reset();
            this.toastr.success('New team created!', 'Creation successful.');
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
}