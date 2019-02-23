import { EncuestasPage } from '../pages/encuestas/encuestas';
import { EstadisticasPage } from '../pages/estadisticas/estadisticas';
import { AdministracionPage } from '../pages/administracion/administracion';
import { ArchivosPage } from '../pages/archivos/archivos';
import { InicioPage } from '../pages/inicio/inicio';

import { Component } from '@angular/core';
import { Platform,ModalController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Splash } from '../pages/splash/splash';

import { SettingsProvider } from './../providers/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = InicioPage;
  selectedTheme: String;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController, private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    /*platform.ready().then(() => 
    {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      console.log(splashScreen);
      if (splashScreen) 
      {
        setTimeout(() => {
          splashScreen.hide();
        }, 100);
      }
    });*/

    platform.ready().then(() => {

      statusBar.styleDefault();

      let splash = modalCtrl.create(Splash);
      splash.present();

  });
  }
}

