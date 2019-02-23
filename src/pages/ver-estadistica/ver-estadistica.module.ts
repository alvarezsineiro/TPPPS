import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerEstadisticaPage } from './ver-estadistica';

@NgModule({
  declarations: [
    VerEstadisticaPage,
  ],
  imports: [
    IonicPageModule.forChild(VerEstadisticaPage),
  ],
})
export class VerEstadisticaPageModule {}
