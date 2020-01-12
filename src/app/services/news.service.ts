import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  url = 'http://localhost:3000/news';
  urlEdu = 'http://localhost:3000/edl';
  apiKey = '';
  constructor(private http: HttpClient) {}
  getAllGoup() {
    return this.http.get<any[]>(`${this.url}/open`);
  }
  getAllOpen() {
    return this.http.get<any[]>(`${this.url}`);
  }
  getGoupById(id: number) {
    return this.http.get<any[]>(`${this.url}/${id}`);
  }
  getInforById(id) {
    return this.http.get<any[]>(`${this.url}/opentoup/${id}`);
  }
  updateInforById(id, start, end, max) {
    return this.http.patch<any[]>(`${this.url}/${id}`, {
      reg_start: start,
      reg_end: end,
      reg_max: max
    });
  }
  getOnEdlGroup() {
    return this.http.get<any[]>(`${this.urlEdu}/stategroup`);
  }
}
