import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  url = 'http://localhost:3000/form';
  urlApp = 'http://localhost:3000/app';
  urlStudentTab = 'http://localhost:3000/stt';
  urlPro = 'http://localhost:3000/pro';
  apiKey = '';

  constructor(private http: HttpClient) {}
  getPrefixNames() {
    return this.http.get<any[]>(`${this.url}/pf`);
  }
  getProvinces() {
    return this.http.get<any[]>(`${this.url}/pv`);
  }
  getNations() {
    return this.http.get<any[]>(`${this.url}/na`);
  }
  getBloods() {
    return this.http.get<any[]>(`${this.url}/bl`);
  }
  getRelis() {
    return this.http.get<any[]>(`${this.url}/re`);
  }

  addApp(app_code = null, app_sta_id = 1, app_usr_id, app_pro_id, app_reg_id) {
    return this.http.post<any[]>(this.urlApp, {
      app_code: app_code,
      app_sta_id: app_sta_id,
      app_usr_id: app_usr_id,
      app_pro_id: app_pro_id,
      app_reg_id: app_reg_id
    });
  }

  addProfileTab(
    pro_first_th_name,
    pro_last_th_name,
    pro_first_en_name,
    pro_last_en_name,
    pro_id_card,
    pro_race,
    pro_bod,
    pro_nation_id,
    pro_blood_id,
    pro_prefix_id,
    pro_province_id,
    pro_religion_id
  ) {
    return this.http.post<any[]>(this.urlPro, {
      pro_first_th_name: pro_first_th_name,
      pro_last_th_name: pro_last_th_name,
      pro_first_en_name: pro_first_en_name,
      pro_last_en_name: pro_last_en_name,
      pro_id_card: pro_id_card,
      pro_race: pro_race,
      pro_bod: pro_bod,
      pro_nation_id: pro_nation_id,
      pro_blood_id: pro_blood_id,
      pro_prefix_id: pro_prefix_id,
      pro_province_id: pro_province_id,
      pro_religion_id: pro_religion_id
    });
  }

  getLastIdApp(id) {
    console.log('id : ' + id);
    return this.http.get<any[]>(`${this.urlApp}/last/${id}`);
  }

  getLastIdPro() {
    return this.http.get<any[]>(`${this.urlPro}/last`);
  }

  addStudentTab(stt_pro_id, stt_app_id) {
    return this.http.post<any[]>(this.urlStudentTab, {
      stt_pro_id: stt_pro_id,
      stt_app_id: stt_app_id
    });
  }

  updateProfileTab(
    pro_first_th_name,
    pro_last_th_name,
    pro_first_en_name,
    pro_last_en_name,
    pro_id_card,
    pro_race,
    pro_bod,
    pro_nation_id,
    pro_blood_id,
    pro_prefix_id,
    pro_province_id,
    pro_religion_id,
    id
  ) {
    return this.http.put<any[]>(`${this.urlPro}/${id}`, {
      pro_first_th_name: pro_first_th_name,
      pro_last_th_name: pro_last_th_name,
      pro_first_en_name: pro_first_en_name,
      pro_last_en_name: pro_last_en_name,
      pro_id_card: pro_id_card,
      pro_race: pro_race,
      pro_bod: pro_bod,
      pro_nation_id: pro_nation_id,
      pro_blood_id: pro_blood_id,
      pro_prefix_id: pro_prefix_id,
      pro_province_id: pro_province_id,
      pro_religion_id: pro_religion_id
    });
  }
}
