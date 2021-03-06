
import { ProfileDisplayPage } from './../profile-display/profile-display';
import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");
@Component({
  selector: 'page-profile-update',
  templateUrl: 'profile-update.html',
})
export class ProfileUpdatePage {

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
    public _id;
       public base_url ='http://202.183.198.114:8080/jaiya/api/';
    // public base_url = 'http://localhost:8080/jaiya/api/'

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public http : HttpClient,
        public formbuilder:FormBuilder,
        // public storage: Storage,
        private alertCtrl: AlertController
       ) {
        
        this.formgroup = formbuilder.group({
       
            firstName:['',],
            lastName :['',],
            disease  :['',],
            machineName : ['',],
            bloodType : ['',],
            drung :['',],
            date : ['',] ,
            gender :['',]
        }); 
    }
      validation_messages = {
        

        
      }
      
      sendRequest(){

        let jsonData;
        
        let option = {
          headers: this.headers
        }
        // // Create JSON object from username & email
        let jsObject = { 

                        disease: this.disease,
                        drung: this.drung,
                        userId:this.userId,
                        _id:this._id
                      
                      }
        jsonData = JSON.stringify(jsObject);
    
        this.http.post(this.base_url+'UserData/update', jsonData, option)
            .subscribe((data:any) => {  
              if(data.message == true  ){ 
                let alert = this.alertCtrl.create({
                  title: 'บันทึก',
                  message: 'บันทึกสำเร็จ',
                  buttons: ['ตกลง']
                });
                alert.present();
                this.navCtrl.push(ProfileDisplayPage, {});
              
              }
              else{
                
                let alert = this.alertCtrl.create({
                  title: 'บันทึก',
                  message: 'บันทึกไม่สำเร็จ',
                  buttons: ['ตกลง']
                });
                alert.present();
                this.navCtrl.push(ProfileDisplayPage, {});
              } 
              
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
              this.gender = data.data.gender
            }      
          });

    console.log('ionViewDidLoad ProfileUpdatePage');
  }

}
