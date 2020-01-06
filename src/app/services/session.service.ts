import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  url = 'http://localhost:3000/ses';
  apiKey = '';
  public username = '';
  public password = '';
  public status = '';
  constructor(private http: HttpClient) {}
  getSession() {
    return { username: this.username, password: this.password, status: this.status };
  }
  setSession(usr = null, pas = null, sta =null) {
    this.username = usr;
    this.password = pas;
    this.status = sta;
  }
}
