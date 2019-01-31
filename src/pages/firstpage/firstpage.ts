import { MenulistAdminPage } from './../menulist-admin/menulist-admin';
import { MachineSearchPage } from './../machine-search/machine-search';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { MenuPage } from '../menu/menu';




@Component({
  selector: 'page-firstpage',
  templateUrl: 'firstpage.html'
})
export class FirstpagePage {
  public myDate;
  public userId;
  public role;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.userId= window.localStorage.getItem('userId');
    this.role= window.localStorage.getItem('role');
    if(this.userId !=null || this.userId != undefined){
      if(this.role == "1"){
        this.navCtrl.setRoot(MenulistAdminPage);
      }else{
        this.navCtrl.setRoot(MenuPage);
      }
      
    }
    console.log('ionViewDidLoad Login');
  }
  login() {
    
    this.navCtrl.push(LoginPage, {});
  }

  register() {
    this.navCtrl.push(RegisterPage, {});
  }
 
}
