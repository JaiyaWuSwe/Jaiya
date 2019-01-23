import { MachineDisplayPage } from './../machine-display/machine-display';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder,FormGroup } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';


/**
 * Generated class for the MachineSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");

@Component({
  selector: 'page-machine-search',
  templateUrl: 'machine-search.html',
})
export class MachineSearchPage {
  formgroup:FormGroup;
  public headers = new HttpHeaders().set("Content-Type","application/json");
  public test=[];
  public  _id;
  public name;
  public status;
  
  // public userId;
  // public base_url ='http://172.16.240.209/jaiya/api/';
  // public base_url ='http://localhost:8080/jaiya/api/';
   public base_url ='http://202.183.198.114:8080/jaiya/api/';

  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formbuilder:FormBuilder, public http : HttpClient,) {

  }

  goTo(name) {
    name = name || 'No hospital Entered';

    this.navCtrl.push(MachineDisplayPage, {
      data: name
    });
  
  }

  ionViewDidLoad() {
    // this.userId= window.localStorage.getItem('userId');
      let jsonData;

    let option = {
      headers: this.headers
    }
    let jsObject ;
   

    this.http.post(this.base_url+'machine/searchMachine', {}, option)
        .subscribe((data:any) => {

          
          this.test = data.datasearch;

          Object.keys(this.test).forEach(key=> {

          });
        
        });
    
  }
      

 
}

