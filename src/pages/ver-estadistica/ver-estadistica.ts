import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
//import { Chart } from 'chart.js';

/**
 * Generated class for the VerEstadisticaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-estadistica',
  templateUrl: 'ver-estadistica.html',
})
export class VerEstadisticaPage {
  /*estado = false;
  check = false;
  Encuesta: any[] = new Array<any>();
 
  listEncuesta: any[] = new Array<any>();
  ListaRespuestas: Array<any> = [];
  tipo = "";
  pieChartLabels: Array<string> = [];
  pieChartData: Array<number> = [];
  pieChartType: string = 'pie';
  pieChartColor: Array<any> = [];*/


  encuesta: any;
  pregunta: string = "";
  nombreEnc: any;
  preguntas: any[] = [];

  opciones: string[] = [];
  cantidadPersonasVotos: number = 0;
  cantidadVotos: number[] = [];
  legajos: any[] = [];
  respuestas: any[] = [];
  a: number = 0;
  b: number = 0;
  c: number = 0;
  d: number = 0;
  f: number = 0;


  ok=false;
  public doughnutChartLabels = [];
  public doughnutChartData = [];//[[1,0,2],[0,1,2,3,4]];
  public doughnutChartType: string = 'doughnut';


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public ResultadoBD: AngularFireList<any>;
  public resultadoBD: Observable<any>;

  //pregunta: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase) {
    this.encuesta = this.navParams.get('encuesta');
    this.preguntas = this.navParams.get('preguntas');
    this.legajos = this.navParams.get('legajos');
    this.nombreEnc = this.encuesta.encuesta;


    //console.log(this.legajos);
    //this.pieChartLabels = this.encuesta;
    /*for (var i = 0; i < this.preguntas.length; i++) {
      //var element = array[i];
      
      for (var j = 0; j < this.preguntas[i].opciones.length; j++) {
        this.opciones.push(this.preguntas[i].opciones[j]);
        
      }
      console.log("opciones",this.opciones);
      //this.opciones.push(this.preguntas[i].opciones);
      //this.preguntas.push(this.pregunta[i].question);
      this.pregunta = this.preguntas[i].question;
      //console.log('tasukete',this.encuesta.alumno.length);
      
    }
    for (var i = 0; i < this.legajos.length; i++) {
      if(this.encuesta.alumno[this.legajos[i]]!= undefined)
      {
        for (var j = 0; j < this.opciones.length; j++) {

          if(this.encuesta.alumno[this.legajos[i]] == this.opciones[j])
          {
            if(j == 0)
            {
              this.a++;
            }
            else if(j == 1)
            {
              this.b++;
            }
            else if(j == 2)
            {
              this.c++;
            }
            else if(j == 3)
            {
              this.d++;
            }
            else if(j == 4)
            {
              this.f++;
            }
          }
          
        }
       
      }
        //this.respuestas.push(this.encuesta.alumno[this.legajos[i]]);
      
    }
    this.cantidadVotos.push(this.a);
    this.cantidadVotos.push(this.b);
    this.cantidadVotos.push(this.c);
    this.cantidadVotos.push(this.d);
    this.cantidadVotos.push(this.f);
    //console.log(this.opciones);

    this.mostrar();*/
    this.cargar();
  }

  cargar() {

    console.log(this.encuesta);
    console.log(this.preguntas);
    console.log(this.legajos);

    this.ResultadoBD = this.afDB.list('Resultados');
    this.resultadoBD = this.ResultadoBD.valueChanges();

    setTimeout(() => {}, 200);
    this.resultadoBD.forEach(arrayenc => {
      arrayenc.forEach(enc => {
        if (enc.encuesta == this.nombreEnc) {

          for (let j = 0; j < this.preguntas.length; j++) {
          let aux1: string[] = [];
          let aux2: number[] = [];
            for (let index = 0; index < this.preguntas[j].opciones.length; index++) {
              aux1.push(this.preguntas[j].opciones[index]) ;
              aux2.push(0); 
           }
            
            for (let ñ = 0; ñ < this.legajos.length; ñ++) {

              if (enc.alumno[this.legajos[ñ]] != undefined) {
                
                for (let k = 0; k < this.preguntas[j].opciones.length; k++) {
                  if (aux1[k]==enc.alumno[this.legajos[ñ]][j]) {
                    
                    aux2[k]=aux2[k]+1;
                    
                  }
                }
              }
            }
            this.doughnutChartLabels.push(aux1);
            this.doughnutChartData.push(aux2);
            this.ok=true;
            
          }
        }
      });
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerEstadisticaPage');
  }



  /*ObtenerCantidades() {
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
            break;
        }*/
  /*}
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
     }
   }
   this.mostrar();
 }
);
 }*/
  /* mostrar() {
     for (let z = 0; z < this.ListaRespuestas.length; z++) {
       this.pieChartData.push(this.ListaRespuestas[z].cantidad);
     }
     //this.pieChartData.push(this.pregunta.length);
     console.log(this.opciones);
     console.log(this.cantidadVotos);
     
 
     var ctx = document.getElementById("myChart");
     var myChart = new Chart(ctx, {
       type: this.pieChartType,
       //type: "pie",
       data: {
         labels: this.opciones,
         //labels: ["A","B","C","D","E"],
         datasets: [{
           label: "cantidad de votos",
           //data:[4,5,6,7,8],
           data: this.cantidadVotos,
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
     });
     console.log(myChart);
     this.estado = true;
   }*/




}