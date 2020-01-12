import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibsService {
  constructor() {}

  public getThMm(mm) {
    switch (Number(mm)) {
      case 1:
        return 'มกราคม'; // กำลังทำ
      case 2:
        return 'กุมภาพันธ์'; // ผ่านการคัดเลือก
      case 3:
        return 'มีนาคม'; // ไม่ผ่านการคัดเลือก
      case 4:
        return 'เมษายน'; //รอผลดำเนินการ
      case 5:
        return 'พฤษภาคม '; //รอผลดำเนินการ
      case 6:
        return 'มิถุนายน'; //รอผลดำเนินการ
      case 7:
        return 'กรกฎาคม'; //รอผลดำเนินการ
      case 8:
        return 'สิงหาคม'; //รอผลดำเนินการ
      case 9:
        return 'กันยายน'; //รอผลดำเนินการ
      case 10:
        return 'ตุลาคม '; //รอผลดำเนินการ
      case 11:
        return 'พฤศจิกายน'; //รอผลดำเนินการ
      case 12:
        return 'ธันวาคม'; //รอผลดำเนินการ
    }
  }

  public getThYyyy(yyyy) {
    return Number(yyyy) + 543;
  }
}
