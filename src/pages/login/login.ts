import { MachineSearchPage } from './../machine-search/machine-search';
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
     public base_url ='http://202.183.198.114:8080/jaiya/api/';

  

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
            
            window.localStorage.setItem("role",data.data.role);
            if(data.data.role == 1){
              window.localStorage.setItem("userId",data.data._id);
              window.localStorage.setItem("username",data.data.username);
              let alert = this.alertCtrl.create({
                title: 'ลงชื่อเข้าใช้',
                message: 'ลงชื่อเข้าใช้สำเร็จ ยินดีต้อนรับ '+data.data.username,
                buttons: ['ตกลง']
              });
              alert.present();
              this.navCtrl.setRoot(MachineSearchPage);
            }
            if(data.data.role == 2){
              window.localStorage.setItem("userId",data.data._id);
              window.localStorage.setItem("username",data.data.username);
              let alert = this.alertCtrl.create({
                title: 'ลงชื่อเข้าใช้',
                message: 'ลงชื่อเข้าใช้สำเร็จ ยินดีต้อนรับ '+data.data.username,
                buttons: ['ตกลง']
              });
              alert.present();
              this.navCtrl.setRoot(MenuPage);
            }
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
    
    console.log('ionViewDidLoad DrungDisplayPage');
  }

  
}