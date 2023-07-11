import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { User } from 'src/app/user/interfaces/user.interface';
import { UserStatus } from '../interfaces/auth.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

    baseUrl = 'http://kosmetikon.myqnapcloud.com:44444';

    private _currentUser: any;
    private _tokenUser: string | null = null;

    constructor( 
        private http: HttpClient,
        private cookie: CookieService ) {}

        insertToken( token: string ) {
            this._tokenUser = token;
            // this.cookie.set('access_token', token);
            // localStorage.setItem('token',token);k
        }


        /* Peticiones */
    newUser(data: User): Observable<any> {
        return this.http.post<string>(`${this.baseUrl}/newUser`, 
        data , { headers: {'Content-Type': 'application/json'} });
    };
    authLogin(data: User): any {
         return this.http.post<any>(`${this.baseUrl}/login`,
         data, { withCredentials: true });
    };
    userLogout(): any {
        return this.http.delete<any>(`${this.baseUrl}/logout`)
    };
    
}