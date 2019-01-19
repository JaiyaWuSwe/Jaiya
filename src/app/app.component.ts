<<<<<<< HEAD
import { TestPage } from './../pages/test/test';
import { DrungCreatePage } from './../pages/drung-create/drung-create';
import { FirstpagePage } from './../pages/firstpage/firstpage';
import { MapSearchPage } from './../pages/map-search/map-search';
import { MapDisplayPage } from './../pages/map-display/map-display';
import { LoginPage } from './../pages/login/login';
=======
// import { FirstpagePage } from './../pages/firstpage/firstpage';
// import { LoginPage } from './../pages/login/login';
>>>>>>> 63a1fed19f8bfeaca0b8b8734546107fc089ba22
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegisterPage } from '../pages/register/register';

// import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
<<<<<<< HEAD
  rootPage:any ;
=======
  rootPage:any = RegisterPage;
>>>>>>> 63a1fed19f8bfeaca0b8b8734546107fc089ba22

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // this.rootPage = MapDisplayPage;
      this.rootPage = LoginPage;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

