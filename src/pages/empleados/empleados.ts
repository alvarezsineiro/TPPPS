import { Http } from '@angular/http';
import { Alta } from '../../entidades/alta';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import * as baby from 'babyparse';
/**
 * Generated class for the EmpleadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-empleados',
  templateUrl: 'empleados.html',
})
export class EmpleadosPage {

  alta = {} as Alta;
  public usuariosList: AngularFireList<any>;
  public usuariosObs: Observable<any>;
  public usuarios: Array<any>;
  id: number;
  opcion: string;
  mostrar: boolean = false;
  uno: boolean = true;
  varios: boolean = true;
  public Items: AngularFireList<any>;
  public items: Observable<any>;
  band: boolean = false;
  public csvItem: any[] = [];
  logo: any;
  csvData: any[] = [];
  public mat: string;
  public cant: Array<any> = new Array<any>();
  bandera: boolean = true;
  numero: string;
  flag:boolean=false;
  sele:string="profesor";

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase, private http: Http,public alertCtrl: AlertController) {
    this.alta.edad = "sin definir";
    this.alta.email = "sin definir";
    this.alta.sexo = "sin definir";
    this.alta.usuario = "sin definir";

    this.leerDB();
  }

  f() {
    switch (this.opcion) {
      case "uno":
        this.uno = false;
        this.varios = true;
        break;
      case "var":
        this.uno = true;
        this.varios = false;
        break;
      default:
        break;
    }
  }

  enviar() {

    for (var index = 0; index < this.usuarios.length; index++) {
      var element = this.usuarios[index].id;
      this.id = element;
    }

    var lastId = (this.id + 1);
    this.alta.id = lastId;
    try {
      for (let i = 0; i < this.numero.length; i++) {
        console.log(this.numero[i]);
        if (this.numero[i] == '.' || this.numero[i] == 'e' || this.numero[i] == ',' || this.numero[i] == " " || this.numero[i] == "-") {
          console.log("entre");
          this.bandera = false;
        }
      }
      if (this.bandera) {
        this.alta.legajo = Number(this.numero);
        if (this.alta.legajo == 0) {
          console.log("introduzca un legajo");
          this.mensaje("Error", "Legajo invalido");
        }
        else {
          for (var i = 0; i < this.cant.length; i++) {
            console.log(this.cant[i].legajo);
            if (this.alta.legajo == this.cant[i].legajo) {
              this.band = true;
            }
          }
          if (!this.band) {
            if (this.alta.usuario != "sin definir" && this.alta.usuario.length >= 6) {
              const itemRef = this.afDB.object('/prueba/' + lastId + "/");
              itemRef.set(this.alta);
              this.mensaje("Exito", "Usuario guardado con exito");

            }
            else {
              console.log("ingrese un usuario valido con mas de 6 caracteres");
              this.mensaje("Error", "Ingrese un usuario valido con mas de 6 caracteres");
            }
          }
          else {
            this.band = false;
            console.log("ya existe ese legajo");
            this.mensaje("Error", "Ya existe ese legajo");
          }
        }
      }
      else {
        this.bandera = true;
        console.log("no es un numero");
        this.mensaje("Error", "Legajo invalido");
      }
    } catch (error) {

    }
  }

  ionViewDidLoad() {
    this.usuariosList = this.afDB.list('/prueba');
    this.usuariosObs = this.usuariosList.valueChanges();
    this.usuariosObs.subscribe(
      user => this.usuarios = user,
    );
  }

  private readCsvData() {
    if ( this.alta.tipo==null) {
      this.mensaje("Error","Seleccione un tipo");
    }else if ( this.flag==false) {
      this.mensaje("Error","Seleccione un archivo");
    }
    else
    {
    console.log("hola1");
    this.http.get(this.logo)
      .subscribe(
      data => this.extractData(data),
      err => this.handleError(err),
    );
    }
  }
  private handleError(err) {
  }
  private extractData(res) {
    let csvData = res['_body'] || '';
    let parsedData = baby.parse(csvData, {
      header: false,
      dynamicTyping: true,
      encoding: "UTF-8",

    }).data;
    console.log("hola2");
    this.csvData = parsedData;
    console.log("despues CSV", this.formatParsedObject(this.csvData, false));
  }

  handleUpload(e) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      //this.materia = e.target.files;
      console.log("hola");
      reader.onload = (e: any) => {
        this.logo = e.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
      this.flag=true;
    }
  }

  formatParsedObject(arr, hasTitles) {
    console.log("array", arr);
    let legajo,
      nom,
      cursa,
      obj = [];

    for (var j = 0; j < arr.length - 1; j++) {
      console.log(arr[j][0]);
      let items = arr[j][0];
      let items1 = arr[j][1];
      let array = items.split(";");
      let array1 = items1.split(";");

      for (var i = 0; i < this.cant.length; i++) {

        if (array[0] == this.cant[i].legajo) {
          if (this.cant[i].actividad == "inactivo") {
            this.Items = this.afDB.list("/prueba/" + i);
            this.Items.set("/actividad", "activo");
          }

          this.band = true;
          //this.materias = this.cant[i].materias;
        }

      }

      if (!this.band) {
        this.Items = this.afDB.list("/prueba/" + (j + this.cant.length));
        this.Items.set("/pass", array[0]);
        this.Items.set("/legajo", array[0]);
        this.Items.set("/tipo", this.alta.tipo);
        this.Items.set("/sexo", "sin definir");
        this.Items.set("/edad", "sin definir");
        this.Items.set("/email", "sin definir");
        this.Items.set("/usuario", array[1] + array1[0]);
        this.Items.set("/id", (j + this.cant.length));
        this.Items.set("/actividad", "activo");
      }
      else {
        this.band = false;
      }

      obj.push({
        legajo: array[0],
        ape: array[1],
        nom: array1[0],
        dia: array1[1]
      });
    }
    this.csvItem = obj;
    this.leerDB();
    this.mensaje("Exito","Se cargo archivo con exito");
  }

  async leerDB() {
    this.Items = this.afDB.list('/prueba/');
    this.items = this.Items.valueChanges();
    this.items.subscribe(cantidad => this.cant = cantidad);
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
