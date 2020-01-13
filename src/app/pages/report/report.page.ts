import { Component, OnInit } from '@angular/core';
import { NewsService } from './../../services/news.service';
import { SessionService } from './../../services/session.service';
import { LibsService } from './../../services/libs.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss']
})
export class ReportPage implements OnInit {
  public barsLaels: any;
  public barsMaxs: any;
  public barsNows: any;

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
    this.onBar();
  }

  onBar() {
    this.barsLaels = [];
    this.barsMaxs = [];
    this.barsNows = [];
    this.newsService.getBarReport().subscribe(res => {
      res.forEach((element, index) => {
        console.log(element);
        console.log(element.label);
        this.barsLaels.push(element.label);
        this.barsMaxs.push(element.max);
        this.barsNows.push(element.now);
      });
      this.mycharts();
      this.barcharts();
    });
  }

  back() {
    if (this.sessionService.status == '1') {
      this.router.navigate(['/list']);
    } else if (this.sessionService.status == '2') {
      this.router.navigate(['/admin']);
    }
  }

  mycharts() {
    var ctx = (<any>document.getElementById('canvas-chart-pie')).getContext(
      '2d'
    );
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'pie',

      // The data for our dataset
      data: {
        labels: this.barsLaels,
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            data: this.barsNows,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: 'black',
            boxWidth: 20,
            padding: 20
          }
        },
        title: {
          display: true,
          text: 'กราฟโดนัทแสดงจำนวนนักเรียนที่สมัครตามหลักสูตรที่เปิดสอน'
        }
      }
    });
  }

  barcharts() {
    var ctx = (<any>document.getElementById('canvas-chart-bar')).getContext(
      '2d'
    );
    var barChartData = {
      labels: this.barsLaels,
      datasets: [
        {
          label: 'จำนวนสมัคร',
          backgroundColor: 'pink',
          borderColor: 'red',
          borderWidth: 1,
          data: this.barsMaxs
        },
        {
          label: 'จำนวนรับสมัคร',
          backgroundColor: 'lightblue',
          borderColor: 'blue',
          borderWidth: 1,
          data: this.barsNows
        }
      ]
    };

    var chartOptions = {
      responsive: true,
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text:
          'กราฟแท่งแสดงจำนวนนักเรียนที่รับสมัครต่อจำนวนที่สมัครตามหลักสูตรที่เปิดสอน'
      },
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              min: 0,
              max: 80,
              stepSize: 40
            }
          }
        ]
      }
    };

    var chart = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: chartOptions
    });
    // ctx.height = 1500;
  }
}
