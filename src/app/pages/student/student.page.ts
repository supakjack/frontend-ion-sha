import { Component, OnInit } from '@angular/core';
import { NewsService } from './../../services/news.service';
import { SessionService } from './../../services/session.service';
import { LibsService } from './../../services/libs.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss']
})
export class StudentPage implements OnInit {
  public crouses: any = [];

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
    this.crouses = null;
    this.onCrouses();
  }

  onCrouses() {
    this.crouses = [];
    this.newsService.getOnEdlGroup().subscribe(res => {
      res.forEach((element, index) => {
        this.crouses.push(element);
      });
    });
  }

  clickCourse(id) {
    this.sessionService.reState = true
    this.sessionService.crsId = id;
    this.router.navigate(['/append']);
    console.log("id:"+id)
  }
}
