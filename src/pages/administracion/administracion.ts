import { Faltas } from '../../entidades/datosAdmin';
import { Alta } from '../../entidades/alta';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

/**
 * Generated class for the AdministracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-administracion',
  templateUrl: 'administracion.html',
})
export class AdministracionPage {
  public cant: Array<any> = new Array<any>();
  public cant1: Array<any> = new Array<any>();
  public Items: AngularFireList<any>;
  public items: Observable<any>;
  legajo: number;
  alum = {} as Faltas;
  mostrar: boolean = true;
  boton: boolean = true;
  curso: boolean = true;
  opcion: string;
  opcion1: string;
  busqueda: boolean = false;
  band: number;
  i: number = 0;
  dia: number = 1;
  mes: number = 9;
  desabilitar = false;
  constructor(public navCtrl: NavController, public tst: ToastController, public navParams: NavParams, public afDB: AngularFireDatabase, private http: Http) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministracionPage');
  }
  async leerDB() {
    this.Items = this.afDB.list('/' + this.opcion + "/" + this.opcion1 + "/");
    this.items = this.Items.valueChanges();
    this.items.subscribe(cantidad => this.cant = cantidad);
  }
  agregar() {
    this.alum.faltas = (this.alum.faltas + 1);
    for (var i = 0; i < this.cant.length; i++) {
      if (this.cant[i].legajo == this.legajo) {
        this.Items = this.afDB.list('/' + this.opcion + "/" + this.opcion1 + "/" + i);
        this.Items.set("/faltas", this.alum.faltas);
      }
    }
  }

  remover() {
    this.band = (this.alum.faltas - 1);
    console.log(this.band);
    if (this.band >= 0) {
      this.alum.faltas = this.band;
      for (var i = 0; i < this.cant.length; i++) {
        if (this.cant[i].legajo == this.legajo) {
          this.Items = this.afDB.list('/' + this.opcion + "/" + this.opcion1 + "/" + i);
          this.Items.set("/faltas", this.alum.faltas);
          this.Items.set("/diasFaltas/" + (this.alum.faltas+1) + '/', null)
        }
      }
      this.desabilitar = true;
    }
    else {
      let tost = this.tst.create({
        message: "No puede tener menos de 0 faltas",
        duration: 3000,
        position: 'middle'
      });
      tost.present();
    }
  }

  f() {
    this.curso = false;
  }
  g() {
    this.boton = false;
  }
  buscarDeNuevo() {
    this.busqueda = false;
    this.mostrar = true;
  }
  buscar() {
    if (this.legajo != null) {
      this.leerDB();
      setTimeout(() => {
        console.log(this.cant1);
        for (var i = 0; i < this.cant.length; i++) {
          if (this.legajo == this.cant[i].legajo) {
            this.alum = this.cant[i];
            this.mostrar = false;
            this.busqueda = true;
            console.log(this.alum);
            break;
          }

        }


      }, 500);



    }
    else {
      let tost = this.tst.create({
        message: "Ingrese el legajo",
        duration: 3000,
        position: 'middle'
      });
      tost.present();
    }

  }

}
