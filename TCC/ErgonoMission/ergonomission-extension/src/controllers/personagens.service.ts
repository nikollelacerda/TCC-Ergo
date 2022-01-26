import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_HEADERS, BASE_URL } from './api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonagensService {
  url: string = `${BASE_URL}/personagens/`;
  httpHeaders = {
    headers: BASE_HEADERS
  };
  constructor(private http: HttpClient) { }

  listPersonagens(): Observable<any> {
    return this.http.get(
      this.url,
      this.httpHeaders
    );
  }

  readPersonagem(id: number): Observable<any> {
    return this.http.get(
      `${this.url}${id}/`,
      this.httpHeaders
    );
  }

  readImagePersonagem(id : number) : Observable<any> {
    return this.http.get(
      `${this.url}${id}/image/`,
      {...this.httpHeaders,  responseType: "blob" }
    );
  }

  fetchByUID(uid: number): Observable<any> {
    return this.http.get(
      `${this.url}user/${uid}`,
      this.httpHeaders
    )
  }

  updatePersonagem(data: any, token: string): Observable<any> {
    const customHeader = {
      headers: {...this.httpHeaders.headers, Authorization:`Token ${token}`}
    }

    return this.http.put(
      `${this.url}${data.usuario}/`,
      data,
      customHeader
    );
  }

  createPersonagem(data: any, token: string): Observable<any> {
    const customHeader = {
      headers: {...this.httpHeaders.headers, Authorization:`Token ${token}`}
    }

    return this.http.post(
      this.url,
      data,
      customHeader
    );
  }
}