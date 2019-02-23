import { VerEstadisticaPage } from '../ver-estadistica/ver-estadistica';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';
import { Chart } from 'chart.js';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Materia } from '../../entidades/materia';

@IonicPage()
@Component({
  selector: 'page-estadisticas',
  templateUrl: 'estadisticas.html',
})
export class EstadisticasPage {

  usuarioActual: any;
  perfilActual: any;
  Respuestas: AngularFireList<any>;
  respuesta: Observable<any>;
  public Items: AngularFireList<any>;
  public items: Observable<any>;

  ListaRespuestas: Array<any> = [];
  codigo = this.navParams.get("codigo");
  estado = false;
  check = false;
  Encuesta: any[] = new Array<any>();
  pregunta: string = "";
  listEncuesta: any[] = new Array<any>();

  tipo = "";
  pieChartLabels: Array<string> = [];
  pieChartData: Array<number> = [];
  pieChartType: string = 'pie';
  pieChartColor: Array<any> = [];

  public Results: AngularFireList<any>;
  public results: Observable<any>;
  elegir: boolean = false;
  alumno = {} as Materia;
  cursaPPS4A: boolean = false;
  cursaPPS4B: boolean = false;
  cursaLAB44A: boolean = false;
  cursaLAB44B: boolean = false;
  encues: any[] = new Array<any>();

  materias: any[] = new Array<any>();
  cursos: any[] = new Array<any>();
  preguntas: any[] = new Array<any>();
  opciones: any[] = new Array<any>();
  respuestas: any[] = new Array<any>();
  indice: any;
  legajos: any[] = new Array<any>();
  bandera: boolean = false;
  public Questions: AngularFireList<any>;
  public quests: Observable<any>;
  listaPreguntas: any[] = new Array<any>();

