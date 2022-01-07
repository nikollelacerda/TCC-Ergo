import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_HEADERS, BASE_URL } from './api'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url : string = `${BASE_URL}usuarios/`;
  httpHeaders = {
    headers: new HttpHeaders(BASE_HEADERS)
  };
  constructor(private http: HttpClient) { }

  listUsuarios() : Observable<any> {
    return this.http.get(
      this.url, 
      this.httpHeaders
    );
  }

  readUsuario(id : number) : Observable<any> {
    return this.http.get(
      `${this.url}${id}/`,
      this.httpHeaders
    );
  }

  updateUsuario(data : any) : Observable<any> {
    return this.http.put(
      `${this.url}${data.id}/`,
      data,
      this.httpHeaders
    );
  }

  createUsuario(data : any) : Observable<any> {
     return this.http.post(
      this.url,
      data,
      this.httpHeaders
     );
  }
}
