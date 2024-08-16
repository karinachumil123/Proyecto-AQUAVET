import {  HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const currentUser = authService.getToken();


  const cloneReq = currentUser 
        ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${ JSON.parse(currentUser)}`
          }
        }) 
        : req;

  
  return next(cloneReq).pipe(    
    catchError((err:any) =>{
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          authService.logout()
        }
      }
      return throwError(()=> err)
    })
  )
};


