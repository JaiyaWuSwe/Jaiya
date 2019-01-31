import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker,
  
} from '@ionic-native/google-maps';


/**
 * Generated class for the MachineDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");
@IonicPage()
@Component({
  selector: 'page-machine-display',
  templateUrl: 'machine-display.html',
})
export class MachineDisplayPage {

  public headers = new HttpHeaders().set("Content-Type","application/json");
  lat: any;
  lng: any;
  currentLat: any;
  currentLng: any;
  public current_location;
  map: GoogleMap;
  // hospital: string;
  name: string;
  // public base_url ='http://localhost:8080/jaiya/api/';
  // public base_url ='http://172.16.240.209/jaiya/api/';
  public base_url ='http://202.183.198.114:8080/jaiya/api/';
  
  constructor(private geolocation: Geolocation ,  
    public toastCtrl: ToastController, 
    public navParams: NavParams
    ,public http : HttpClient,
    public navCtrl: NavController,
     ) { 
    this.name = navParams.get('data');
     }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      let location='lat '+pos.coords.latitude+' lang '+pos.coords.longitude;
      let toast = this.toastCtrl.create({
        message: "กำลังดำเนินการ.........",
        duration: 3000,
      });
      toast.present();
      if(toast.present()){
        this.loadMap();
        this.sendRequest();
      }
    })
      
    console.log('ionViewDidLoad MachineDisplayPage');
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
         target:{
           lat:this.lat,
           lng:this.lng
         },
         zoom: 12,
         tilt: 30
       }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    let marker: Marker = this.map.addMarkerSync({
      title: name,
      icon: 'green',
      animation: 'DROP',
      position: {
        lat:this.lat,
        lng:this.lng
      }
    });
  }
    
  

  sendRequest(){

    
    let jsonData;
    
    let option = {
      headers: this.headers
    }
    // // Create JSON object from username & email
    let jsObject = { 
               name : this.name
                  }
    jsonData = JSON.stringify(jsObject);
    this.http.post(this.base_url+'machine/showallmachine', jsonData, option)
        .subscribe((data:any) => { 
          if(data.message == true ){ 

              var hoslat = data.data.latitude;
              var hoslng = data.data.longitude;
              var name = data.data.name;
              
              
                let marker1: Marker = this.map.addMarkerSync({
                  title: name,
                  icon: 'blue',
                  animation: 'DROP',
                  position: {
                    lat:hoslat,
                    lng:hoslng
                  }
                });
              

              }
        });
      
      }
  
  
  
  }

  


