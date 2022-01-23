import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_HEADERS, BASE_URL } from './api'; 
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { formatToken } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class PomodorosService {
  url : string = `${BASE_URL}/pomodoros/`;
  httpHeaders = {
    headers: new HttpHeaders(BASE_HEADERS)
  };
  constructor(private http: HttpClient, private cookie:CookieService) { }

  listPomodoros() : Observable<any> {
    return this.http.get(
      this.url, 
      this.httpHeaders
    );
  }

  readPomodoro(id : number) : Observable<any> {
    return this.http.get(
      `${this.url}${id}/`,
      this.httpHeaders
    );
  }

  updatePomodoro(data : any) : Observable<any> {
    return this.http.put(
      `${this.url}${data.id}/`,
      data,
      this.httpHeaders
    );
  }

  createPomodoro(data : any, token: string) : Observable<any> {
    const customHeader = this.httpHeaders;
    customHeader.headers = customHeader.headers.append("Authorization",`Token ${token}`);

     return this.http.post(
      this.url,
      data,
      customHeader
     );
  }
}