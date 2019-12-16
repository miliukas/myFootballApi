import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/user.service';
import { AuthGuard } from './auth/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAdmin : boolean = false;
  title = 'MyFootball';
  userDetails;

  constructor(private router: Router, private service : UserService, private authService: AuthGuard) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    console.log(this.isAdmin);
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
    this.userDetails = null;
    window.location.reload();
  }

  onLogin()
  {
    this.router.navigate(['/user/login']);
  }
}
