import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.mycharts();
    this.barcharts();
  }

  mycharts() {
    var ctx = (<any>document.getElementById('canvas-chart-pie')).getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'pie',

      // The data for our dataset
      data: {
        labels: ["หลักสูตรนานาชาติ", "หลักสูตรสองภาษา", "หลักสูตรภาษอังกฤษ", "หลักสูตรภาษไทย",],
        datasets: [{
          label: "My First dataset",
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          data: [42.1, 26.3, 21.1, 10.5,],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: "black",
            boxWidth: 20,
            padding: 20
          }
        }
      },
      


    });
  }

  barcharts() {
    var ctx = (<any>document.getElementById('canvas-chart-bar')).getContext('2d');
    var barChartData = {
      labels: [
        "หลักสูตรภาษไทย",
        "หลักสูตรภาษอังกฤษ",
        "หลักสูตรสองภาษา",
        "หลักสูตรนานาชาติ",
      ],
      datasets: [
        {
          label: "จำนวนสมัคร",
          backgroundColor: "pink",
          borderColor: "red",
          borderWidth: 1,
          data: [55, 35, 70, 40,]
        },
        {
          label: "จำนวนรับสมัคร",
          backgroundColor: "lightblue",
          borderColor: "blue",
          borderWidth: 1,
          data: [45, 15, 65, 42,]
        },
      ]
    };

    var chartOptions = {
      responsive: true,
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "กราฟแท่งแสดงจำนวนนักเรียนชั้นเตรียมอนุบาลทุกหลักสูตรในปีการศึกษา 2561"
      },
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            min: 0,
            max: 80,
            stepSize: 40
          }
        }]
      }
    }

    var chart = new Chart(ctx, {
      type: "bar",
      data: barChartData,
      options: chartOptions,
    })
    // ctx.height = 1500;

  }

}
