import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the DrungHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drung-history',
  templateUrl: 'drung-history.html',
})
export class DrungHistoryPage {
  public headers = new HttpHeaders().set("Content-Type","application/json");
  public test=[];
  public userId;
  public time;
  public drug;
  public duration = "";
  public base_url ='http://172.16.82.72:8080/jaiya/api/';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http : HttpClient,) {
  }

  ionViewDidLoad() {
    this.userId= window.localStorage.getItem('userId');
      let jsonData;
      

      let option = {
        headers: this.headers
      }
      let jsObject = { userId : this.userId,
      status: 3}
      jsonData = JSON.stringify(jsObject);
      this.http.post(this.base_url+'timetogetpillow/history', jsonData, option)
          .subscribe((data:any) => {
            this.test = data.data;
           
          });
         
    console.log('ionViewDidLoad DrungHistoryPage');
  }

}
