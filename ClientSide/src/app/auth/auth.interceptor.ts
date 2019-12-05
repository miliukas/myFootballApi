import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()

export class AuthInterCeptor implements HttpInterceptor{

/**
 *
 */
    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(localStorage.getItem('token') != null)
        {
            const cloneadReq = req.clone({
                headers : req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });
            return next.handle(cloneadReq).pipe(
                tap(
                    succ =>{},
                    err =>{
                        if(err.status == 401)
                        {
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/user/login');
                        }

                    }
                )
            )
        }
        else
        return next.handle(req.clone());
    }
}