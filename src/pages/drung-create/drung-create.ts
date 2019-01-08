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
        public localNotifications: LocalNotifications
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
  }

}
