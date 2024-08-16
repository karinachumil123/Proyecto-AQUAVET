import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth = new BehaviorSubject<boolean>(false);
  
  constructor( private  http: HttpClient, private route :Router) { }

  login(email: string, password: string){
    return this.http.post<any>(`${environment.baseUrlApi}/user/login`, {Email : email, Password: password})
      .pipe(tap(user => {
        if (user.isSucess) {
          sessionStorage.setItem('CurrentUser', JSON.stringify(user.value.token));
          this.isAuth.next(true);
        }
      }))
  }

  logout(){
      this.removeToken()
      this.isAuth.next(false);
      this.route.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken()

    //no existen el token
    if (!token) {
      this.isAuth.next(false);
      return false;
    }

    //el token expiro
    if (this.isTokenExpired(token)) {
      this.removeToken()
      this.isAuth.next(false);
      return false;
    }

    //el token no expirado
    this.isAuth.next(true);
    return true;
  }



  isTokenExpired(token:string){
    try {
      const decoded: DecodedToken = jwtDecode(token);      
      const dateNow = Math.floor(Date.now() / 1000);
      return decoded.exp < dateNow;

    } catch (error) {
      return true;
    }    
  }

  removeToken(){
    if (this.getToken != null) {
      sessionStorage.removeItem('CurrentUser'); 
    }
  }

  getToken(){
    return sessionStorage.getItem('CurrentUser');
  }
}
