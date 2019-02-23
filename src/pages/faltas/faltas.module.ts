import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaltasPage } from './faltas';

@NgModule({
  declarations: [
    FaltasPage,
  ],
  imports: [
    IonicPageModule.forChild(FaltasPage),
  ],
})
export class FaltasPageModule {}
