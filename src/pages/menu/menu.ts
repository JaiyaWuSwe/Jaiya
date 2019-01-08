import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav ,App,AlertController} from 'ionic-angular';
import { MenulistPage } from '../menulist/menulist';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { DrungCreatePage } from '../drung-create/drung-create';
import { ProfileCreatePage } from '../profile-create/profile-create';
import { ProfileUpdatePage } from '../profile-update/profile-update';
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
  // Reference to the side menus root nav
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App,
    public storage: Storage,private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.pages = [
      { title: 'กรอกข้อมูล', page: ProfileCreatePage, icon: 'home' },
      { title: 'ผู้ใช้', page: ProfileDisplayPage, icon: 'planet' },
      { title: 'เมนู', page: MenulistPage, icon: 'planet' },
      { title: 'แจ้งเตือน', page: DrungCreatePage, icon: 'planet' },
      { title: 'แก้ไขข้อมูลผู้ใช้', page: ProfileUpdatePage, icon: 'planet' }
      
    ];
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
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

}
