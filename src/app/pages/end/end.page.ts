import { Component, OnInit } from '@angular/core';
import { NewsService } from './../../services/news.service';
import { SessionService } from './../../services/session.service';
import { ListService } from './../../services/list.service';
import { LibsService } from './../../services/libs.service';
import { FormService } from './../../services/form.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-end',
  templateUrl: './end.page.html',
  styleUrls: ['./end.page.scss']
})
export class EndPage implements OnInit {
  public newsOpens: any = [];
  public prefixNames: any = [];
  public provinces: any = [];
  public nations: any = [];
  public bloods: any = [];
  public relis: any = [];

  public regId; //สมัครหลักสูตร
  public pfId; // คำนำหน้าชื่อ
  public cardId; // บัตรประจำตัวประชาชน
  public fNameTh; // ชื่อจริงไทย
  public lNameTh; // นามสกุลไทย
  public fNameEn; // ชื่อจริงอังกิด
  public lNameEn; // นามสกุลังกิด
  public pvId; // จังหวัด
  public naId; // สันชาด
  public ra; // เชือชาด
  public bl; // กรุปเลือด
  public re; // ศาสนา
  public bod; // วันเกิด

  public lastAppId: any;
  public lastProId: any;

  public pro_stt_id: any;

  constructor(
    private listService: ListService,
    private newsService: NewsService,
    private sessionService: SessionService,
    private libsService: LibsService,
    private formService: FormService,
    public alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.newsOpens = null;
    this.prefixNames = null;
    this.provinces = null;
    this.nations = null;
    this.bloods = null;
    this.relis = null;

    // string only
    this.regId = '3'; //สมัครหลักสูตร
    this.pfId = '1'; // คำนำหน้าชื่อ
    this.cardId = '1706602154978'; // บัตรประจำตัวประชาชน
    this.fNameTh = 'วรกัน'; // ชื่อจริงไทย
    this.lNameTh = 'ทีวี'; // นามสกุลไทย
    this.fNameEn = 'woragun'; // ชื่อจริงอังกิด
    this.lNameEn = 'Tv'; // นามสกุลังกิด
    this.pvId = '1'; // จังหวัด
    this.naId = '1'; // สันชาด
    this.ra = 'ไทย-รัฐเซีย'; // เชือชาด
    this.bl = '1'; // กรุปเลือด
    this.re = '1'; // ศาสนา
    this.bod = '2020-12-30'; // วันเกิด

    this.onNewsOpens();
    this.onPrefixNames();
    this.onProvinces();
    this.onNations();
    this.onBloods();
    this.onRelis();

    setInterval(() => {
      if (this.sessionService.editTab) {
        this.resumeTab1();
      }
    }, 1000);
  }

  public next() {
    if (this.sessionService.status == '1') {
      if (this.sessionService.appId) {
        this.updateStudentForm();
        this.sessionService.reState = true;
        this.router.navigate(['/list']);
      } else {
        this.sessionService.reState = true;
        this.addStudentForm();
        this.router.navigate(['/list']);
      }
    } else if (this.sessionService.status == '2') {
      this.sessionService.reState = true;
      this.addStudentForm();
      this.router.navigate(['/admin']);
    }
  }

  public btnBack() {
    this.sessionService.reState = true;
    if (this.sessionService.status == '1') {
      this.router.navigate(['/list']);
    } else if (this.sessionService.status == '2') {
      this.router.navigate(['/admin']);
    }
  }

  async addStudentAlert() {
    const alert = await this.alertController.create({
      header: 'เพิ่มใบสมัครสำเร็จ',
      message: '"ข้อมูลนักเรียนถูกเพิ่มแล้ว"',
      buttons: ['ตกลง']
    });

    await alert.present();
  }

  async updateStudentAlert() {
    const alert = await this.alertController.create({
      header: 'อัพเดทใบสมัครสำเร็จ',
      message: '"ข้อมูลนักเรียนถูกอัพเดทแล้ว"',
      buttons: ['ตกลง']
    });

    await alert.present();
  }

  public logRegId() {
    console.log(this.regId);
  }

