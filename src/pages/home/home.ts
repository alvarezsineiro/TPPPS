import { NativeAudio } from '@ionic-native/native-audio';
import { EncuestaEstadisticaPage } from '../encuesta-estadistica/encuesta-estadistica';
import { AdministracionPage } from '../administracion/administracion';
import { AlumnosPage } from '../alumnos/alumnos';
import { ArchivosPage } from '../archivos/archivos';
import { EmpleadosPage } from '../empleados/empleados';
import { EstadisticasPage } from '../estadisticas/estadisticas';
import { EncuestasPage } from '../encuestas/encuestas';
import { AsistenciaPage } from '../asistencia/asistencia';
import { PerfilPage } from '../perfil/perfil';
import { Alta } from "../../entidades/alta";
import { Component, PACKAGE_ROOT_URL } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FaltasPage } from '../faltas/faltas';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';

import { SettingsProvider } from './../../providers/settings/settings';
import { ThemeProvider } from '../../providers/theme/theme';

import { CustomPage } from '../custom/custom';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  selectedTheme: String;
  adm: boolean = true;
  ad: boolean = true;
  alum: boolean = true;
  prof: boolean = true;
  tipo: string;
  user: Alta;
  scannedCode = null;

  public Cursos: AngularFireList<any>;
  public cursos: Observable<any>;
  aviso = [];


  constructor(public alertCtrl: AlertController, private audio: NativeAudio, public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public af: AngularFireDatabase,private settings: SettingsProvider
    ,private theme: ThemeProvider) {
    this.tipo = navParams.get('tipo');
    this.user = navParams.get('usuario');
    this.audio.preloadSimple('btn', 'assets/sounds/btn.mp3')

    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);

    switch (this.tipo) {
      case "alumno":
        this.alum = false;
        break;
      case "profesor":
        this.prof = false;
        break;
      case "administrativo":
        this.ad = false;
        break;
      case "administrador":
        this.adm = false;
        break;
      default:
        break;
    }
  }

  verificarPrivilegios() {

  }

  ruteo(pagina: string) {
    this.audio.play('btn');
    switch (pagina) {
      case "asist":
        this.navCtrl.push(AsistenciaPage);
        break;
      case "enc":
        this.navCtrl.push(EncuestasPage, { usuario: this.user });
        break;
      case "encEst":
        this.navCtrl.push(EncuestaEstadisticaPage, { usuario: this.user });
        break;
      case "est":
        this.navCtrl.push(EstadisticasPage, { usuario: this.user });
        break;
      case "perfil":
        this.navCtrl.push(PerfilPage, { usuario: this.user });
        break;
      case "alt":
        this.navCtrl.push(EmpleadosPage);
        break;
      case "arch":
        this.navCtrl.push(ArchivosPage);
        break;
      case "al":
        this.navCtrl.push(AlumnosPage);
        break;
      case "adm":
        this.navCtrl.push(AdministracionPage);
        break;
      case "fal":
        this.navCtrl.push(FaltasPage, { usuario: this.user });
        break;
      case "custom":
        this.navCtrl.push(CustomPage);
        break;
      default:
        break;
    }
  }

  mensaje(t, m) {
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: m,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  obtenerdia() {
    let date = new Date();
    let dia: string;
    switch (date.getDay()) {
      case 0:
        dia = "domingo";
        break;
      case 1:
        dia = "lunes";
        break;
      case 2:
        dia = "martes";
        break;
      case 3:
        dia = "miercoles";
        break;
      case 4:
        dia = "jueves";
        break;
      case 5:
        dia = "viernes";
        break;
      case 6:
        dia = "sabado";
        break;
      default:
        break;
    }
    return dia;
  }


  escanearprofesor() {
    console.log(this.user);
    
    this.aviso = [];
    let dia = this.obtenerdia();

    this.Cursos = this.af.list('cursos');
    this.cursos = this.Cursos.valueChanges();

    this.barcodeScanner.scan().then(barcodeData => {

      this.scannedCode = barcodeData.text;

      switch (this.scannedCode) {

        case "profesor":
          this.cursos.forEach(element => {
            element.forEach(curso => {
              //console.log(curso);
              
              if (curso.dia == dia) {
                if (curso.profesor == this.user.usuario) {
                  this.aviso.push(curso);
                  console.log(this.aviso);
                }
              }
            });
          });
          setTimeout(() => {
            console.log("entro");
            if (this.aviso.length == 0) {
              this.mensaje("", "El día de hoy no debe dar ninguna clase");
            }
            if (this.aviso.length != 0) {
              let mensaje = "";
              console.log(this.aviso);
              this.aviso.forEach(element => {
                mensaje = mensaje + " Materia: " + element.materia;
                mensaje = mensaje + "<br> Aula: " + element.aula;
                mensaje = mensaje + "<br> Turno: " + element.turno + "<br> <br>";
              });
              this.mensaje("El día de hoy debe dar clases", mensaje);
            }
          }, 300);
          break;

        default:

          this.mensaje('Error', 'Codigo no valido');

          break;
      }

    }, (err) => {
      this.mensaje('Error: ', err);
    });


  }

  escanearalumno() {
    console.log(this.user);
    let entro = false;
    this.aviso = [];
    let dia = this.obtenerdia();

    this.Cursos = this.af.list('cursos');
    this.cursos = this.Cursos.valueChanges();

    this.barcodeScanner.scan().then(barcodeData => {

      this.scannedCode = barcodeData.text;

      switch (this.scannedCode) {

        case "alumno":
          this.cursos.forEach(element => {
            element.forEach(curso => {
              //console.log(curso);
              entro = true;
              if (curso.dia == dia) {
                curso.alumnos.forEach(alumno => {
                  if (alumno.legajo == this.user.legajo) {

                    this.aviso.push(curso);
                    console.log(this.aviso);
                  }
                });
              }
            });
          });
          setTimeout(() => {
            console.log("entro");
            if (this.aviso.length == 0) {
              this.mensaje("", "El día de hoy no debe cursar ninguna clase");
            }
            if (this.aviso.length != 0) {
              let mensaje = "";
              console.log(this.aviso);
              this.aviso.forEach(element => {
                mensaje = mensaje + " Materia: " + element.materia;
                mensaje = mensaje + "<br> Aula: " + element.aula;
                mensaje = mensaje + "<br> Profesor: " + element.profesor;
                mensaje = mensaje + "<br> Turno: " + element.turno + "<br> <br>";
              });
              this.mensaje("El día de hoy debe cursar:", mensaje);
            }
          }, 300);
          break;

        default:
          this.mensaje('Error', 'Codigo no valido');
          break;
      }


    }, (err) => {
      this.mensaje('Error: ', err);
    });

  }

  argentina()
{
  this.settings.setActiveTheme('argentina-theme');
  this.theme.setVariable("--ion-color-dark","#4bafdd");
  this.theme.setVariable("--ion-color-alerte","#4bafdd");
}
naif()
{
  this.settings.setActiveTheme('naif-theme');
  this.theme.setVariable("--ion-color-dark","#ffce00");
  this.theme.setVariable("--ion-color-alerte","#ffce00");
}
custom()
{
  this.settings.setActiveTheme('custom-theme');
}
profesional()
{
  this.settings.setActiveTheme('profesional-theme');
  this.theme.setVariable("--ion-color-dark","#222");
  this.theme.setVariable("--ion-color-alerte","#fff");
}
}

