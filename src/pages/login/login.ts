import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../menu/menu';



export const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  formgroup:FormGroup;
  public headers = new HttpHeaders().set("Content-Type","application/json");

  public username;
  public password;
  public userId;
  public role;
  public number;
  public status = 1;
  public alarms;
  // public base_url = "http://localhost:8080/jaiya/api/";
  public base_url ='http://172.16.82.153:8080/jaiya/api/';

  
  

  constructor(public navCtrl: NavController,
    public http : HttpClient,
    public navParams: NavParams,
    public formbuilder:FormBuilder,
    public storage: Storage,
    private alertCtrl: AlertController,
   ) {
    
      this.formgroup = formbuilder.group({
       
        username:['',Validators.required],
        password:['',Validators.required],
        
      });
    
  }
  validation_messages = {
    'username': [
      { type: 'required', message: 'ใส่ชื่อผู้ใช้' }
    ],
    'password': [
      { type: 'required', message: 'ใส่พาสเวิดร์' }
    ]
  }
  sendRequest(){

    let jsonData;
    
    let option = {
      headers: this.headers
    }
    // // Create JSON object from username & email
    let jsObject = { username: this.username, 
                    password: this.password, 
                  }
    jsonData = JSON.stringify(jsObject);

    this.http.post(this.base_url+'login/login', jsonData, option)
        .subscribe((data:any) => {
          if(data.message == true  ){
            window.localStorage.setItem("userId",data.data._id);
            window.localStorage.setItem("username",data.data.username);
            window.localStorage.setItem("role",data.data.role);
            let alert = this.alertCtrl.create({
              title: 'ลงชื่อเข้าใช้',
              message: 'ลงชื่อเข้าใช้สำเร็จ',
              buttons: ['ตกลง']
            });
            alert.present();
            this.navCtrl.setRoot(MenuPage);
          }
          else{
            let alert = this.alertCtrl.create({
              title: 'ลงชื่อเข้าใช้',
              message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
              buttons: ['ตกลง']
            });
            alert.present();
            this.navCtrl.setRoot(LoginPage);
          }
          
          
        });

  }
  ionViewDidLoad() {
    // console.log(this.base_url);
    // this.userId= window.localStorage.getItem('userId');
    //   let jsonData;
      

    //   let option = {
    //     headers: this.headers
    //   }
    //   let jsObject = { userId : this.userId , status : this.status}
    //   jsonData = JSON.stringify(jsObject);
    //   this.http.post(this.base_url+'timetogetpillow/showtimetogetpillow', jsonData, option)
    //       .subscribe((data:any) => {
    //           this.alarms = data.data;
    //           // console.log(data);
    //           // this.time = data.data.time,
    //           // this.drug = data.data.drug,
    //           // this.amount = data.data.amount,
    //           // this.volume = data.data.volume,
    //           // this.duration = data.data.duration,
    //           // this.alert = data.data.alert
    //           window.localStorage.setItem("alarms",data.data.time);
          // });
          
    console.log('ionViewDidLoad DrungDisplayPage');
  }

  
}