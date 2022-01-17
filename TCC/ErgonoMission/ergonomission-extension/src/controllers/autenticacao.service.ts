import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import LoginModel from 'src/models/login';
import { BASE_URL, BASE_HEADERS } from './api';

@Injectable({
  providedIn: 'root'
})

export class AutenticacaoService {

  url : string = `${BASE_URL}/auth/token`;
  httpHeaders = {
    headers: new HttpHeaders(BASE_HEADERS)
  };
  constructor(private http: HttpClient) { }

  login(data : LoginModel) : Observable<any> {
    return this.http.post(
      `${this.url}/login`,
      data, 
      this.httpHeaders,
    );
  }

  logout(token: string) : Observable<any> {
    const customHeader = this.httpHeaders;
    customHeader.headers = customHeader.headers.append("Authorization",`Token ${token}`);
    return this.http.post(
      `${this.url}/logout/`,
      null,
      customHeader
    );
  }
}