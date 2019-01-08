import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private localNotifications: LocalNotifications) {

  }

  test(){
    this.localNotifications.schedule({
        text: 'เบสไปไหน ไปกับใคร',
        trigger: {at: new Date(new Date().getTime() + 5000)},
        led: 'FF0000',
        sound: 'file://assets/sound/The.mp3'
    });
  }

}
