import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';
import { SessionService } from './../../services/session.service';
import {Router} from "@angular/router"
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(
    private loginService: LoginService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  public username = '';
  public password = '';
  public user_iden: any;
  public wrongstatus = false;

  ngOnInit() {}

  ngAfterViewInit() {
    $(document).ready(() => {
      console.log('jquery work in ionic');
    });
  }

  public getAllUser() {
    this.loginService.getAllUser();
  }

  public login() {
    let checkUser = this.loginService.checkUser(this.username, this.password);
    checkUser.subscribe(result => {
      if (!result) {
        this.wrongstatus = true;
      } else {
        this.wrongstatus = false;
        this.user_iden = result;
        this.sessionService.setSession(
          this.username,
          this.password,
          this.user_iden.status
        );
        console.log(this.sessionService.getSession());
        this.router.navigate(['/list'])
      }
    });
  }
}
