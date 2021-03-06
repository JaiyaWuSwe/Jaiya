import { MachineSearchPage } from './../machine-search/machine-search';
import { HelpPage } from './../help/help';
import { MapSearchPage } from './../map-search/map-search';
import { DrungHistoryPage } from './../drung-history/drung-history';
import { DrungDisplayPage } from './../drung-display/drung-display';
import { FirstpagePage } from './../firstpage/firstpage';
import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav ,App,AlertController} from 'ionic-angular';
import { MenulistPage } from '../menulist/menulist';
import { Storage } from '@ionic/storage';

import { DrungCreatePage } from '../drung-create/drung-create';

import { ProfileDisplayPage } from '../profile-display/profile-display';



/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage: any;
  pages = [];
  public role;
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App,
    public storage: Storage,private alertCtrl: AlertController ) {
  }
  
  ionViewWillEnter() {
    this.role= window.localStorage.getItem('role');
    if(this.role == "1"){
      this.pages = [
        { title: 'แสดงสถานะตู้ยา', page: MachineSearchPage, icon: 'ios-clipboard-outline' },
        { title: 'ข้อตกลงในการใช้ซอฟต์แวร์', page: HelpPage, icon: 'planet' },

      ];
    }else{
      this.pages = [
        { title: 'หน้าหลัก', page: MenulistPage, icon: 'home' },
        { title: 'บัญชีผู้ใช้', page: ProfileDisplayPage, icon: 'home' },
        { title: 'ตั้งเวลากินยา', page: DrungCreatePage, icon: 'ios-alarm-outline' },
        { title: 'ดูสถานะยา', page: DrungDisplayPage, icon: 'ios-alert-outline' },
        { title: 'ประวัติการกินยา', page: DrungHistoryPage, icon: 'ios-clipboard-outline' },
        { title: 'ค้นหาโรงพยาบาล', page: MapSearchPage, icon: 'planet' },
        { title: 'ข้อตกลงในการใช้ซอฟต์แวร์', page: HelpPage, icon: 'planet' },
        
        
      ];
    }
    
    this.openPage(MenulistPage);
  }

  openPage(page) {
    this.nav.setRoot(page);
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
