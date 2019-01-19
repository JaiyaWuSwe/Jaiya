import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");
@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})

export class TestPage {
  public headers = new HttpHeaders().set("Content-Type","application/json");
  lat: any;
  lng: any;
  currentLat: any;
  currentLng: any;
  public current_location;

  hospital: string;
  public base_url = "http://localhost:8080/jaiya/api/";
  // public base_url ='http://172.16.82.153:8080/jaiya/api/';
  
  constructor( public navParams: NavParams
    ,public http : HttpClient,public navCtrl: NavController, ) { 
    

  }

  ionViewDidLoad() {
   
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.LOCATION_HARDWARE).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.LOCATION_HARDWARE)
    // );
    
    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.LOCATION_HARDWARE, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    
 

    let jsonData;
    
    let option = {
      headers: this.headers
    }
    // // Create JSON object from username & email
    let jsObject = { 
               name : ""
                  }
    jsonData = JSON.stringify(jsObject);

    this.http.post(this.base_url+'MapLocation/SearchHospital', jsonData, option)
        .subscribe((data:any) => {  
          // alert("search1");
          if(data.message == true ){ 
            if(data.data){
              // alert("else");
              // var hoslat = data.data.latitude;
              // var hoslng = data.data.longitude;
              // var name = data.data.name;

          
            }else{
              // alert("elseif");
              this.lat = 8.6400539;
              this.lng = 99.8955851;
             var datasearch = data.datasearch;
              Object.keys(datasearch).forEach(key=> {
                // console.log(datasearch[key].name); 

                console.log(datasearch[key].latitude);   
                getDistanceFromLatLonInKm(this.lat,this.lng,datasearch[key].latitude,datasearch[key].longitude,datasearch[key].name);
            });
            
              // alert(hospiallength);
              //   for(index;index<=hospiallength;index++){
              //     alert("index");
              //     getDistanceFromLatLonInKm(this.lat,this.lng,hoslat[index],hoslng[index],name[index]) 
              //   } 
              // }     
            }
          }

        });
        function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2,name) {
          console.log(name);
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
          // return d;
          alert(d);
          if( d> 30){
            console.log(d+" "+name);
            // this.addMarker(lat2,lon2,name);
          }
        }
        
        function deg2rad(deg) {
          return deg * (Math.PI/180)
        }
      }

}