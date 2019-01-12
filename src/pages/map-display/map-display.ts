import { Component } from '@angular/core';
import { IonicPage, ToastController ,NavParams, NavController, AlertController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker,
  GoogleMapsEvent
} from '@ionic-native/google-maps';
import { a } from '@angular/core/src/render3';



/**
 * Generated class for the MapDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");
@IonicPage()
@Component({
  selector: 'page-map-display',
  templateUrl: 'map-display.html',
})

export class MapDisplayPage {
  public headers = new HttpHeaders().set("Content-Type","application/json");
  lat: any;
  lng: any;
  currentLat: any;
  currentLng: any;
  public current_location;
  map: GoogleMap;
  hospital: string;
  // public base_url ='http://localhost:8080/jaiya/api';
  public base_url ='http://172.16.82.195:8080/jaiya/api/';
  
  constructor(private geolocation: Geolocation ,  public toastCtrl: ToastController, public navParams: NavParams
    ,public http : HttpClient,public navCtrl: NavController, private alertCtrl: AlertController) { 
    this.hospital = navParams.get('data');

  }

  ionViewDidLoad() {
   
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.LOCATION_HARDWARE).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.LOCATION_HARDWARE)
    // );
    
    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.LOCATION_HARDWARE, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    this.geolocation.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;

      let location='lat '+pos.coords.latitude+' lang '+pos.coords.longitude;
      let toast = this.toastCtrl.create({
        message: this.lat,
        duration: 3000,
      });
      toast.present();
      if(toast.present()){
        this.loadMap();
        this.sendRequest();
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
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
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat:this.lat,
        lng:this.lng
      }
    });
    // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //   alert('clicked');
    // });
  }
  
  addMarker(hoslat,hoslng,name){
    let marker1: Marker = this.map.addMarkerSync({
      title: name,
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat:hoslat,
        lng:hoslng
      }
    });
    alert(hoslat);
    // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //   alert('clicked');
    // });
  }

  sendRequest(){

    let jsonData;
    
    let option = {
      headers: this.headers
    }
    // // Create JSON object from username & email
    let jsObject = { 
               name : this.hospital
                  }
    jsonData = JSON.stringify(jsObject);

    this.http.post(this.base_url+'MapLocation/SearchHospital', jsonData, option)
        .subscribe((data:any) => {  
          alert("search1");
          console.log(data);
          if(data.message == true  ){ 
            alert("search2");
          var hoslat = data.data.latitude;
          var hoslng = data.data.longitude;
          var name = data.data.name;
          alert(name);
          this.addMarker(hoslat,hoslng,name);
          }
          else{
            alert(name);
           
          } 
        });

  }

}
