import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-encuestas',
  templateUrl: 'encuestas.html',
})

export class EncuestasPage {

  usuarioActual: any;
  perfilActual: any;
  des: boolean = false;

  public formato: string;
  public cantidad: number = 2;
  public horas: number;

  public question: string = "";
  public nombre: string = "";
  public DateStart: Date;
  public DateEnd: Date;

  public option: Array<string> = ["", "", "", "", "", ""];
  public respuesta: string = "";
  public materia: string = "";
  public encuesta: Array<any> = [];
  public cant: Array<number> = [1, 2, 3, 4, 5];
  public cant1: Array<any> = new Array<any>();
  public indice: number;
  public curso: string;
  public tipo: string;

  public boton: boolean = false;
  otra: boolean = true;
  mostrar: boolean = false;
  cursar: boolean = true;
  datos: boolean = true;

  public Results: AngularFireList<any>;
  public results: Observable<any>;
  Encuesta: any[] = new Array<any>();
  listEncuesta: any[] = new Array<any>();
  listaPreguntas: any[] = new Array<any>();
  legajos: any[] = new Array<any>();
  modificarEncuesta: boolean = false;

  //items: Observable<any[]>;
  Items: AngularFireList<any>;
  OtroItems: AngularFireList<any>;
  items: Observable<any>;
  public Profesores: AngularFireList<any>;
  public profesores: Observable<any>;
  public Materias: Array<string> = [];
  nombres: Array<string> = [];
  preguntas: Array<string> = [];
  cambiarEncuesta: boolean = false;
  cambiarPregunta: boolean = false;
  pregunta: string = null;
  preguntaAnterior: string = null;
  usuario: Array<string> = [];
  nombreActual: string = null;


