import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_HEADERS, BASE_URL } from './api'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  httpHeaders = new HttpHeaders(BASE_HEADERS);
  constructor(private http: HttpClient) { }

  listUsuarios() : Observable<any> {
    return this.http.get(
      `${BASE_URL}usuarios/`, 
      {headers: this.httpHeaders}
    );
  }
}
