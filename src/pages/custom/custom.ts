import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CustomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { SettingsProvider } from './../../providers/settings/settings';
import { ThemeProvider } from '../../providers/theme/theme';

const themes = {
  autumn: {
    primary: '#F78154',
    secondary: '#4D9078',
    tertiary: '#B4436C',
    light: '#FDE8DF',
    medium: '#FCD0A2',
    dark: '#B89876'
  },
  night: {
    primary: '#8CBA80',
    secondary: '#FCFF6C',
    tertiary: '#FE5F55',
    medium: '#BCC2C7',
    dark: '#F7F7FF',
    light: '#495867'
  },
  neon: {
    primary: '#39BFBD',
    secondary: '#4CE0B3',
    tertiary: '#FF5E79',
    light: '#F4EDF2',
    medium: '#B682A5',
    dark: '#34162A'
  }
};
@IonicPage()
@Component({
  selector: 'page-custom',
  templateUrl: 'custom.html',
})
export class CustomPage {
  selectedTheme: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,private settings: SettingsProvider
    ,private theme: ThemeProvider) {


    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.settings.setActiveTheme('custom-theme');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomPage');
  }

  changeprimary(){
    this.theme.setVariable("--ion-color-primary","#fff");
    
  }
  fondo(valor){
    console.log("sada");
    this.theme.setVariable("--ion-color-primary",valor);
  }
  fondoform(valor){
    console.log(valor);
    this.theme.setVariable("--ion-color-secondary",valor);
  }
  bordeform(valor){
    console.log("sada");
    this.theme.setVariable("--ion-color-tertiary",valor);
  }
  textoform(valor){
    console.log("sada");
    this.theme.setVariable("--ion-color-cuatro",valor);
  }
  fondoboton(valor){
    console.log("sada");
    this.theme.setVariable("--ion-color-cinco",valor);
  }
  bordeboton(valor){
    console.log("sada");
    this.theme.setVariable("--ion-color-seis",valor);
  }
  textoboton(valor){
    console.log("sada");
    this.theme.setVariable("--ion-color-siete",valor);
  }
  fondotabla(valor){
    console.log("sada");
    this.theme.setVariable("--ion-color-ocho",valor);
  }
  textotabla(valor){
    console.log("sada");
    this.theme.setVariable("--ion-color-nueve",valor);
  }
  bordetabla(valor){
    console.log("sada");
    this.theme.setVariable("--ion-color-diez",valor);
  }

  fondobarra(valor){
    console.log("sada");
    this.theme.setVariable("--ion-color-once",valor);
  }
  textobarra(valor){
    console.log("sada");
    this.theme.setVariable("--ion-color-doce",valor);
  }

  formatobotones(valor){
    console.log("sada");
    this.theme.setVariable("--ion-border-radius-tres",valor);
  }
  formatotexto(valor){
    console.log("sada");
    this.theme.setVariable("font-family",valor);
  }
  
}
