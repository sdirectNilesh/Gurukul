import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiURL;
  object = new BehaviorSubject<any>(null);
  objectimg = new BehaviorSubject<any>(null);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: "Bearer "+localStorage.getItem('saas') || '',
    }),
  };

  
  constructor(
    private http: HttpClient,
    private router: Router,

  ) {}


  UserSignup(formdata: any) {
    return this.http.post(`${this.apiUrl}user-sign-up`, formdata, this.httpOptions);
  }
  UserLogin(formdata: any) {
    return this.http.post(`${this.apiUrl}user-sign-in`, formdata, this.httpOptions);
  }
  UserList(formdata: any) {
    return this.http.get(`${this.apiUrl}user-list`, this.httpOptions);
  }



}