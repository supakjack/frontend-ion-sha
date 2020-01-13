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
  public userId: Number;
  public password = '';
  public status = '';
  public appId: Number;
  public reState: Boolean;
  public regId: any;
  public crsId: any;
  public editTab: Boolean;
  constructor(private http: HttpClient) {
    this.clearAppId();
    this.reState = false;
    this.editTab = false;
  }
  public clearAppId() {
    this.appId = null;
  }
  public setAppId(id) {
    this.appId = id;
  }
  getSession() {
    return {
      id: this.userId,
      username: this.username,
      password: this.password,
      status: this.status
    };
  }
  setSession(usr = null, pas = null, sta = null, id = null) {
    this.username = usr;
    this.password = pas;
    this.status = sta;
    this.userId = id;
  }
}
