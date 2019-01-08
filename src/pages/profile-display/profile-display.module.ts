import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileDisplayPage } from './profile-display';

@NgModule({
  declarations: [
    ProfileDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileDisplayPage),
  ],
})
export class ProfileDisplayPageModule {}
