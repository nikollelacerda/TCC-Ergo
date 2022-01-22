import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_HEADERS, BASE_URL } from './api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonagensService {
  url: string = `${BASE_URL}/personagems/`;
  httpHeaders = {
    headers: new HttpHeaders(BASE_HEADERS)
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
      `${this.url}${id}/get_image/`,
      {...this.httpHeaders,  responseType: "blob" }
    );
  }

  fetchByUID(uid: number): Observable<any> {
    return this.http.get(
      `${this.url}/UID/${uid}`,
      this.httpHeaders
    )
  }

  updatePersonagem(data: any, token: string): Observable<any> {
    const customHeader = this.httpHeaders;
    customHeader.headers = customHeader.headers.append("Authorization", `Token ${token}`);

    return this.http.put(
      `${this.url}${data.id}/`,
      data,
      customHeader
    );
  }

  createPersonagem(data: any, token: string): Observable<any> {
    const customHeader = this.httpHeaders;
    customHeader.headers = customHeader.headers.append("Authorization", `Token ${token}`);

    return this.http.post(
      this.url,
      data,
      customHeader
    );
  }
}