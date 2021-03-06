import { Component, OnInit } from '@angular/core';
import { ListService } from './../../services/list.service';
import { SessionService } from './../../services/session.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ListPage implements OnInit {
  public lists: any = [];

  constructor(
    private listService: ListService,
    private sessionService: SessionService,
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
    this.sessionService.clearAppId();
    this.resetList();
    this.createList();
    console.log('doing ngOnInit again');
  }

  public btnReg() {
    this.sessionService.reState = true;
    this.router.navigate(['/end']);
  }

  public createList() {
    this.listService
      .getAppByUser(this.sessionService.username)
      .subscribe(result => {
        result.forEach(element => {
          this.lists.push(element);
        });
      });
  }

  public resetList() {
    this.lists = [];
  }

  public clickDel(id) {
    this.listService.updateCancelApp(id).subscribe(res => {
      console.log(res);
      this.sessionService.reState = true;
      this.ngOnInit();
    });
  }

  public clickEdit(id) {
    this.sessionService.setAppId(id);
    this.sessionService.editTab=true;
    this.router.navigate(['/end']);
  }

  public getColor(status_id) {
    switch (status_id) {
      case 1:
        return 'blue'; // กำลังทำ
      case 2:
        return 'chartreuse'; // ผ่านการคัดเลือก
      case 3:
        return 'crimson'; // ไม่ผ่านการคัดเลือก
      case 4:
        return 'darkgoldenrod'; //รอผลดำเนินการ
    }
  }
}
