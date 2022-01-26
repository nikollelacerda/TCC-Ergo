import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_HEADERS, BASE_URL } from './api';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { formatToken } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class HistoricosService {
  url: string = `${BASE_URL}/historico/`;
  httpHeaders = {
    headers: BASE_HEADERS
  };
  constructor(private http: HttpClient) { }

  fetchHistoricoByUser(id: string | number, token: string): Observable<any> {
    const customHeader = {
      headers: {...this.httpHeaders.headers, Authorization:`Token ${token}`}
    }
    return this.http.get(
      `${this.url}user/${id}`,
      customHeader
    )
  }

  listHistoricos(): Observable<any> {
    return this.http.get(
      this.url,
      this.httpHeaders
    );
  }

  readHistorico(id: number): Observable<any> {
    return this.http.get(
      `${this.url}${id}/`,
      this.httpHeaders
    );
  }

  updateHistorico(data: any): Observable<any> {
    return this.http.put(
      `${this.url}${data.id}/`,
      data,
      this.httpHeaders
    );
  }

  createHistorico(data: any): Observable<any> {
    return this.http.post(
      this.url,
      data,
      this.httpHeaders
    );
  }
}