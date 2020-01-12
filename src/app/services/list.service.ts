import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  url = 'http://localhost:3000/list';
  urlApp = 'http://localhost:3000/app';
  apiKey = '';
  public lists: any = [];

  constructor(private http: HttpClient) {}
  getAppByUser(username: string) {
    return this.http.get<any[]>(`${this.url}/${username}`);
  }
  getListAwiatByEdl(id) {
    return this.http.get<any[]>(`${this.url}/edl/${id}`);
  }
  updatePassApp(id) {
    return this.http.patch<any[]>(`${this.urlApp}/pass/${id}`, {
      app_sta_id: '2'
    });
  }
  updateFailApp(id) {
    return this.http.patch<any[]>(`${this.urlApp}/fail/${id}`, {
      app_sta_id: '3'
    });
  }
}
