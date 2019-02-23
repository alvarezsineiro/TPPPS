import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArchivosPage } from './archivos';

@NgModule({
  declarations: [
    ArchivosPage,
  ],
  imports: [
    IonicPageModule.forChild(ArchivosPage),
  ],
})
export class ArchivosPageModule {}
