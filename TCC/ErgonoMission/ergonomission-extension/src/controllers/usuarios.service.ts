import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_HEADERS, BASE_URL } from './api'; 
import { Observable } from 'rxjs';
import CadastroModel from 'src/models/cadastro';
import { formatToken } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url : string = `${BASE_URL}/auth/users/`;
  httpHeaders = {
    headers: new HttpHeaders(BASE_HEADERS)
  };
  constructor(private http: HttpClient) {
  }

  readUsuario(token: string) : Observable<any> {
    const customHeader = this.httpHeaders;
    customHeader.headers = customHeader.headers.append("Authorization",`Token ${token}`);
    return this.http.get(
      `${this.url}me/`,
      customHeader
    );
  }

  updateUsuario(data : any) : Observable<any> {
    return this.http.put(
      `${this.url}${data.id}/`,
      data,
      this.httpHeaders
    );
  }

  createUsuario(data : CadastroModel) : Observable<any> {
     return this.http.post(
      this.url,
      data,
      this.httpHeaders
     );
  }
}
