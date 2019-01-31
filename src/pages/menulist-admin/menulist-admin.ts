import { FirstpagePage } from './../firstpage/firstpage';
import { MachineSearchPage } from './../machine-search/machine-search';
import { HelpPage } from './../help/help';
import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,App,AlertController,Nav} from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MenulistAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-menulist-admin',
  templateUrl: 'menulist-admin.html',
})
export class MenulistAdminPage {
  rootPage: any;
  pages = [];
  public userId;
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController,public storage: Storage, public navParams: NavParams, public appCtrl: App,private alertCtrl: AlertController ) {
  }

   //  ตั้งค่า
   setting() {
    this.navCtrl.setRoot(FirstpagePage);
  }
  // ตั้งเวลาแจ้งเตือน
  // time() {
  //   this.navCtrl.setRoot(DrungCreatePage);
  // }
  // // รายการแจ้งเตือน
  // display(){
  //   this.navCtrl.setRoot(DrungDisplayPage);
  // }
  // // บัญชีผู้ใช้
  // contact(){
  //   // console.log(this.userId);
  //   this.navCtrl.setRoot(ProfileDisplayPage);
  // }
  // // ประวัติการกินยา
  // document(){
  //   this.navCtrl.setRoot(DrungHistoryPage);
  // }
  // // ค้นหาโรงพยาบาล 
  // hospital(){
  //   this.navCtrl.setRoot(MapSearchPage);
  // }
  watch(){
    this.navCtrl.push(MachineSearchPage, {
    });
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

  argreement(){
    this.navCtrl.push(HelpPage, {
    });
  }
}
