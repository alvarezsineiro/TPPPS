import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import { Perfil } from '../../entidades/perfil';
/**
 * Generated class for the FaltasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faltas',
  templateUrl: 'faltas.html',
})
export class FaltasPage {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData = [];
  curso: string[] = [];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public Lista: AngularFireList<any>;
  public lista: Observable<any>;

  usuario = {} as Perfil;
  ok = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase) {

    this.usuario = this.navParams.get("usuario");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaltasPage');
    this.cargar();
  }

  cargar() {
    this.Lista = this.afDB.list('lista');
    this.lista = this.Lista.valueChanges();

    
    let cursos = ["4A", "4B"];
    let materia= ["PPS", "LAB4"];
    

    cursos.forEach(curso => {
    
    
     
      this.lista.forEach(tomalista => {

         materia.forEach(mat => {
       let presente = 0;
      let ausente = 0;
      let esta = false;


       console.log(tomalista);
        tomalista.forEach(element => { 
          


          if (element[curso] != undefined) {

            if (element.materia==mat) {
              
            for (let index = 0; index < element[curso].length; index++) {


              if (element[curso][index].legajo == this.usuario.legajo) {

                console.log(element);
                this.curso.forEach(element => {

                  if (element == curso) {
                    esta = true;
                  }
                });
                if (esta == false) {
                  this.curso.push(curso);
                }

                if (element[curso][index].vino == true) {
                  presente = presente + 1;
                  //console.log(presente);
                }
                else {
                  ausente = ausente + 1;
                  //console.log(ausente);
                }
              }
            }
          }
          
          }


        });
        if ((ausente != 0) || (presente != 0)) {
          console.log(this.barChartData);
          this.barChartLabels.push("Materia: "+mat+" - Curso: "+ curso);
          this.barChartData.push([{ data: [ausente], label: 'Ausentes' }, { data: [presente], label: 'Presentes' }]);
          this.ok = true;
        }

      });
});
    });
    
  }

}

