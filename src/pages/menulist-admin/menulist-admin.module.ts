import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenulistAdminPage } from './menulist-admin';

@NgModule({
  declarations: [
    MenulistAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(MenulistAdminPage),
  ],
})
export class MenulistAdminPageModule {}
