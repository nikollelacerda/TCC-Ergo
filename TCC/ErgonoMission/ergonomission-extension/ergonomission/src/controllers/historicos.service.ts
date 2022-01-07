import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_HEADERS, BASE_URL } from './api'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoricosService {
  url : string = `${BASE_URL}historicos/`;
  httpHeaders = {
    headers: new HttpHeaders(BASE_HEADERS)
  };
  constructor(private http: HttpClient) { }

  listHistoricos() : Observable<any> {
    return this.http.get(
      this.url, 
      this.httpHeaders
    );
  }

  readHistorico(id : number) : Observable<any> {
    return this.http.get(
      `${this.url}${id}/`,
      this.httpHeaders
    );
  }

  updateHistorico(data : any) : Observable<any> {
    return this.http.put(
      `${this.url}${data.id}/`,
      data,
      this.httpHeaders
    );
  }

  createHistorico(data : any) : Observable<any> {
     return this.http.post(
      this.url,
      data,
      this.httpHeaders
     );
  }
}