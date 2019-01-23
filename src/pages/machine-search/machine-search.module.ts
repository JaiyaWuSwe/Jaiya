import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MachineSearchPage } from './machine-search';

@NgModule({
  declarations: [
    MachineSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(MachineSearchPage),
  ],
})
export class MachineSearchPageModule {}
