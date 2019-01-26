import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {FormGroup, FormBuilder} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileCreatePage } from '../profile-create/profile-create';
import { ProfileUpdatePage } from '../profile-update/profile-update';

/**
 * Generated class for the ProfileDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");
@IonicPage()
@Component({
  selector: 'page-profile-display',
  templateUrl: 'profile-display.html',
})
export class ProfileDisplayPage {

  formgroup:FormGroup;
  
  public headers = new HttpHeaders().set("Content-Type","application/json");
  public firstName:string  =  '';
  public lastName:string  =  '';
  public date;
  public disease;
  public drung;
  public machineName;
  public bloodType;
  public gender;
  public userId;
  public number;
  public _id;

     public base_url ='http://202.183.198.114:8080/jaiya/api/';
  // public base_url = 'http://localhost:8080/jaiya/api/'
constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public http : HttpClient,
  public formbuilder:FormBuilder,
  private alertCtrl: AlertController) {

 this.formgroup = formbuilder.group({
     
  firstName:[''],
  lastName :[''],
  disease  :[''],
  machineName : [''],
  bloodType : [''],
  drung :[''],
  date : [''] ,
  gender :['']
  
      
    });
  
}

  ionViewDidLoad() {
 
    
    this.userId= window.localStorage.getItem('userId');
    let jsonData;
    
    let option = {
      headers: this.headers
    }
    let jsObject = { userId : this.userId}
    jsonData = JSON.stringify(jsObject);

    this.http.post(this.base_url+'UserData/findOne', jsonData, option)
        .subscribe((data:any) => {
          if(data.message == true){
            this.firstName = data.data.firstName,
            this.lastName = data.data.lastName,
            this.date = data.data.date,
            this.drung = data.data.drung,
            this.disease = data.data.disease,
            this.bloodType = data.data.bloodType,
            this.machineName = data.data.machineName,
            this._id = data.data._id,
            this.gender = data.data.gender;
          }
          else{
            let alert = this.alertCtrl.create({
              title: 'คุณยังไม่ได้สร้างข้อมูลผู้ใช้',
              message: 'ไปยังหน้ากรอกข้อมูล',
              buttons: ['ตกลง']
            });
            alert.present();
            this.navCtrl.push(ProfileCreatePage, {});
            
          }
          console.log(data);        
        });
    
    console.log('ionViewDidLoad ProfileDisplayPage');
  }

  editProfile(){
    this._id = this._id;
    console.log(this._id);
    this.navCtrl.push(ProfileUpdatePage, {});
    }
        


}
