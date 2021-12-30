import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_HEADERS, BASE_URL } from './api'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  httpHeaders = {
    headers: new HttpHeaders(BASE_HEADERS)
  };
  constructor(private http: HttpClient) { }

  listUsuarios() : Observable<any> {
    return this.http.get(
      `${BASE_URL}usuarios/`, 
      this.httpHeaders
    );
  }

  readUsuario(id : number) : Observable<any> {
    return this.http.get(
      `${BASE_URL}usuario/${id}/`,
      this.httpHeaders
    );
  }

  updateUsuario(data : any) : Observable<any> {
    return this.http.put(
      `${BASE_URL}usuario/${data.id}`,
      data,
      this.httpHeaders
    );
  }

  createUsuario(data : any) : Observable<any> {
     return this.http.post(
      `${BASE_URL}usuario/`,
      data,
      this.httpHeaders
     );
  }
}
