import { Component } from '@angular/core';
import {NavController, NavParams ,AlertController} from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';

/**
 * Generated class for the DrungDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { LocalNotifications } from '@ionic-native/local-notifications';
export const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");
@Component({
  selector: 'page-drung-display',
  templateUrl: 'drung-display.html',
})
export class DrungDisplayPage {
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
    public _id;
    public status ;
    public test=[];
    public alertId;
      // public base_url = "http://localhost:8080/jaiya/api/";
         public base_url ='http://202.183.198.114:8080/jaiya/api/';

    
    

    constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public http : HttpClient,
      public formbuilder:FormBuilder,
      private alertCtrl: AlertController,private localNotifications: LocalNotifications
      ) {
        

      
  
        
      this.formgroup = formbuilder.group({
     
        time:['',],
        drug :['',],
        amount  :['',],
        volume: ['',]
      }); 
}
goTo(_id) {
  _id = _id || 'No hospital Entered';
  let jsonData;
      

  let option = {
    headers: this.headers
  }
  let jsObject = { userId : this.userId,
                  _id : _id ,
                    status : 2
                  }
  jsonData = JSON.stringify(jsObject);
  this.http.post(this.base_url+'timetogetpillow/changestatus', jsonData, option)
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
  
}
Delete(_id) {
  _id = _id || 'No hospital Entered';
  let jsonData;
      

  let option = {
    headers: this.headers
  }
  let jsObject = { 
                  id : _id ,
                    
                  }
  jsonData = JSON.stringify(jsObject);

  
  this.http.post(this.base_url+"timetogetpillow/delete",jsonData, option).subscribe((data:any) => {
    
          if(data.message == true  ){ 
            this.localNotifications.clear(this.alertId);
            let alert = this.alertCtrl.create({
              title: 'ลบ',
              message: 'ลบสำเร็จ',
              buttons: ['ตกลง']
            });
            alert.present();
            this.navCtrl.setRoot(DrungDisplayPage);
          
          }
          else{
            
            let alert = this.alertCtrl.create({
              title: 'บันทึก',
              message: 'ลบไม่สำเร็จ',
              buttons: ['ตกลง']
            });
            alert.present();
            this.navCtrl.setRoot(DrungDisplayPage);
          } 
       
  });
        
  
}

  ionViewDidLoad() {
    this.userId= window.localStorage.getItem('userId');
      let jsonData;
      

      let option = {
        headers: this.headers
      }
      let jsObject = { userId : this.userId , status : this.status}
      jsonData = JSON.stringify(jsObject);
      this.http.post(this.base_url+'timetogetpillow/showalltimtogetpillow', jsonData, option)
          .subscribe((data:any) => {
        
              this.test = data.data;
              
          });
    console.log('ionViewDidLoad DrungDisplayPage');
  }

}


// เวลาที่ตั้ง + วัน  = id  แก้ไข function in java     
// timealert again = ex 18.00    alert agian 6hr. 