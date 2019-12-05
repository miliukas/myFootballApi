import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ClientSide';
  userDetails;

  constructor(private router: Router, private service : UserService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  onLogout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.userDetails = null;
  }

  onLogin()
  {
    this.router.navigate(['/user/login']);
  }
}
