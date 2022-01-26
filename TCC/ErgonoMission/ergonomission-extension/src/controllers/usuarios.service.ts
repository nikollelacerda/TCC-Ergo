import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_HEADERS, BASE_URL } from './api'; 
import { Observable } from 'rxjs';
import CadastroModel from 'src/models/cadastro';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url : string = `${BASE_URL}/auth/users/`;
  httpHeaders = {
    headers: BASE_HEADERS
  };
  constructor(private http: HttpClient) {
  }

  readUsuario(token: string) : Observable<any> {
    const customHeader = {
      headers: {...this.httpHeaders.headers, Authorization:`Token ${token}`}
    }
    return this.http.get(
      `${this.url}me/`,
      customHeader
    );
  }

  updateUsuario(data: any, token: string) : Observable<any> {
    const customHeader = {
      headers: {...this.httpHeaders.headers, Authorization:`Token ${token}`}
    }
    return this.http.put(
      `${BASE_URL}/usuario/${data.uid}`,
      data,
      customHeader
    );
  }

  updateSenha(data: any, token: string) : Observable<any> {
    const customHeader = {
      headers: {...this.httpHeaders.headers, Authorization:`Token ${token}`}
    }
    return this.http.post(
      `${BASE_URL}/auth/users/set_password/`,
      data,
      customHeader
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
