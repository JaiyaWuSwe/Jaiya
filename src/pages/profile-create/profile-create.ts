import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../menu/menu';


export const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");
@Component({
  selector: 'page-profile-create',
  templateUrl: 'profile-create.html',
})
export class ProfileCreatePage {

  formgroup:FormGroup;
    returnMessage = "";
    public headers = new HttpHeaders().set("Content-Type","application/json");
    public firstName;
    public lastName;
    public date;
    public disease;
    public drung;
    public machineName;
    public bloodType;
    public gender;
    public userId;
    public number;
    public base_url ='http://localhost:8080/jaiya/api';

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public http : HttpClient,
       public formbuilder:FormBuilder,
       public storage: Storage,
       private alertCtrl: AlertController
       ) {
       
        this.formgroup = formbuilder.group({
       
            firstName:['',Validators.required],
            lastName :['',Validators.required],
            disease  :['',],
            bloodType : ['',Validators.required],
            drung :['',],
            date : ['',Validators.required] ,
            gender :['',Validators.required]
        }); 
    }
      validation_messages = {
        'firstName': [
          { type: 'required', message: 'กรอกชื่อ' }
        ],
        'lastName':[
          {type : 'required', message : 'กรอกนามสกุล'}
        ],
        'bloodType':[
          {type : 'required', message : 'เลือกรุ๊ปเลือด'}
        ],
        'date':[
          {type : 'required', message : 'กรอกวันเดือนปีเกิด'}
        ],
        'gender':[
          {type: 'requried', message : 'เลือกเพศ'}
        ]
        

        
      }
      sendRequest(){

        let jsonData;
        
        let option = {
          headers: this.headers
        }
        // // Create JSON object from username & email
        let jsObject = { 
            userId: this.userId,
            firstName :this.firstName,
            lastName : this.lastName,
            date : this.date,
            gender : this.gender,
            bloodType : this.bloodType,
            disease : this.disease
                        
                      
                      }
        jsonData = JSON.stringify(jsObject);
    
        this.http.post(this.base_url+'/UserData/insert', jsonData, option)
            .subscribe((data:any) => {  
              if(data.message == true  ){ 
                let alert = this.alertCtrl.create({
                  title: 'บันทึก',
                  message: 'บันทึกสำเร็จ',
                  buttons: ['ตกลง']
                });
                alert.present();
                this.navCtrl.setRoot(MenuPage);
              
              }
              else{
                
                let alert = this.alertCtrl.create({
                  title: 'บันทึก',
                  message: 'บันทึกไม่สำเร็จ',
                  buttons: ['ตกลง']
                });
                alert.present();
                this.navCtrl.setRoot(ProfileCreatePage);
              } 
            });
    
      }
      ionViewDidLoad() {
        this.userId= window.localStorage.getItem('userId');
        console.log('ionViewDidLoad ProfileCreatePage');
  }

}
