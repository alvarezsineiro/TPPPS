import { NativeAudio } from '@ionic-native/native-audio';
import { EncuestaEstadisticaPage } from '../encuesta-estadistica/encuesta-estadistica';
import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ResponderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-responder',
  templateUrl: 'responder.html',
})
export class ResponderPage {

  encuesta : any;
  preguntas : any[];
  respuestas : any[] = new Array<any>();
  respondio : any;
  opciones : any[] = new Array<any>();
  indice : any;
  public Items: AngularFireList<any>;
  public items: Observable<any>;
  bandera: boolean = false;
  anteriores : any[] = new Array<any>();

  constructor(public navCtrl: NavController, private audio : NativeAudio, public navParams: NavParams, public afDB : AngularFireDatabase) {
    this.audio.preloadSimple('fin', 'assets/sounds/finish.mp3')
    this.encuesta = this.navParams.get('encuesta');
    console.log(" encuesta  :" + JSON.stringify( this.encuesta));
    console.log(" preguntas sin json  :" + this.encuesta.Preguntas);
    this.preguntas = this.encuesta.Preguntas;
    console.log(" preguntas :" + JSON.stringify( this.preguntas));
    this.respondio = this.navParams.get('user');
    this.indice = this.navParams.get('indice');

    console.log("indice",this.navParams.get('indice'));
  }
  enviar()
  {
    this.audio.play('fin');
   
    console.log("respondio" + this.respondio.legajo);
    console.log('encuesta' + this.encuesta);
    console.log("respuestas" + this.respuestas);
    let result : any = {};
    result.profesor = this.encuesta.Profesor;
    result.curso = this.encuesta.curso;
    result.materia = this.encuesta.materia;
    result.encuesta = this.encuesta.Nombre;
    //result.alumno = this.respondio.legajo;
    result.id = this.indice;
    console.log("respuesta",result);


    this.Items = this.afDB.list('/Resultados/' + this.indice + "/alumno/" + this.respondio.legajo);
    this.Items.set('/',this.respuestas);
    //this.Items = this.afDB.list('/Resultados/' + this.indice + '/respondieron/' + this.resp)
    //this.Items.set("/",this.respuestas);

    /*let Item = this.afDB.object('/Resultados/' + this.indice + "/alumno/" + this.respondio.legajo);
    Item.set(this.respuestas);*/
    this.navCtrl.setRoot(HomePage,{
      tipo:this.respondio.tipo,
      usuario:this.respondio
    });
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResponderPage');
  }

}
