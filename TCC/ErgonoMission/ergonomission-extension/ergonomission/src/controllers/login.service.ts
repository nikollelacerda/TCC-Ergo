import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, BASE_HEADERS } from './api';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  url : string = `${BASE_URL}/auth/token`;
  httpHeaders = {
    headers: new HttpHeaders(BASE_HEADERS)
  };
  constructor(private http: HttpClient) { }

  login(data : any) : Observable<any> {
    return this.http.post(
      `${this.url}/login`,
      data, 
      this.httpHeaders,
    );
  }

  logout() : Observable<any> {
    return this.http.get(
      `${this.url}/logout`, 
      this.httpHeaders
    );
  }
}