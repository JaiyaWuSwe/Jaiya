import { MapDisplayPage } from './../map-display/map-display';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

/**
 * Generated class for the MapSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map-search',
  templateUrl: 'map-search.html',
})
export class MapSearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
  }

  goTo(hospital) {
    hospital = hospital || 'No hospital Entered';

    this.navCtrl.push(MapDisplayPage, {
      data: hospital
    });
  //   let toast = this.toastCtrl.create({
  //     message: color,
  //     duration: 500,
  //   });
  //   toast.present()
  }
  

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad MapSearchPage');
  }

}
