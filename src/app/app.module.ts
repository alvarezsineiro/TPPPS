import { VerEstadisticaPage } from '../pages/ver-estadistica/ver-estadistica';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { ResponderPage } from '../pages/responder/responder';
import { EncuestaEstadisticaPage } from '../pages/encuesta-estadistica/encuesta-estadistica';
import { AdministracionPage } from '../pages/administracion/administracion';
import { AlumnosPage } from '../pages/alumnos/alumnos';
import { ArchivosPage } from '../pages/archivos/archivos';
import { HttpModule } from '@angular/http';
import { InicioPage } from '../pages/inicio/inicio';
import { RegistroPage } from '../pages/registro/registro';
import { EmpleadosPage } from '../pages/empleados/empleados';
import { EstadisticasPage } from '../pages/estadisticas/estadisticas';
import { EncuestasPage } from '../pages/encuestas/encuestas';
import { AsistenciaPage } from '../pages/asistencia/asistencia';
import { LoginPage } from '../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from "angularfire2/auth";
import { NativeAudio } from '@ionic-native/native-audio';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from "@ionic-native/camera";
import { ChartsModule } from 'ng2-charts';
import { Printer } from '@ionic-native/printer';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { FaltasPage } from '../pages/faltas/faltas';
import { Splash } from '../pages/splash/splash';
import { SettingsProvider } from '../providers/settings/settings';
import { ThemeProvider } from '../providers/theme/theme';
import { IonicStorageModule } from '@ionic/storage';

import { CustomPage } from '../pages/custom/custom';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AsistenciaPage,
    EncuestasPage,
    EstadisticasPage,
    PerfilPage,
    EmpleadosPage,
    RegistroPage,
    InicioPage,
    ArchivosPage,
    AlumnosPage,
    AdministracionPage,
    EncuestaEstadisticaPage,
    ResponderPage,
    VerEstadisticaPage,
    FaltasPage,
    Splash,
    CustomPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    ChartsModule,
    NgxQRCodeModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PerfilPage,
    AsistenciaPage,
    EncuestasPage,
    EstadisticasPage,
    PerfilPage,
    EmpleadosPage,
    RegistroPage,
    InicioPage,
    ArchivosPage,
    AlumnosPage,
    AdministracionPage,
    EncuestaEstadisticaPage,
    ResponderPage,
    VerEstadisticaPage,
    FaltasPage,
    Splash,
    CustomPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    GooglePlus,
    Facebook,
    Camera,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BarcodeScanner,
    Printer,
    SettingsProvider
    ,ThemeProvider
  ]
})
export class AppModule { }
