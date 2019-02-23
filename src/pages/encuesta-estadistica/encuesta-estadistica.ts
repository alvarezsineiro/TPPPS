import { ResponderPage } from '../responder/responder';
import { Encuesta } from '../../entidades/encuesta';
import { Materia } from '../../entidades/materia';
import { async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the EncuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encuesta-estadistica',
  templateUrl: 'encuesta-estadistica.html',
})
export class EncuestaEstadisticaPage {

  usuarioActual: any;

  public Items: AngularFireList<any>;
  public items: Observable<any>;
  public Results: AngularFireList<any>;
  public results: Observable<any>;
  elegir: boolean = false;
  alumno = {} as Materia;
  cursaPPS4A: boolean = false;
  cursaPPS4B: boolean = false;
  cursaLAB44A: boolean = false;
  cursaLAB44B: boolean = false;
  encues: any[] = new Array<any>();
  listaEncuestas: any[] = new Array<any>();
  materias: any[] = new Array<any>();
  cursos: any[] = new Array<any>();
  preguntas: any[] = new Array<any>();
  opciones: any[] = new Array<any>();
  respuestas: any[] = new Array<any>();
  indice: any;
  bandera: boolean = false;
  encuestasPendientes = true;
  bandera1: boolean = true;
  bandera2: boolean = false;



  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase, public alertCtrl: AlertController) {
    this.usuarioActual = this.navParams.get("usuario");
    //console.log("usuario",this.usuarioActual);
    this.encontrarAlumno();
    this.Items = afDB.list('Encuestas');
    this.Results = afDB.list('Resultados');
    this.results = this.Results.valueChanges();
    var tiempoActual = Date.now();
    this.items = this.Items.valueChanges();
    this.items.subscribe(
      quest => {
        for (let i = 0; i < quest.length; i++) {
          if (quest[i].habilitado == true) {
            for (var y = 0; y < this.materias.length; y++) {
              if (quest[i].materia == this.materias[y]) {
                for (var x = 0; x < this.cursos.length; x++) {
                  if (quest[i].curso == this.cursos[x]) {
                    if (quest[i].TiempoFin > tiempoActual) {
                      this.results.subscribe(result => {
                        //console.log(result.length);
                        for (var j = 0; j < result.length; j++) {
                          //console.log(result[j].alumno[this.usuarioActual.legajo]);
                          if (result[j].alumno[this.usuarioActual.legajo] != undefined) {
                            if (result[j].encuesta == quest[i].Nombre) {
                              this.bandera = true;
                            }
                          }
                        }
                        if (this.bandera) {
                          this.bandera = false;
                        }
                        else {
                          this.alumno.tipo = quest[i].tipo;
                          this.alumno.quest = quest[i].Nombre;
                          for (let z = 0; z < this.encues.length; z++) {
                            if (this.encues[z] == this.alumno.quest) {
                              this.bandera1 = false;
                            }
                          }
                          if (this.bandera1) {
                            this.encues.push(this.alumno.quest);
                            this.bandera2 = true;
                          }
                          else
                            this.bandera1 = true;

                          this.listaEncuestas = quest;

                          console.log(this.encues);
                          console.log(this.alumno.quest, i);
                          console.log('y', y);
                          console.log('x', x);
                          console.log(this.encues.length);
                          //if (this.encues.length == 0) 
                          //{
                            this.encuestasPendientes = false;
                          //}
                        }
                        /*if (this.bandera2)
                        {
                          console.log("entre");
                          this.encuestasPendientes = true;
                          this.bandera2 = false;
                        }*/
                      });
                    }
                  }
                }
              }
            }
          }
          else {
            this.encues.push("");
          }
        }
       /* console.log(this.encues);
        console.log("hola");
        for (let index = 0; index < this.encues.length; index++) {
          console.log(this.encues[index]);
          if (this.encues[index] != "") {
            console.log("hola mama", index);
            this.bandera2 = true;
          }
        }*/
        
          
      }
    );
    //console.log(this.encues);
  }

  averiguar() {

  }

  responder(nombre: any) {
    for (var i = 0; i < this.listaEncuestas.length; i++) {
      if (this.listaEncuestas[i].Nombre == nombre) {
        this.indice = i;
        let encuesta = this.listaEncuestas[i];
        this.navCtrl.setRoot(ResponderPage, {
          encuesta: encuesta,
          user: this.usuarioActual,
          indice: this.indice
        })
      }
    }
    /* 
     this.P = true;
     this.U = true;
     this.M = true;
    for (var i = 0; i < this.listaEncuestas.length; i++) {
      if(this.listaEncuestas[i].Nombre == nombre)
      {
        let encuesta = this.listaEncuestas[i];
        for (var x = 0; x < encuesta.Preguntas.length; x++) {
           this.preguntas.push(encuesta.Preguntas[x]);
 
        }  
        if(encuesta.tipo == "U" ) 
        {
         for (var x = 0; x < encuesta.Preguntas.length; x++) {
           this.opciones.push(encuesta.Preguntas[x].opciones);
 
        }  
 
        }
        console.log(this.preguntas);   
      // console.log(this.listaEncuestas[i].tipo);
         if(encuesta.tipo == "P")
         {     
 
           this.P = false;
           this.U = true;
           this.M = true;
         }
         if(encuesta.tipo == "U")
         {
 
           this.P = true;
           this.U = false;
           this.M = true;
         }
         if(encuesta.tipo == "M")
         {
           this.P = true;
           this.U = true;
           this.M = false;
         }
      }
      
    }*/
  }
  async encontrarAlumno() {
    this.Items = this.afDB.list("PPS/4A");
    this.items = this.Items.valueChanges();
    this.items.subscribe(cantidad => {
      for (var i = 0; i < cantidad.length; i++) {
        if (this.usuarioActual.legajo == cantidad[i].legajo) {
          this.cursaPPS4A = true;
          //console.log(this.cursaPPS4A);
          this.materias.push("PPS");
          this.cursos[0] = "4A";
        }
      }
    });

    this.Items = this.afDB.list("PPS/4B");
    this.items = this.Items.valueChanges();
    this.items.subscribe(cantidad => {
      for (var i = 0; i < cantidad.length; i++) {

        if (this.usuarioActual.legajo == cantidad[i].legajo) {
          this.cursaPPS4B = true;
          this.materias.push("PPS");
          this.cursos.push("4B");
        }
      }
    });

    this.Items = this.afDB.list("LAB4/4A");
    this.items = this.Items.valueChanges();
    this.items.subscribe(cantidad => {
      for (var i = 0; i < cantidad.length; i++) {
        if (this.usuarioActual.legajo == cantidad[i].legajo) {
          this.cursaPPS4B = true;
          this.materias.push("LAB4");
          if (this.cursos[0] == "4A")
            break;
          else
            this.cursos.push("4A");
        }
      }
    });

    this.Items = this.afDB.list("LAB4/4B");
    this.items = this.Items.valueChanges();
    this.items.subscribe(cantidad => {
      for (var i = 0; i < cantidad.length; i++) {
        if (this.usuarioActual.legajo == cantidad[i].legajo) {
          this.cursaPPS4B = true;
          this.materias.push("LAB4");
          if (this.cursos[0] == "4B")
            break;
          else
            this.cursos.push("4B");
        }
      }
    });

    /* this.Items = this.afDB.list("PPS/4B");
     this.items = this.Items.valueChanges();
     this.items.subscribe(cantidad => this.cant = cantidad);
     this.Items = this.afDB.list("LAB4/4A");
     this.items = this.Items.valueChanges();
     this.items.subscribe(cantidad => this.cant = cantidad);
     this.Items = this.afDB.list("LAB4/4B");
     this.items = this.Items.valueChanges();
     this.items.subscribe(cantidad => this.cant = cantidad);*/
  }
  enviar() {
    console.log(this.cursaPPS4A);
    console.log(this.cursaPPS4B);
    console.log(this.cursaLAB44B);
    console.log(this.cursaLAB44A);
    console.log(this.materias);
    console.log(this.cursos);
    console.log(this.alumno);
    console.log(this.encues);
    console.log(this.listaEncuestas);
    console.log(this.respuestas);

    //console.log(this.respuestas);
    //console.log(this.preguntas);
    /* var item: any = {};
     //var objeto: any = {};
     item.Alumno = this.usuarioActual.nombre+" "+ this.usuarioActual.apellido;
     item.cuestionario = this.codigo;
     var respuestas: Array<any> = [];
     for(let i=0;i<this.preguntas.length;i++)
     {
       //objeto.respuesta = this.respuestas[i];
       //objeto.pregunta = this.preguntas[i];
       //console.log(objeto);
       respuestas.push({respuesta:this.respuestas[i],pregunta:this.preguntas[i]});
     }
     item.respuestas = respuestas;
     console.log(respuestas);
     this.Results.push(item);*/
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaPage');
  }

}