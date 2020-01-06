import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss']
})
export class ExportPage implements OnInit {
  constructor() {
    this.wrap();
  }

  ngOnInit() {}

  wrap() {
    location.href =
      'https://10.80.39.17/TSP60/Municipality/index.php/sha/cycle3/frontend/Register_students_report/report_01';
  }
}
