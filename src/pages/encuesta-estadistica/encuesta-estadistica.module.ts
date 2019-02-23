import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestaEstadisticaPage } from './encuesta-estadistica';

@NgModule({
  declarations: [
    EncuestaEstadisticaPage,
  ],
  imports: [
    IonicPageModule.forChild(EncuestaEstadisticaPage),
  ],
})
export class EncuestaEstadisticaPageModule {}
