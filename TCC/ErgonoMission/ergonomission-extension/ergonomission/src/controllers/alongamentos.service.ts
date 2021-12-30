import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_HEADERS, BASE_URL } from './api'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlongamentosService {
  url : string = `${BASE_URL}alongamentos/`;
  httpHeaders = {
    headers: new HttpHeaders(BASE_HEADERS)
  };
  constructor(private http: HttpClient) { }

  listAlongamentos() : Observable<any> {
    return this.http.get(
      this.url, 
      this.httpHeaders
    );
  }

  readAlongamento(id : number) : Observable<any> {
    return this.http.get(
      `${this.url}${id}/`,
      this.httpHeaders
    );
  }

  updateAlongamento(data : any) : Observable<any> {
    return this.http.put(
      `${this.url}${data.id}/`,
      data,
      this.httpHeaders
    );
  }

  createAlongamento(data : any) : Observable<any> {
     return this.http.post(
      this.url,
      data,
      this.httpHeaders
     );
  }
}