  public resumeTab1() {
    this.sessionService.editTab = false;
    this.listService
      .getAppTab1ById(this.sessionService.appId)
      .subscribe(res => {
        console.log(res);
        this.fNameTh = res[0].pro_stt_first_th_name;
        this.lNameTh = res[0].pro_stt_last_th_name;
        this.fNameEn = res[0].pro_stt_first_en_name;
        this.lNameEn = res[0].pro_stt_last_en_name;
        this.cardId = res[0].pro_stt_id_card;
        this.ra = res[0].pro_stt_race;
        this.bod = res[0].pro_stt_bod;
        this.naId = res[0].pro_stt_nation_id;
        this.bl = res[0].pro_stt_blood_id;
        this.pfId = res[0].pro_stt_prefix_id;
        this.pvId = res[0].pro_stt_pv_id;
        this.re = res[0].pro_stt_reli_id;
        this.pro_stt_id = res[0].pro_stt_id;
      });
  }

  public updateStudentForm() {
    this.formService
      .updateProfileTab(
        this.fNameTh,
        this.lNameTh,
        this.fNameEn,
        this.lNameEn,
        this.cardId,
        this.ra,
        this.bod,
        this.naId,
        this.bl,
        this.pfId,
        this.pvId,
        this.re,
        this.pro_stt_id
      )
      .subscribe(res => {
        this.updateStudentAlert();
        console.log(res);
      });
  }

  public addStudentForm() {
    this.formService
      .addApp(null, 1, this.sessionService.userId, 8, this.regId)
      .subscribe(res => {
        this.formService
          .addProfileTab(
            this.fNameTh,
            this.lNameTh,
            this.fNameEn,
            this.lNameEn,
            this.cardId,
            this.ra,
            this.bod,
            this.naId,
            this.bl,
            this.pfId,
            this.pvId,
            this.re
          )
          .subscribe(resS => {
            console.log(resS);
            this.formService
              .getLastIdApp(this.sessionService.userId)
              .subscribe(resLa => {
                console.log(resLa);
                this.lastAppId = resLa[0].last_id;
                this.formService.getLastIdPro().subscribe(resLp => {
                  console.log(resLp);
                  this.lastProId = resLp[0].last_id;
                  this.formService
                    .addStudentTab(this.lastProId, this.lastAppId)
                    .subscribe(resSt => {
                      console.log(resSt);
                      this.listService
                        .addCountReg(this.regId)
                        .subscribe(resAd => {
                          console.log(resAd);
                        });
                    });
                });
              });
          });
        console.log(res);
        this.addStudentAlert();
      });
  }

  public onNewsOpens() {
    this.newsOpens = [];
    this.newsService.getAllOpen().subscribe(result => {
      result.forEach((element, index) => {
        this.newsOpens.push(element);
        // console.log(element);
      });
    });
    console.log(this.newsOpens);
  }

  public onPrefixNames() {
    this.prefixNames = [];
    this.formService.getPrefixNames().subscribe(result => {
      result.forEach((element, index) => {
        this.prefixNames.push(element);
        // console.log(element);
      });
      this.prefixNames.length = 5;
    });
    console.log(this.prefixNames);
  }

  public onProvinces() {
    this.provinces = [];
    this.formService.getProvinces().subscribe(result => {
      result.forEach((element, index) => {
        this.provinces.push(element);
        // console.log(element);
      });
    });
    console.log(this.provinces);
  }

  public onNations() {
    this.nations = [];
    this.formService.getNations().subscribe(result => {
      result.forEach((element, index) => {
        this.nations.push(element);
        // console.log(element);
      });
    });
    console.log(this.nations);
  }

  public onBloods() {
    this.bloods = [];
    this.formService.getBloods().subscribe(result => {
      result.forEach((element, index) => {
        this.bloods.push(element);
        // console.log(element);
      });
    });
    console.log(this.bloods);
  }

  public onRelis() {
    this.relis = [];
    this.formService.getRelis().subscribe(result => {
      result.forEach((element, index) => {
        this.relis.push(element);
        // console.log(element);
      });
    });
    console.log(this.relis);
  }
}
