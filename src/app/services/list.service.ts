import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  url = 'http://localhost:3000/list';
  apiKey = '';
  public lists: any = [];

  constructor(private http: HttpClient) {}
  getAppByUser(username: string) {
     return this.http.get<any[]>(`${this.url}/${username}`)
  }
}
