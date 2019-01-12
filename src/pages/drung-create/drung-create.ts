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
    public time;
    public drug;
    public amount;
    public volume;
    public duration;
    public alert;
    public userId;
    public base_url = "http://localhost:8080/jaiya/api/";
    // public base_url = "http://172.18.133.100:8080/jaiya/api/";

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
          amount  :['',],
          volume : ['',],
          duration : ['',Validators.required],
          alert :['',]
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

    let jsonData;
    
    let option = {
      headers: this.headers
    }
    // // Create JSON object from username & email
    let jsObject = { userId: this.userId, 
                    time: this.notifyTime, 
                    drug:this.drug,
                    amount:this.amount
                  }
    jsonData = JSON.stringify(jsObject);
    this.http.post(this.base_url+'/timetogetpillow/insert', jsonData, option)
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

      this.localNotifications.schedule({
          text: 'เบสไปไหน ไปกับใคร',
          // trigger: {at: new Date(new Date().getTime() + 5000)},
          trigger:{at:this.notifyTime},
          led: 'FF0000',
          sound: 'file://assets/sound/The.mp3'
      });
      
    }
    ionViewDidLoad() {
      this.userId= window.localStorage.getItem('userId');
      console.log('ionViewDidLoad ProfileCreatePage');
}

}
