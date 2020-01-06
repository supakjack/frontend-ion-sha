import { Component, OnInit } from '@angular/core';
import { SessionService } from './../../services/session.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ListPage implements OnInit {

  constructor(public sessionService: SessionService) {}

  ngOnInit() {}
}
