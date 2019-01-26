import { MapSearchPage } from './../map-search/map-search';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,App } from 'ionic-angular';
import { FirstpagePage } from '../firstpage/firstpage';
import { Storage } from '@ionic/storage';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { DrungCreatePage } from '../drung-create/drung-create';
import { ProfileDisplayPage } from '../profile-display/profile-display';
import { DrungHistoryPage } from '../drung-history/drung-history';
import { DrungDisplayPage } from '../drung-display/drung-display';


/**
 * Generated class for the MenulistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menulist',
  templateUrl: 'menulist.html',
})
export class MenulistPage {
 
  public number;
  public headers = new HttpHeaders().set("Content-Type","application/json");
  public userId;
  public firstName;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,
    public http : HttpClient,private alertCtrl: AlertController, public appCtrl: App) {
  }

  
  //  ตั้งค่า
  setting() {
    this.navCtrl.setRoot(FirstpagePage);
  }
  // ตั้งเวลาแจ้งเตือน
  time() {
    this.navCtrl.setRoot(DrungCreatePage);
  }
  // รายการแจ้งเตือน
  display(){
    this.navCtrl.setRoot(DrungDisplayPage);
  }
  // บัญชีผู้ใช้
  contact(){
    // console.log(this.userId);
    this.navCtrl.setRoot(ProfileDisplayPage);
  }
  // ประวัติการกินยา
  document(){
    this.navCtrl.setRoot(DrungHistoryPage);
  }
  // ค้นหาโรงพยาบาล 
  hospital(){
    this.navCtrl.setRoot(MapSearchPage);
  }
  watch(){
    this.navCtrl.setRoot(DrungDisplayPage);
  }
  ionViewDidLoad() {
    
    this.userId = window.localStorage.getItem('userId');
    console.log('ionViewDidLoad PostJson');
  }
  Logout(){
    let alert = this.alertCtrl.create({
      title: 'ลงชื่อออก',
      message: 'ลงชื่อออกสำเร็จ',
      buttons: ['OK']
    });
    alert.present();
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    this.appCtrl.getRootNav().setRoot(FirstpagePage);
  }


  
}
