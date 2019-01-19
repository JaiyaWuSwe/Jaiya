import { DrungDisplayPage } from './../drung-display/drung-display';
import { Component } from '@angular/core';
import {NavController, NavParams,Platform, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { LocalNotifications } from '@ionic-native/local-notifications';


/**
 * Generated class for the DrungCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");
@Component({
  selector: 'page-drung-create',
  templateUrl: 'drung-create.html',
})
export class DrungCreatePage {
  notifyTime: any;
    notifications: any[] = [];
    days: any[];
    chosenHours: number;
    chosenMinutes: number;

  formgroup:FormGroup;
    returnMessage = "";
    public headers = new HttpHeaders().set("Content-Type","application/json");
     time : number;
    public drug;
    public amount;
    public volume;
    public duration;
    public alert;
    public userId;
    
    // public base_url = "http://localhost:8080/jaiya/api/";
    public base_url ='http://172.16.82.153:8080/jaiya/api/';
    data = { time:'' };
  constructor(public navCtrl: NavController, 
        public navParams: NavParams,
        public http : HttpClient,
        public formbuilder:FormBuilder,
        private alertCtrl: AlertController,
        public platform: Platform,
        private localNotifications: LocalNotifications
        ) {
          

        
        this.formgroup = formbuilder.group({
          notifyTime:['',Validators.required],
          // drug :['',Validators.required],
          // amount  :['',],
          // volume : ['',],
          // duration : ['',Validators.required],
          // alert :['',]
        }); 

        
  }
  validation_messages = {
    'notifyTime': [
      { type: 'required', message: 'กรอกเวลา' }
    ],
    // 'drug':[
    //   {type : 'required', message : 'กรอกยา'}
    // ],
    // 'duration':[
    //   {type: 'requried', message : 'เลือกช่วงเวลา'}
    // ]
  }

  

  sendRequest(){

    let jsonData;
    
    let option = {
      headers: this.headers
    }
    // // Create JSON object from username & email
    let jsObject = { 
        userId: this.userId, 
        time: this.notifyTime, 
        drug:this.drug,
        amount:this.amount,
        duration:this.duration
                  }
    jsonData = JSON.stringify(jsObject);
    this.http.post(this.base_url+'timetogetpillow/insert', jsonData, option)
            .subscribe((data:any) => {  

              console.log(data);
              if(data.message == true  ){ 
                let alert = this.alertCtrl.create({
                  title: 'บันทึก',
                  message: 'บันทึกสำเร็จ',
                  buttons: ['ตกลง']
                });
                alert.present();
                this.navCtrl.setRoot(DrungDisplayPage);
              
              }
              else{
                
                let alert = this.alertCtrl.create({
                  title: 'บันทึก',
                  message: 'บันทึกไม่สำเร็จ',
                  buttons: ['ตกลง']
                });
                alert.present();
                this.navCtrl.setRoot(DrungDisplayPage);
              } 
            });
          
            // this.notifyTime = "1.00";
            var hourStart = new Date().getHours();  //a
            var minunStart = new Date().getMinutes(); //b
            var hour = this.notifyTime.substr(0,2); //c
            var minus = this.notifyTime.substr(3); //d  
            
            console.log(minunStart);
            
            console.log(parseFloat(hour));
            if(hour == hourStart){
              if(parseInt(minus)>minunStart ){
                
                this.time = ((parseFloat(minus)-minunStart)*60000);
                console.log("a1");
              }else if (minunStart>parseFloat(minus)){
                console.log("b1");
                this.time = (((parseInt(minus) + 60) - minunStart)*60000)+Math.abs(((parseInt(hour)-hourStart)+(82800000)));
                
              }
            }
            else if(parseInt(minus)>minunStart ){
              // this.time = (3600000-(minus*60000))+((hour+24-hourStart)*3600000);
              this.time = ((parseFloat(minus)-minunStart)*60000)+Math.abs(parseInt(hour)-hourStart+(86400000));
              console.log("a");
            }else if (minunStart>parseFloat(minus)){
              console.log("b");
              this.time = (((parseInt(minus) + 60)  - minunStart)*60000)+Math.abs(((parseInt(hour)-hourStart)+(82800000)));
              
            }
            
            // if(hourStart<hour){
            //   this.time = ((hour*3600000 )+(minus*60000)) - ((hourStart*3600000 )+(minunStart*60000));
            //   console.log("iiii");
            // }else if(hourStart>hour){
            //   if(minunStart<minus){
            //     this.time = (3600000-minus*60000)+minunStart*60000 + ((hour*3600000 )+(24*3600000 ))-hourStart*3600000 ;
            //     console.log("a");
            //   }else if(minunStart>minus){
            //     this.time = ((minunStart+minus)*60000)+(((hour+24)-hourStart)*3600000);
            //     let a =((minunStart+minus)*60000);
            //     let b =(((hour+24)-hourStart)*3600000);
            //     console.log("a"+a);
            //     console.log("b"+b);
            //   }else{
            //     // his.time = (((hour*3600000 )+(24*3600000 ))-hourStart*3600000 )+3600000 ;
            //   } 
            // }
            // else{
            //   if(minunStart<=minus){
            //     this.time = ((minus*60000)-3600000)+minunStart*60000;
                
            //   }
            //   console.log("solution 3");
            // }
            
            // // let minus = new Date().getMinutes();
            console.log("Current hour ", this.time);
            // console.log("Current hour ", hour);
            // console.log("Current minus ", minus);
            // console.log("Current hourStart ",hourStart) 
            // console.log("Current minunStart ",minunStart) 

      this.localNotifications.schedule({
          text: "ชื่ออยา"+this.drug+"เวลา"+this.notifyTime,
          // trigger: {at: new Date(new Date().getTime()+3600)},
           trigger: {at: new Date(new Date().getTime()+this.time)},
          led: 'FF0000',
          sound: 'file://assets/sound/Atom.mp3'
      });
      
    }
    ionViewDidLoad() {
      this.userId= window.localStorage.getItem('userId');
      console.log('ionViewDidLoad ProfileCreatePage');
    }
}
