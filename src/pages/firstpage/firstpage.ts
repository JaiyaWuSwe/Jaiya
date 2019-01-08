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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.userId= window.localStorage.getItem('userId');
    if(this.userId !=null || this.userId != undefined){
      this.navCtrl.setRoot(MenuPage);
    }
    console.log('ionViewDidLoad Login');
  }
  login() {
    this.navCtrl.setRoot(LoginPage);
  }

  register() {
    this.navCtrl.setRoot(RegisterPage);
  }
 
}