  public Aux: AngularFireList<any>;
  public aux: Observable<any>;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public afDB: AngularFireDatabase, public navParams: NavParams,private toastCtrl: ToastController) {
    //this.items = afDB.list('Encuestas').valueChanges();
    this.usuario = this.navParams.get('usuario');
    this.Items = afDB.list('Encuestas');
    this.items = this.Items.valueChanges();
    this.items.subscribe(cantidad => this.indice = cantidad.length);
    this.usuarioActual = this.navParams.get("usuario");
    this.perfilActual = this.usuarioActual.tipo;
    this.Profesores = afDB.list('prueba');
    this.profesores = this.Profesores.valueChanges();
    //console.log(this.profesores);
    this.profesores.subscribe(profesor => {
      for (var i = 0; i < profesor.length; i++) {
        if (profesor[i].tipo == "profesor") {
          this.cant1.push(profesor[i]);
        }
      }
    });

    this.traerEncuestas();
  }

  traerEncuestas() {
    this.Results = this.afDB.list('Encuestas');
    this.results = this.Results.valueChanges();
    this.results.subscribe(res => {
      //console.log(res);
      for (var i = 0; i < res.length; i++) {
        if (res[i].habilitado == true) {
          this.nombres.push(res[i].Nombre);
          this.listEncuesta.push(res[i]);
          /*for (let j = 0; j < res[i].Preguntas.length; j++) {
            this.preguntas.push(res[i].Preguntas[j].question);
          }*/

          /*this.Encuesta.push(res[i].encuesta);
          this.listEncuesta.push(res[i]);*/
        }
        else {
          this.nombres.push("");
          this.listEncuesta.push("");
        }
      }

      this.nombres.reverse();
      console.log(res);
    });
  }

  cambiar(nombre) {
    this.cambiarEncuesta = true;

    for (let i = 0; i < this.listEncuesta.length; i++) {
      if (this.listEncuesta[i].Nombre == nombre) {
        this.nombreActual = nombre;
        for (let j = 0; j < this.listEncuesta[i].Preguntas.length; j++) {
          this.preguntas.push(this.listEncuesta[i].Preguntas[j].question);
        }
      }
    }
  }

  cambiarPreg(nombre) {

    this.Aux = this.afDB.list('Resultados');
    this.aux = this.Aux.valueChanges();
    let modificar=true;

    this.aux.forEach(encuestas => {
      encuestas.forEach(encuesta => {
        console.log(encuesta);
        if ((encuesta.encuesta==this.nombreActual)&&(encuesta.alumno!=0)) {
          modificar=false;
        }
      });

    });
    setTimeout(() => {
    if (!modificar) {
      let tost = this.toastCtrl.create({
        message: 'No puede modificar la encuesta debido a que ya fue contestada',
        duration: 3000,
        position: 'middle'
      }).present();
    }
    else {
      this.cambiarPregunta = true;
      console.log(nombre);
      for (let i = 0; i < this.listEncuesta.length; i++) {
        if (this.listEncuesta[i].Preguntas != undefined) {
          for (let j = 0; j < this.listEncuesta[i].Preguntas.length; j++) {
            if (this.listEncuesta[i].Preguntas[j].question == nombre) {
              this.pregunta = nombre;
              this.preguntaAnterior = nombre;
            }
          }
        }
      }
    }
    }, 300);

  }

  guardarCambioPreg() {
    for (let i = 0; i < this.listEncuesta.length; i++) {
      if (this.listEncuesta[i].Preguntas != undefined) {
        for (let j = 0; j < this.listEncuesta[i].Preguntas.length; j++) {
          if (this.listEncuesta[i].Preguntas[j].question == this.preguntaAnterior) {
            this.listEncuesta[i].Preguntas[j].question = this.pregunta;
            console.log(this.listEncuesta[i].Preguntas[j].question);
            this.Items.set('/' + i, this.listEncuesta[i]);
            this.guardarCambios();
            this.traerEncuestas();
            this.navCtrl.setRoot(EncuestasPage, { tipo: 'profesor', usuario: this.usuario });
          }
        }
      }
    }
  }

  borrarEnc() {
    for (let i = 0; i < this.listEncuesta.length; i++) {
      if (this.listEncuesta[i].Nombre == this.nombreActual) {
        this.Items.set('/' + i + '/habilitado', false);
        this.OtroItems = this.afDB.list('Resultados');
        this.OtroItems.valueChanges();
        this.OtroItems.set('/' + i + '/habilitado', false);
        this.navCtrl.setRoot(EncuestasPage, { tipo: 'profesor', usuario: this.usuario });
      }

    }
  }

  guardarCambios() {
    this.cambiarEncuesta = false;
    this.cambiarPregunta = false;
    this.modificarEncuesta = false;
  }

  lock() {
    this.des = true;

  }

  modificar() {
    this.modificarEncuesta = true;
  }

  AgregarQuestion() {
    var item: any = {};
    item.question = this.question;
    item.indice = this.encuesta.length;
    switch (this.formato) {
      case 'P':
        this.tipo = 'P';
        this.encuesta.push(item);
        break;
      case 'U':
        this.tipo = 'U';
        item.opciones = [];
        for (let i = 1; i <= this.cantidad; i++) {
          item.opciones.push(this.option[i]);
          console.log(this.option);
        }
        this.encuesta.push(item);
        break;
    }
    this.question = "";
    this.respuesta = "";
    this.cantidad = 2;
    this.option = [];

  }

  SubirQuestion() {
    var item: any = {};
    var tiempoActual = Date.now();
    var tiempoFin = tiempoActual + (this.horas * 3600000);
    console.log(tiempoFin);
    item.Nombre = this.nombre;
    item.materia = this.materia;
    item.Profesor = this.usuarioActual.usuario;
    item.curso = this.curso;
    item.FechaComienzo = new Date(tiempoActual).getDate() + "-" + (new Date(tiempoActual).getMonth() + 1) + "-" +
      new Date(tiempoActual).getUTCFullYear() + "-" + new Date(tiempoActual).getHours() + "-" + new Date(tiempoActual).getMinutes();
    item.FechaFin = new Date(tiempoFin).getDate() + "-" + (new Date(tiempoFin).getMonth() + 1) + "-" +
      new Date(tiempoFin).getUTCFullYear() + "-" + new Date(tiempoFin).getHours() + "-" + new Date(tiempoFin).getMinutes();
    item.TiempoFin = tiempoFin;
    item.tipo = this.tipo;
    item.Preguntas = this.encuesta;
    item.habilitado = true;
    var resultadoEncuesta: any = {};
    resultadoEncuesta.alumno = 0;
    resultadoEncuesta.curso = this.curso;
    resultadoEncuesta.encuesta = this.nombre;
    resultadoEncuesta.id = this.indice;
    resultadoEncuesta.materia = this.materia;
    resultadoEncuesta.profesor = this.usuarioActual.usuario;
    resultadoEncuesta.tipo = this.tipo;
    resultadoEncuesta.habilitado = true;
    console.log(item);
    this.Items.set('/' + this.indice, item);
    this.OtroItems = this.afDB.list('Resultados');
    this.OtroItems.valueChanges();
    this.OtroItems.set('/' + this.indice + '/', resultadoEncuesta);
    console.log(this.usuarioActual);
    this.otra = false;
    this.boton = true;
    this.mostrar = true;
    this.datos = true;
    this.navCtrl.setRoot(HomePage, { tipo: 'profesor', usuario: this.usuario });
  }

  f() {
    this.cursar = false;
  }
  g() {
    this.mostrar = true;
    this.datos = false;
  }
  otraE() {
    this.otra = true;
    this.boton = false;
    this.mostrar = false;
    this.materia = "";
    this.curso = "";
    this.des = false;
    this.formato = "";
  }


  public mychange(event) {
    console.log(this.cantidad); // mymodel has the value before the change
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestasPage');
  }
}