import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_HEADERS, BASE_URL } from './api';
import { Observable } from 'rxjs';
import { formatToken } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class CosmeticosService {
  url: string = `${BASE_URL}/cosmeticos/`;
  httpHeaders = {
    headers: new HttpHeaders(BASE_HEADERS)
  };
  constructor(private http: HttpClient) { }

  listCosmeticos(): Observable<any> {
    return this.http.get(
      this.url,
      this.httpHeaders
    );
  }

  readCosmetico(id: number): Observable<any> {
    return this.http.get(
      `${this.url}${id}/`,
      this.httpHeaders
    );
  }

  readImageCosmetico(id: number): Observable<any> {
    return this.http.get(
      `${this.url}${id}/image/`,
      { ...this.httpHeaders, responseType: "blob" }
    );
  }

  updateCosmetico(data: any): Observable<any> {
    return this.http.put(
      `${this.url}${data.id}/`,
      data,
      this.httpHeaders
    );
  }

  createCosmetico(data: any): Observable<any> {
    return this.http.post(
      this.url,
      data,
      this.httpHeaders
    );
  }

  comprarCosmetico(cosmetico_id: number, uid: number, token: string): Observable<any> {
    const customHeader = this.httpHeaders;
    customHeader.headers = customHeader.headers.append("Authorization", formatToken(token));
    return this.http.get(
      `${this.url}${cosmetico_id}/comprar/${uid}`,
      customHeader,
    )
  }
}