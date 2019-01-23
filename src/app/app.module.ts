import { HelpPage } from './../pages/help/help';
import { MachineDisplayPage } from './../pages/machine-display/machine-display';
import { MachineSearchPage } from './../pages/machine-search/machine-search';
import { TestPage } from './../pages/test/test';
import { MapSearchPage } from './../pages/map-search/map-search';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { MapDisplayPage } from './../pages/map-display/map-display';
import { FirstpagePage } from './../pages/firstpage/firstpage';
import { ProfileUpdatePage } from './../pages/profile-update/profile-update';
import { ProfileDisplayPage } from './../pages/profile-display/profile-display';
import { ProfileCreatePage } from './../pages/profile-create/profile-create';
import { MenulistPage } from './../pages/menulist/menulist';
import { MenuPage } from './../pages/menu/menu';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DrungCreatePage } from '../pages/drung-create/drung-create';
import { DrungDisplayPage } from '../pages/drung-display/drung-display';
import { DrungHistoryPage } from '../pages/drung-history/drung-history';
import { RegisterPage } from '../pages/register/register';
import { GoogleMaps}from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    MenulistPage,
    DrungCreatePage,
    DrungDisplayPage,
    DrungHistoryPage,
    ProfileCreatePage,
    ProfileDisplayPage
    ,ProfileUpdatePage,
    RegisterPage,
    FirstpagePage,
    MapDisplayPage,
    MapSearchPage,
    TestPage,
    MachineSearchPage,
    MachineDisplayPage,
    HelpPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    MenulistPage,
    DrungCreatePage,
    DrungDisplayPage,
    DrungHistoryPage,
    ProfileCreatePage,
    ProfileDisplayPage
    ,ProfileUpdatePage,
    RegisterPage,
    FirstpagePage,
    MapDisplayPage,
    MapSearchPage,
    TestPage,
    MapDisplayPage,
    MachineSearchPage,MachineDisplayPage,
    HelpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    GoogleMaps,
    AndroidPermissions,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
