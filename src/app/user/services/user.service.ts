import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DataApi, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://kosmetikon.myqnapcloud.com:8769';
// pedir al Equipo de backend la URL de la nube

  constructor(
    private http: HttpClient,
  ) {}
  
  //Peticiones

  public getUserList(): Observable<any> {
    return this.http.get<DataApi>(`${this.baseUrl}/getUserList`)
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
