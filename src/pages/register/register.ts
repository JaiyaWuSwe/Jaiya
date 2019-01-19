import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MenuPage } from '../menu/menu';
// import { Dialogs } from '@ionic-native/dialogs';

export const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  formgroup:FormGroup;
  matching_passwords_group: FormGroup;
  returnMessage = "";
  public headers = new HttpHeaders().set("Content-Type","application/json");

  public username;
  public password;
  public email;
  public tell;
  public base_url ='http://172.16.82.72:8080/jaiya/api/';
  // public base_url = 'http://localhost:8080/jaiya/api/'
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public http : HttpClient,
    public formbuilder:FormBuilder,
    private alertCtrl: AlertController
    // public dialogs: Dialogs
    ) {

      this.matching_passwords_group = new FormGroup({
        password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ])),
        confirm_password: new FormControl('', Validators.required)
      }, (formGroup: FormGroup) => {
        return PasswordValidator.areEqual(formGroup);
      });

      this.formgroup = formbuilder.group({
       
        username:['',Validators.required],
        
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        tell: new FormControl('', Validators.compose([
          Validators.required,
          // Validators.pattern('^[0-9]'),
          Validators.minLength(3)
        ])),
        matching_passwords: this.matching_passwords_group
      });

    
  }
  validation_messages = {
    'name': [
      { type: 'required', message: 'กรอกชื่อผู้ใช้' }
    ],
    'email': [
      { type: 'required', message: 'กรอกอีเมลล์' },
      { type: 'pattern', message: 'กรุณากรอกอีเมลล์ให้ถูกต้อง' }
    ],
    'tell': [
      { type: 'required', message: 'กรอกเบอร์โทรศัพท์' },
      { type: 'minLength', message: 'กรอกเบอร์โทรศััพท์อย่างน้อย 9 ตัว' }
    ],
    'password': [
      { type: 'required', message: 'กรอกรหัสผ่าน' },
      { type: 'minlength', message: 'กรอกตัวอักษรอย่างน้อย 5 ตัวอักษร' },
      { type: 'pattern', message: 'กรอกรหัสผ่านเป็นตัวอักษรภาษาอังกฤษพิมพ์ใหญ่อย่างน้อย 1 ตัว, อังกฤษพิมพ์เล็กอย่างน้อย 1 ตัว, และตัวเลขอย่างน้อย 1 ตัว' }
    ],
    'confirm_password': [
      { type: 'required', message: 'กรอกรหัสผ่านให้ตรงกัน' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'พาสเวิดร์ไม่ตรงกัน' }
    ],
  }
  

  sendRequest(){

    let jsonData;
    
    let option = {
      headers: this.headers
    }
    // // Create JSON object from username & email
    let jsObject = { username: this.username, 
                    password: this.password, 
                    email: this.email, 
                    tell: this.tell 
                  }
    jsonData = JSON.stringify(jsObject);

    this.http.post(this.base_url+'Register/insert', jsonData, option)
        .subscribe((data:any) => {
          
          console.log(data);
          if(data.message == true  ){ 
            let alert = this.alertCtrl.create({
              title: 'สมัครสมาชิก',
              message: 'สมัครสมาชิกสำเร็จ',
              // buttons: ['OK']
            });
            alert.present();
            this.navCtrl.push(LoginPage, {});
          
          }
          else{
            
            let alert = this.alertCtrl.create({
              title: 'สมัครสมาชิกไม่สำเร็จ',
              message: 'ข้อมูลไม่ถูกต้อง',
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.push(LoginPage, {});
          }
         
          
        });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PostJson');
  }


  
  
}