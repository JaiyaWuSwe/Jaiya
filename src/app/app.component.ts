import { MachineSearchPage } from './../pages/machine-search/machine-search';
import { ProfileCreatePage } from './../pages/profile-create/profile-create';
import { DrungDisplayPage } from './../pages/drung-display/drung-display';
import { MenuPage } from './../pages/menu/menu';
import { DrungHistoryPage } from './../pages/drung-history/drung-history';
import { TestPage } from './../pages/test/test';
import { DrungCreatePage } from './../pages/drung-create/drung-create';
import { FirstpagePage } from './../pages/firstpage/firstpage';
import { MapSearchPage } from './../pages/map-search/map-search';
import { MapDisplayPage } from './../pages/map-display/map-display';
import { LoginPage } from './../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegisterPage } from '../pages/register/register';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // this.rootPage = MapDisplayPage;
      this.rootPage = FirstpagePage;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

