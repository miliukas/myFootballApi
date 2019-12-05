import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAdmin = this.checkIsAdmin(); 
  /**
   *
   */
  constructor(private router:Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(localStorage.getItem('token') != null)
    return true;
    else 
    {
      this.router.navigate(['/user/login']);
      return false;
    }
  }

  

decodeToken(token)
{
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    var array = JSON.parse(jsonPayload);
    //console.log(array["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    //console.log( JSON.parse(jsonPayload));
    return array;
}

checkIsAdmin()
{
  if(localStorage.getItem('token') == null)
    return false;
  var decodedToken = this.decodeToken(localStorage.getItem('token'));
  var role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  var a = false;
  console.log(role);
  if(role == "administrator"){
    a = true;
    console.log(a);
    return true;
  }
  else{
    console.log(a);
    return false;
  }
}
  
}
