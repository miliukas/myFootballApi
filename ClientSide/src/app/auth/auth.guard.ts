import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAdmin = this.checkIsAdmin();
  isUser = this.checkIsUser(); 
  /**
   *
   */
  constructor(private router:Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.checkIsAdmin())
    return true;
    else 
    {
      this.router.navigate(['/home']);
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
  if(role == "administrator"){
    a = true;
    return true;
  }
  else{
    return false;
  }
}

checkIsUser()
{
  if(localStorage.getItem('token') == null)
    return false;
  return true;
}
  
}
