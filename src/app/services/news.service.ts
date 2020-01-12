import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  url = 'http://localhost:3000/news';
  apiKey = '';
  constructor(private http: HttpClient) {}
  getAllGoup() {
    return this.http.get<any[]>(`${this.url}/open`);
  }
  getAllOpen() {
    return this.http.get<any[]>(`${this.url}`);
  }
  getGoupById(id:number) {
    return this.http.get<any[]>(`${this.url}/${id}`);
  }
}
