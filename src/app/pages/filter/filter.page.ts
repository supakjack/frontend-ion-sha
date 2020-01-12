import { Component, OnInit } from '@angular/core';
import { NewsService } from './../../services/news.service';
import { SessionService } from './../../services/session.service';
import { LibsService } from './../../services/libs.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss']
})
export class FilterPage implements OnInit {
  public course = '';
  public start = '';
  public end = '';
  public max = '';

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
    }, 500);
  }

  ngOnInit() {
    this.course = null;
    this.start = null;
    this.end = null;
    this.max = null;
    this.onUpdate();
  }

  onUpdate() {
    //this.sessionService.regId
    this.newsService.getInforById(this.sessionService.regId).subscribe(res => {
      console.log(res);
      this.course = res[0].cours_th;
      this.start = res[0].start;
      this.end = res[0].end;
      this.max = res[0].max;
    });
  }

  clickSave() {
    this.sessionService.reState = true;
    this.newsService
      .updateInforById(
        this.sessionService.regId,
        this.start,
        this.end,
        this.max
      )
      .subscribe(res => {
        console.log(res);
        this.sessionService.reState = true;
      });
  }
}
