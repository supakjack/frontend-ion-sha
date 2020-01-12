import { Component, OnInit } from '@angular/core';
import { ListService } from './../../services/list.service';
import { SessionService } from './../../services/session.service';
import { LibsService } from './../../services/libs.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-append',
  templateUrl: './append.page.html',
  styleUrls: ['./append.page.scss']
})
export class AppendPage implements OnInit {
  public lists: any;

  constructor(
    private listService: ListService,
    private sessionService: SessionService,
    private libsService: LibsService,
    private router: Router
  ) {
    setInterval(() => {
      if (this.sessionService.reState) {
        this.ngOnInit();
        this.sessionService.reState = false;
      }
    }, 500);
  }

  ngOnInit() {
    this.lists = null;
    this.onLists();
  }

  dosomething(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  clickBack() {
    this.sessionService.reState = true;
    this.router.navigate(['/student']);
  }

  clickPass(id) {
    this.listService.updatePassApp(id).subscribe(res => {
      console.log(res);
      this.sessionService.reState = true;
    });
  }

  clickFail(id) {
    this.listService.updateFailApp(id).subscribe(res => {
      console.log(res);
      this.sessionService.reState = true;
    });
  }

  onLists() {
    this.lists = [];
    this.listService
      .getListAwiatByEdl(this.sessionService.crsId)
      .subscribe(res => {
        res.forEach((element, index) => {
          this.lists.push(element);
        });
        console.log(this.lists);
      });
  }
}
