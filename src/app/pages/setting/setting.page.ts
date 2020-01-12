import { Component, OnInit } from '@angular/core';
import { NewsService } from './../../services/news.service';
import { SessionService } from './../../services/session.service';
import { LibsService } from './../../services/libs.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss']
})
export class SettingPage implements OnInit {
  public registers: any = [];
  constructor(
    private newsService: NewsService,
    private sessionService: SessionService,
    private libsService: LibsService,
    private router: Router
  ) {
    setInterval(() => {
      if (this.sessionService.reState) {
        this.ngOnInit();
        this.sessionService.reState = false;
      }
    }, 1000);
  }

  ngOnInit() {
    this.registers = null;
    this.getRegister();
  }

  public getRegister() {
    this.registers = [];
    this.newsService.getAllOpen().subscribe(res => {
      res.forEach((element, index) => {
        var date_start = element.start.split('-');
        element.start =
          date_start[2] +
          ' ' +
          this.libsService.getThMm(date_start[1]) +
          ' ' +
          this.libsService.getThYyyy(date_start[0]);

        var date_end = element.end.split('-');
        element.end =
          date_end[2] +
          ' ' +
          this.libsService.getThMm(date_end[1]) +
          ' ' +
          this.libsService.getThYyyy(date_end[0]);
        this.registers.push(element);
      });
      console.log(this.registers);
    });
  }

  /**
   * clickEdit
   */
  public clickEdit(id) {
    this.sessionService.regId = id;
    this.router.navigate(['/filter']);
  }
}
