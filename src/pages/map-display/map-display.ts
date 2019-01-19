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
  // public base_url ='http://localhost:8080/jaiya/api/';
  public base_url ='http://172.16.82.72:8080/jaiya/api/';
  
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
        message: "กำลังดำเนินการ",
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
      title: 'ตำแหน่งของฉัน',
      icon: 'green',
      animation: 'DROP',
      position: {
        lat:this.lat,
        lng:this.lng
      }
    });
    
  }
  
  addMarker(hoslat,hoslng,name,phone){
    let marker1: Marker = this.map.addMarkerSync({
      title: name+" เบอร์โทรศัพท์ "+ phone,
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat:hoslat,
        lng:hoslng
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
               name : this.hospital
                  }
    jsonData = JSON.stringify(jsObject);

    this.http.post(this.base_url+'MapLocation/SearchHospital', jsonData, option)
        .subscribe((data:any) => {  
          if(data.message == true ){ 
            if(data.data){
              var hoslat = data.data.latitude;
              var hoslng = data.data.longitude;
              var name = data.data.name;
              var phone = data.data.phone;
              this.addMarker(hoslat,hoslng,name, phone);
            }else{
              var datasearch = data.datasearch;
              Object.keys(datasearch).forEach(key=> {
              
               var d = getDistanceFromLatLonInKm(this.lat,this.lng,datasearch[key].latitude,datasearch[key].longitude);
                
               if( d <= 50){
                this.addMarkerred(datasearch[key].latitude,datasearch[key].longitude,datasearch[key].name,d,datasearch[key].phone);
               }
            });
            
            }
          }

        });
        function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
          var R = 6371; // Radius of the earth in km
          var dLat = deg2rad(lat2-lat1);  // deg2rad below
          var dLon = deg2rad(lon2-lon1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; // Distance in km
          return d;
        }
        
        function deg2rad(deg) {
          return deg * (Math.PI/180)
        }
      }


      addMarkerred(hoslat,hoslng,name,d,phone){
        let marker2: Marker = this.map.addMarkerSync({
          title: name +" เบอร์โทรศัพท์: "+phone+"  ระยะห่าง : " + d + "กิโลเมตร",
          icon: 'red',
          animation: 'DROP',
          position: {
            lat:hoslat,
            lng:hoslng
          }
        });

  }
}
