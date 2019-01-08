import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ProfileDisplayPage } from '../profile-display/profile-display';AlertController

/**
 * Generated class for the ProfileUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public http : HttpClient,
        public formbuilder:FormBuilder,
        // public storage: Storage,
        // private alertCtrl: AlertController
       ) {
        
        this.formgroup = formbuilder.group({
       
            firstName:['',],
            lastName :['',],
            disease  :['',Validators.required],
            machineName : ['',],
            bloodType : ['',],
            drung :['',Validators.required],
            date : ['',] ,
            gender :['',]
        }); 
    }
      validation_messages = {
        'disease': [
          { type: 'required', message: 'กรอกโรคประจำตัว' }
        ],
        'drung':[
          {type : 'required', message : 'กรอกยาที่แพ้'}
        ]

        
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
    
        this.http.post('http://localhost:8080/jaiya/api/UserData/update', jsonData, option)
            .subscribe((data:any) => {  

              console.log(data);
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
  
      this.http.post('http://localhost:8080/jaiya/api/UserData/findOne', jsonData, option)
          .subscribe((data:any) => {
            if(data.message == true){
              this.firstName = data.data.firstName,
              this.lastName = data.data.lastName,
              this.date = data.data.date,
              this.drung = data.data.drung,
              this.disease = data.data.disease,
              this.bloodType = data.data.bloodType,
              this.machineName = data.data.machineName,
              this._id = data.data._id
            }
            console.log(data);        
          });
          

      // console.log(this._id);
    // this.userId= window.localStorage.getItem('userId');
    console.log('ionViewDidLoad ProfileUpdatePage');
  }

}
