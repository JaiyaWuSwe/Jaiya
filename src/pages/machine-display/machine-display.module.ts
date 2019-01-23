import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MachineDisplayPage } from './machine-display';

@NgModule({
  declarations: [
    MachineDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(MachineDisplayPage),
  ],
})
export class MachineDisplayPageModule {}
