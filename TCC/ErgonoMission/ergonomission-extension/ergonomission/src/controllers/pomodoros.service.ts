import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_HEADERS, BASE_URL } from './api'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PomodorosService {
  httpHeaders = {
    headers: new HttpHeaders(BASE_HEADERS)
  };
  constructor(private http: HttpClient) { }

  listPomodoros() : Observable<any> {
    return this.http.get(
      `${BASE_URL}pomodoros/`, 
      this.httpHeaders
    );
  }

  readPomodoro(id : number) : Observable<any> {
    return this.http.get(
      `${BASE_URL}pomodoro/${id}/`,
      this.httpHeaders
    );
  }

  updatePomodoro(data : any) : Observable<any> {
    return this.http.put(
      `${BASE_URL}pomodoro/${data.id}`,
      data,
      this.httpHeaders
    );
  }

  createPomodoro(data : any) : Observable<any> {
     return this.http.post(
      `${BASE_URL}pomodoro/`,
      data,
      this.httpHeaders
     );
  }
}