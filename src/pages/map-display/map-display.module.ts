import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapDisplayPage } from './map-display';

@NgModule({
  declarations: [
    MapDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(MapDisplayPage),
  ],
})
export class MapDisplayPageModule {}
