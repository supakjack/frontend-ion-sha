import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://localhost:3000/login';
  apiKey = '';
  constructor(private http: HttpClient) {}
  getAllUser() {
    return this.http.get(`${this.url}`).subscribe(result => {
      console.log(result);
    });
  }
  checkUser(usr=null, pas=null) {
    return this.http.get(`${this.url}/${usr}/${pas}`)
  }
}
