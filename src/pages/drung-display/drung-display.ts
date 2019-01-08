import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';

/**
 * Generated class for the DrungDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");
@Component({
  selector: 'page-drung-display',
  templateUrl: 'drung-display.html',
})
export class DrungDisplayPage {
  formgroup:FormGroup;
    returnMessage = "";
    public headers = new HttpHeaders().set("Content-Type","application/json");
    public time;
    public drug;
    public amount;
    public volume;
    public duration;
    public alert;
    public userId;
    public _id;
    public status = 1;
    public test=[];
    
    
    

    constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public http : HttpClient,
      public formbuilder:FormBuilder
      ) {
        

      
  
        
      this.formgroup = formbuilder.group({
     
        time:['',],
        drug :['',],
        amount  :['',],
        volume: ['',]
      }); 
}
// sendRequest(){

//   let jsonData;
  
//   let option = {
//     headers: this.headers
//   }
//   // // Create JSON object from username & email
//   let jsObject = { time: this.time,
//                   drug: this.drug,
//                   amount: this.amount
                  
//                 }
//   jsonData = JSON.stringify(jsObject);

//   this.http.post('http://localhost:8080/jaiya/api/timetogetpillow/insert', jsonData, option)
//       .subscribe((data:any) => {  
//         console.log(data);
//       });
//     }

  ionViewDidLoad() {
    this.userId= window.localStorage.getItem('userId');
      let jsonData;
      

      let option = {
        headers: this.headers
      }
      let jsObject = { userId : this.userId , status : this.status}
      jsonData = JSON.stringify(jsObject);
      this.http.post('http://localhost:8080/jaiya/api/timetogetpillow/showtimetogetpillow', jsonData, option)
          .subscribe((data:any) => {
          // console.log(data);
          //   let list = data.filter((t)=>t.time);
              this.test = data.data;
              // console.log(data);
              // this.time = data.data.time,
              // this.drug = data.data.drug,
              // this.amount = data.data.amount,
              // this.volume = data.data.volume,
              // this.duration = data.data.duration,
              // this.alert = data.data.alert
            
            
            // console.log(list);
            // console.log(this.data);
          });
    console.log('ionViewDidLoad DrungDisplayPage');
  }

}
