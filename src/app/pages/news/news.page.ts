import { Component, OnInit } from '@angular/core';
import { NewsService } from './../../services/news.service';
import { SessionService } from './../../services/session.service';
import { LibsService } from './../../services/libs.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss']
})
export class NewsPage implements OnInit {
  public headNews: any = [];
  public bodyNews: any = [];
  public buttonNews: any=[];

  constructor(
    private newsService: NewsService,
    private sessionService: SessionService,
    private libsService: LibsService
  ) {}

  ngOnInit() {
    this.headNews = null;
    this.bodyNews = null;
    this.getHeadNews();
  }

  public getHeadNews() {
    this.headNews = [];
    this.bodyNews = [];
    this.newsService.getAllGoup().subscribe(result => {
      result.forEach((element, index) => {
        this.headNews.push(element);
        this.buttonNews[index] = false;
        console.log(element);
        this.bodyNews[index] = [];
        // this.bodyNews[index][0] = element.id; // head_id , index 0 define type register
        console.log(this.bodyNews);
        this.getBodyNews();
      });
    });
  }

  public btnToggle(index){
    this.buttonNews[index] = !this.buttonNews[index] 
  }

  public getBodyNews() {
    this.headNews.forEach((element, indexHead) => {
      this.newsService.getGoupById(element.id).subscribe(result => {
        result.forEach((element, indexBody) => {
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
          this.bodyNews[indexHead].push(element); // body_by_head
        });
      });
    });
    console.log(this.bodyNews);
  }
}
