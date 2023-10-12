import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root',
  })

  export class AuthService {
    public apiUrl = environment.apiURL;

    // httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type': 'application/json',
    //       Authorization: "Bearer "+ localStorage.getItem('capstone') || '',
    //     }),
    //   };
    

    constructor(
        private http: HttpClient
    
      ) {}

    tutorClientSignup(data:any){
      console.log("userdata ....",data)
        return this.http.post(`${this.apiUrl}tutorClientSignup`, data)
      }
  }  