  scannedCode = null;
  Encuestas: AngularFireList<any>;
  encuestas: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public afDB: AngularFireDatabase,public alertCtrl: AlertController, private barcodeScanner: BarcodeScanner) {
    /*var encuesta = this.codigo.split("-");
    this.Encuesta = encuesta[0];
    this.usuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.perfilActual = this.usuarioActual.perfil;
    this.Items = afDB.list('Encuestas');
    this.items = this.Items.valueChanges();
    this.items.subscribe(
      quest => {
        for (let i = 0; i < quest.length; i++) {
          if (quest[i].Codigo == this.codigo) {
            this.tipo = quest[i].Preguntas[0].tipo;

              this.pregunta = quest[i].Preguntas[0].question;
              if (quest[i].Preguntas[0].tipo == 'U') {
                for (let y = 0; y < quest[i].Preguntas[0].opciones.length; y++) {
                  this.ListaRespuestas.push({ "respuesta": quest[i].Preguntas[0].opciones[y], "cantidad": 0 });
                  //this.pieChartData.push();
                  this.pieChartLabels.push(quest[i].Preguntas[0].opciones[y]);
                }
              }
            
            break;
          }
        }
      }
    );*/
    this.traerLegajos();
    
    this.Results = afDB.list('Resultados');
    this.results = this.Results.valueChanges();
    this.results.subscribe(res => {
      //console.log(res);
      for (var i = 0; i < res.length; i++) {
        if (res[i].tipo == "U") {
          if (res[i].alumno == 0) {
            //break;
          }
          else {
            this.Encuesta.push(res[i].encuesta);
            this.listEncuesta.push(res[i]);
            for (var j = 0; j < this.legajos.length; j++) {
              if (res[i].alumno[this.legajos[j]] != undefined) {
                //console.log(res[i].alumno[this.legajos[j]]);
              }

            }
          }
        }
      }

      
      console.log(res);
    });
    this.traerPreguntas();

  }
  navegar(donde: any) {

    for (var i = 0; i < this.listEncuesta.length; i++) {

      if (donde == this.listEncuesta[i].encuesta) {
        console.log(this.listaPreguntas[i]);
        this.navCtrl.push(VerEstadisticaPage, {
          encuesta: this.listEncuesta[i],
          preguntas: this.listaPreguntas[i],
          legajos:this.legajos
        })
        
      }

    }

  }

  traerPreguntas()
  {
    this.Items = this.afDB.list('Encuestas');
    this.items = this.Items.valueChanges();
    this.items.subscribe(preg => {
      for (var i = 0; i < preg.length; i++) {
        for (var j = 0; j < this.Encuesta.length; j++) {
          if(preg[i].Nombre == this.Encuesta[j])
          {
              this.listaPreguntas.push(preg[i].Preguntas);
              //console.log(this.Encuesta);
              //console.log('hola',preg[i].Nombre,this.Encuesta[j]);
              console.log('hola' + i,this.listaPreguntas);
          }
          
        }
        //if(preg[i].Nombre == this.Encuesta)
      }
    });
  }

  async traerLegajos() {
    this.Items = this.afDB.list('prueba');
    this.items = this.Items.valueChanges();
    await this.items.subscribe(alum => {
      console.log('hola');
      //console.log(res[i]);

      for (var j = 0; j < alum.length; j++) {
        //console.log(res[i].alumno[alum[j].legajo]);
        //console.log(res[i].alumno);
        if (alum[j].legajo != undefined) {
          this.legajos[j] = alum[j].legajo;
        }

      }
      //console.log(this.legajos);
    });
  }


  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ObtenerCantidades() {
    this.results.subscribe(
      rest => {
        for (let i = 0; i < rest.length; i++) {
          if (rest[i].cuestionario == this.codigo) {
            if (!this.check) {
              for (let y = 0; y < this.ListaRespuestas.length; y++) {
                if (this.ListaRespuestas[y].results == rest[i].respuestas[0].results) {
                  this.ListaRespuestas[y].cantidad++;
                }
              }
            }
            else {
              if (rest[i].respuestas[0].results == true) {
                this.ListaRespuestas[0].cantidad++;
              }
              else {
                this.ListaRespuestas[1].cantidad++;
              }
            }
            /*this.Aula.Numero = aula[i].Numero;
            this.Aula.Materia = aula[i].Materia;
            this.Aula.Profesor = aula[i].Profesor;
            this.Aula.Alumnos = [];
            for(let y=0;y<aula[i].Alumnos.length;y++)
            {
              this.Aula.Alumnos.push(aula[i].Alumnos[y]);
            }
            //this.Aula.Alumnos = aula[i].Alumnos;
            break;*/
          }
        }
        for (let z = 0; z < this.ListaRespuestas.length; z++) {
          this.pieChartData.push(this.ListaRespuestas[z].cantidad);
          /*switch(z)
          {
            case 0:
            this.pieChartData.push(1);
            break;
            case 1:
            this.pieChartData.push(1);
            break;
            case 2:
            this.pieChartData.push(4);
            break;
            case 3:
            this.pieChartData.push(1);
            break;
            case 4:
            this.pieChartData.push(1);
            break;
          }*/
        }
        this.mostrar();
      }
    );
  }
  mostrar() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: this.pieChartType,
      //type: "pie",
      data: {
        labels: this.pieChartLabels,
        //labels: ["A","B","C","D","E"],
        datasets: [{
          label: this.pieChartLabels,
          //data:[4,5,6,7,8],
          data: this.pieChartData,
          backgroundColor: [
            'rgba(0, 0, 0, 0.3)',
            'rgba(230, 0, 0, 0.4)',
            'rgba(0, 255, 0, 0.4)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(230, 44, 44, 1)',
            'rgba(0, 107, 0, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 2
        }]
      },
      /*options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }*/
    });
    this.estado = true;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadisticaEncuestaPage');
  }

  buscarinfo()
  {
    let mensaje = "";
    let titulo="";
    this.Encuestas = this.afDB.list('Encuestas');
    this.encuestas = this.Encuestas.valueChanges();

    this.barcodeScanner.scan().then(barcodeData => {

      this.scannedCode = barcodeData.text;

          this.encuestas.forEach(element => {
            element.forEach(encuesta => {
              
              if (encuesta.Nombre == this.scannedCode) 
              {
                titulo=encuesta.Nombre;
                mensaje = mensaje + " Materia: " + encuesta.materia;
                mensaje = mensaje + "<br> Curso: " + encuesta.curso;
                mensaje = mensaje + "<br> Profesor: " + encuesta.Profesor;
                mensaje = mensaje + "<br> Fecha de inicio: " + encuesta.FechaComienzo;
                mensaje = mensaje + "<br> Fecha de finalizacion: " + encuesta.FechaFin;
              }
            });
          });
          setTimeout(() => {
            if (titulo == "") {
              this.mensaje("", "No se encontro encuesta");
            }
            else {
              this.mensaje(titulo, mensaje);
            }
          }, 300);


    }, (err) => {
      this.mensaje('Error: ', err);
    });

  }
  mensaje(t, m) {
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: m,
      buttons: ['Aceptar']
    });
    alert.present();
  }
}
