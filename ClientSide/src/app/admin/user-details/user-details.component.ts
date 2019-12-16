import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { AdminComponent } from '../admin.component';
import { AdminService } from 'src/app/shared/admin.service';
import { TeamService } from 'src/app/shared/team.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styles: []
})
export class UserDetailsComponent implements OnInit {

  user : User = new User();

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef:MatDialogRef<AdminComponent>,
    private service : AdminService, private teamService:TeamService) { }

  ngOnInit() {
    var userId : number = this.data.id;
    this.service.getUserById(userId).then(res => this.user = res as User);
  }
}
