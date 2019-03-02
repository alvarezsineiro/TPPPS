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
  a:any;
  b:any;
  c:any;
  d:any;
  e:any;
  f:any;
  g:any;
  h:any;
  i:any;
  j:any;
  k:any;
  l:any;
  z:any;

  /*tema:{
    fondo:string,
    fondoform:string,
    bordeform:string,
    textoform:string,
    fondoboton:string,
    bordeboton:string,
    textoboton:string,
    fondotabla:string,
    textotabla:string,
    bordetabla:string,
    fondobarra:string,
    textobarra:string,
    formatobotones:string
  }*/
  tema=["","","","","","","","","","","","",""];

  constructor(public navCtrl: NavController, public navParams: NavParams,private settings: SettingsProvider
    ,private theme: ThemeProvider) {


    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.settings.setActiveTheme('custom-theme');

    
      this.theme.setVariable("--ion-color-dark","#ce3232");
      this.theme.setVariable("--ion-color-alerte","#ce3232");
      
  
      this.cargar();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomPage');
  }

  changeprimary(){
    this.theme.setVariable("--ion-color-primary","#fff");
    
  }
  fondo(){
    let valor=this.c;
    console.log("sada");
    this.theme.setVariable("--ion-color-primary",valor);
  }
  fondoform(){
    let valor=this.a;
    console.log(valor);
    this.theme.setVariable("--ion-color-secondary",valor);
  }
  bordeform(){
    let valor=this.b;
    console.log(valor);
    this.theme.setVariable("--ion-color-tertiary",valor);
  }
  textoform(){
    let valor=this.d;
    console.log(valor);
    this.theme.setVariable("--ion-color-cuatro",valor);
  }
  fondoboton(){
    let valor=this.e;
    console.log(valor);
    this.theme.setVariable("--ion-color-cinco",valor);
  }
  bordeboton(){
    let valor=this.f;
    console.log(valor);
    this.theme.setVariable("--ion-color-seis",valor);
  }
  textoboton(){
    let valor=this.g;
    console.log(valor);
    this.theme.setVariable("--ion-color-siete",valor);
  }
  fondotabla(){
    let valor=this.h;
    console.log(valor);
    this.theme.setVariable("--ion-color-ocho",valor);
  }
  textotabla(){
    let valor=this.i;
    console.log(valor);
    this.theme.setVariable("--ion-color-nueve",valor);
  }
  bordetabla(){
    let valor=this.j;
    console.log(valor);
    this.theme.setVariable("--ion-color-diez",valor);
  }

  fondobarra(){
    let valor=this.k;
    console.log(valor);
    this.theme.setVariable("--ion-color-once",valor);
  }
  textobarra(){
    let valor=this.l;
    console.log(valor);
    this.theme.setVariable("--ion-color-doce",valor);
  }

  formatobotones(){
    let valor=this.z;
    console.log(valor);
    this.theme.setVariable("--ion-border-radius-tres",valor);
  }
  formatotexto(valor){
    console.log(valor);
    this.theme.setVariable("font-family-mio",valor);
  }
  cargar()
  {
    let temasting = localStorage.getItem("tema");
    console.log(temasting);
    
    if (temasting!=null) {
      let tema = JSON.parse(temasting);
      this.a=tema[0];
      this.b=tema[1];
      this.c=tema[2];
      this.d=tema[3];
      this.e=tema[4];
      this.f=tema[5];
      this.g=tema[6];
      this.h=tema[7];
      this.i=tema[8];
      this.j=tema[9];
      this.k=tema[10];
      this.l=tema[11];
      this.z=tema[12];
    }
    else
    {
      this.a="#32b9db";
      this.b="#fda62d";
      this.c="#51f1f1";
      this.d="#d042f4";
      this.e="#80b33e";
      this.f="#426bf4";
      this.g="#fa3a3a";
      this.h="#ed75f1";
      this.i="#000000";
      this.j="#000000";
      this.k="#f4ca42";
      this.l="#222";
      this.z="0px";
    }
    
    this.fondo();
    this.fondoform();
    this.bordeform();
    this.textoform();
    this.fondoboton();
    this.bordeboton();
    this.textoboton();
    this.fondotabla();
    this.textotabla();
    this.bordetabla();
    this.fondobarra();
    this.textobarra();
    this.formatobotones();
  }

  guardar()
  {
    this.tema[0]=this.a;
    this.tema[1]=this.b;
    this.tema[2]=this.c;
    this.tema[3]=this.d;
    this.tema[4]=this.e;
    this.tema[5]=this.f;
    this.tema[6]=this.g;
    this.tema[7]=this.h;
    this.tema[8]=this.i;
    this.tema[9]= this.j;
    this.tema[10]=this.k;
    this.tema[11]=this.l;
    this.tema[12]=this.z;

    localStorage.setItem("tema",JSON.stringify(this.tema));
    console.log(this.a);
    this.navCtrl.pop();
  }
}
