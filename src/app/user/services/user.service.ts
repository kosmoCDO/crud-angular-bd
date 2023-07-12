import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DataApi, User } from '../interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://kosmetikon.myqnapcloud.com:44444';

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) {}

  //Peticiones

  public getUserList(): Observable<any> {
    return this.http.get<DataApi>(`${this.baseUrl}/getUserList`,
    { headers: { "Content-Type": "application/json" }})
  }

  newUser(data: User): Observable<any> {
    return this.http.post<string>(`${this.baseUrl}/newUser`, 
    data , { headers: {'Content-Type': 'application/json'} });
  }

  updateUser(data: User): Observable<any> {
    return this.http.patch<string>(`${this.baseUrl}/updateUser`, 
    data , { headers: {'Content-Type': 'application/json'} });
  }

  deleteUserApi(emailUser: string, dataModal: string ): Observable<any> {
    const data = { EMAIL: emailUser, PASSWORD: dataModal };

    return this.http.delete<any>(`${this.baseUrl}/deleteUser`, { body: data });
  }


}
