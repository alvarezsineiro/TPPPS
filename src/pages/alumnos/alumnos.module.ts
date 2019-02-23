import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlumnosPage } from './alumnos';

@NgModule({
  declarations: [
    AlumnosPage,
  ],
  imports: [
    IonicPageModule.forChild(AlumnosPage),
  ],
})
export class AlumnosPageModule {}
