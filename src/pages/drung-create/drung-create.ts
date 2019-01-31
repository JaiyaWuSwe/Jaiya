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
    public alertid;
    public userId;
    public alertAgain;
   public date = "date";
    
    // public base_url = "http://localhost:8080/jaiya/api/";
       public base_url ='http://202.183.198.114:8080/jaiya/api/';
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
          drug :['',Validators.required],
          duration : ['',],
          // alert :['',]
        }); 

        
  }
  validation_messages = {
    'notifyTime': [
      { type: 'required', message: 'กรอกเวลา' }
    ],
    'drug':[
      {type : 'required', message : 'กรอกยา'}
    ],
    'duration':[
      {type: 'requried', message : 'เลือกช่วงเวลา'}
    ]
  }

  

  sendRequest(){
    var hourStart = new Date().getHours();  //a
    var minunStart = new Date().getMinutes(); //b
    var secound = new Date().getSeconds();
    var hour = this.notifyTime.substr(0,2); //c
    var minus = this.notifyTime.substr(3); //d  
    this.alertid = new Date();
    let jsonData;
    
    let option = {
      headers: this.headers
    }
    // // Create JSON object from username & email
    let jsObject = { 
      alertid:this.alertid,
        userId: this.userId, 
        time: this.notifyTime, 
        drug:this.drug,
        amount:this.amount,
        duration:this.duration,
        date:this.date
                  }
    jsonData = JSON.stringify(jsObject);
    this.http.post(this.base_url+'timetogetpillow/insert', jsonData, option)
            .subscribe((data:any) => {  
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
 
 
            if(hour == hourStart){
              if(parseInt(minus)>minunStart ){
                
                this.time = ((parseFloat(minus)-minunStart)*60000)-(secound*1000);

              }else if (minunStart>parseFloat(minus)){

                this.time = (((parseInt(minus) + 60) - minunStart)*60000)+Math.abs(((parseInt(hour)-hourStart)+(82800000)))-(secound*1000);
                
              }
            }
            else if(parseInt(minus)>minunStart ){

              this.time = ((parseFloat(minus)-minunStart)*60000)+Math.abs(parseInt(hour)-hourStart+(86400000)-(secound*1000));

            }else if (minunStart>parseFloat(minus)){

              this.time = (((parseInt(minus) + 60)  - minunStart)*60000)+Math.abs(((parseInt(hour)-hourStart)+(82800000)))-(secound*1000);
              
            }
            
          
            
   

      this.localNotifications.schedule({
          id:this.alertid,
          text: "ชื่อยา"+this.drug+"เวลา"+this.notifyTime,
           trigger: {at: new Date(new Date().getTime()+this.time)},
          led: 'FF0000',
          sound: 'file://assets/sound/alertsound.mp3',
          // sound: 'file://assets/sound/The.mp3',
      });
      
      //ตั้งเวลาซ้ำเป็น ทุุกชั่วโมง ทุกวัน
      // switch(this.alertAgain){
      //   // 30 min
      //   case 1 : this.time = this.time + (60000*30);
      //   this.createAlert(this.time,this.drug,this.userId,this.alertAgain);

      // }
      
      
    }
    ionViewDidLoad() {
      this.userId= window.localStorage.getItem('userId');
      console.log('ionViewDidLoad ProfileCreatePage');
    }

    createAlert(time,drug,userId,alertAgain){

    }
}
