import { MapDisplayPage } from './../map-display/map-display';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';


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
  
  }
  

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad MapSearchPage');
  }

}
