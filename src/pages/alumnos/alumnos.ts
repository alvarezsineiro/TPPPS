import { Alta } from '../../entidades/alta';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import * as baby from 'babyparse';
/**
 * Generated class for the AlumnosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alumnos',
  templateUrl: 'alumnos.html',
})
export class AlumnosPage {
  nombre:string;
  apellido:string;

  i:number = 0;
  alta = {} as Alta;
  public usuariosList: AngularFireList<any>;
  public usuariosObs: Observable<any>;
  public usuarios: Array<any>;
  id: number;
  opcion: string;
  mostrar: boolean = false;
  uno: boolean = true;
  varios: boolean = true;
  logo: any;
  csvData: any[] = [];
  public mat: string;
  public cant: Array<any> = new Array<any>();
  public Items: AngularFireList<any>;
  public items: Observable<any>;
  band: boolean = false;
  public csvItem: any[] = [];
  public materia: any[];
  numero:string;
  bandera: boolean = true;
  
  flag:boolean=false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase, private http: Http,public alertCtrl: AlertController) {
    this.alta.edad = "sin definir";
    this.alta.email = "sin definir";
    this.alta.sexo = "sin definir";
    this.alta.tipo = "alumno";
    this.alta.actividad = "activo";
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

  handleUpload(e) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      this.materia = e.target.files;

      reader.onload = (e: any) => {
        this.logo = e.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
      this.flag=true;
    }
  }
  enviar() {


    /*for (var index = 0; index < this.usuarios.length; index++) {
      var element = this.usuarios[index].id;
      this.id = element;
      console.log(element);
      console.log(this.id);
    }

    var lastId = (this.id + 1);
    this.alta.id = lastId;


    console.log(this.id);
    console.log(lastId);
    console.log(this.alta);
    console.log("inicio" + JSON.stringify(this.usuarios));
    try {
      const itemRef = this.afDB.object('/prueba/' + lastId + "/");
      itemRef.set(this.alta).then(success => {this.leerDB()}).catch(er => console.error(er));
    } catch (error) {
      console.log(error);
      console.log(this.id);
      console.log(lastId);
      console.log(this.alta);
      console.log("inicio" + JSON.stringify(this.usuarios));

    }*/
    for (var index = 0; index < this.usuarios.length; index++) {
      var element = this.usuarios[index].id;
      this.id = element;
    }

    var lastId = (this.id + 1);
    this.alta.id = lastId;
    if (this.numero==null && this.nombre == null && this.apellido ==null) {
      this.mensaje("Error", "Complete los campos por favor");
    }else  
    try {
      for (let i = 0; i < this.numero.length; i++) {
        console.log(this.numero[i]);
        if (this.numero[i] == '.' || this.numero[i] == 'e' || this.numero[i] == ',' || this.numero[i] == " ") {
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

            if (this.nombre == null) 
            {
              this.mensaje("Error", "Ingrese un nombre");
            }
            else if (this.apellido ==null) {
              this.mensaje("Error", "Ingrese un apellido");
            }
            else
            {//if (this.alta.usuario != "sin definir" && this.alta.usuario.length >= 6) 
              const itemRef = this.afDB.object('/prueba/' + lastId + "/");
              this.alta.usuario=this.nombre+" "+this.apellido;
              itemRef.set(this.alta);
              this.mensaje("Exito", "Usuario guardado con exito");
            }
            //else {
              //console.log("ingrese un usuario valido con mas de 6 caracteres");
              //this.mensaje("Error", "Ingrese un usuario valido con mas de 6 caracteres");
            //}


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

  mensaje(t, m) {
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: m,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  private readCsvData() {
    if ( this.flag==false) {
      this.mensaje("Error","Seleccione un archivo");
    }
    else
    {
    this.http.get(this.logo)
      .subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
      );
    }
  }

  ionViewDidLoad() {
    this.usuariosList = this.afDB.list('/prueba');
    this.usuariosObs = this.usuariosList.valueChanges();
    this.usuariosObs.subscribe(
      user => this.usuarios = user,
    );
    console.log("inicio" + JSON.stringify(this.usuarios));
  }

  private handleError(err) {
    console.log('something went wrong: ', err);
  }

  private extractData(res) {
    let csvData = res['_body'] || '';
    let parsedData = baby.parse(csvData, {
      header: false,
      dynamicTyping: true,
      encoding: "UTF-8"
    }).data;

    this.csvData = parsedData;

    console.log("despues CSV", this.formatParsedObject(this.csvData, false));
  }

  formatParsedObject(arr, hasTitles) {
    //console.log("array",arr);
    let legajo,
      nom,
      cursa,
      obj = [];

    for (var j = 0; j < arr.length - 1; j++) {
      var items = arr[j][0];
      var items1 = arr[j][1];
      let array = items.split(";");
      let array1 = items1.split(";");

      console.log(this.mat);
      for (var i = 0; i < this.cant.length; i++) {
        //if (this.cant[i].tipo == 'alumno') {


          if (array[0] == this.cant[i].legajo) {
            if (this.cant[i].actividad == "inactivo") {
              this.Items = this.afDB.list("/prueba/" + i);
              this.Items.set("/actividad", "activo");
            }

            this.band = true;
            //this.materias = this.cant[i].materias;
          }
        //}
      }

      if (!this.band) {
        this.Items = this.afDB.list("/prueba/" + (this.i + this.cant.length));
        this.Items.set("/pass", array[0]);
        this.Items.set("/legajo", array[0]);
        this.Items.set("/tipo", "alumno");
        this.Items.set("/sexo", "sin definir");
        this.Items.set("/edad", "sin definir");
        this.Items.set("/email", "sin definir");
        this.Items.set("/usuario", array[1] + array1[0]);
        this.Items.set("/id", (this.i + this.cant.length));
        this.Items.set("/actividad", "activo");
        console.log("este usuario no existia");
        this.i++;
      }
      else {
        this.band = false;
        console.log("este usuario existe");
      }

      obj.push({
        legajo: array[0],
        ape: array[1],
        nom: array1[0],
        dia: array1[1]
      });
    }
    this.csvItem = obj;
    console.log("hola", this.cant);
    this.leerDB();
    this.mensaje("Exito","Se cargo archivo con exito");
  }

  async leerDB() {
    this.Items = this.afDB.list('/prueba/');
    this.items = this.Items.valueChanges();
    this.items.subscribe(cantidad => this.cant = cantidad);
  }

  delete(id)
  {
    if(this.cant[id].actividad == "activo")
    {
      this.Items = this.afDB.list("/prueba/" + id);
      this.Items.set("/actividad", "inactivo");
      this.leerDB();
    }
    else
    {
      this.Items = this.afDB.list("/prueba/" + id);
      this.Items.set("/actividad", "activo");
      this.leerDB();
    }
  }
}
