import { Component, OnInit } from '@angular/core';
import { ListService } from './../../services/list.service';
import { SessionService } from './../../services/session.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss']
})
export class AdminPage implements OnInit {
  constructor(
    private listService: ListService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {}

  public btnReg() {
    this.sessionService.reState = true;
    this.router.navigate(['/end']);
  }
}
