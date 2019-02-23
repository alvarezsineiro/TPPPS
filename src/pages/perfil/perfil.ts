import { Perfil } from '../../entidades/perfil';
import { HomePage } from '../home/home';
import { Component, Input, PACKAGE_ROOT_URL } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Alta } from '../../entidades/alta';
import { Datos } from "../../entidades/datos";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { AngularFireAuth, AngularFireAuthProvider, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { storage, initializeApp } from "firebase";
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})


export class PerfilPage {

  alum = {} as Perfil;
  public cant: Array<any> = new Array<any>();
  public Items: AngularFireList<any>;
  public items: Observable<any>;
  modificar: boolean = true;
  indice: any = 0;
  storage: string;
  imagenes: any[];
  fotos: Array<any> = new Array<any>();
  imagen: string;
  mostrarCambio: boolean = false;
  default : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase, public toastCtr: ToastController, private camera: Camera,private loadingCtrl : LoadingController) {
    this.alum = this.navParams.get("usuario");
    this.traerImagenes();
    if(this.imagenes.length == 0)
    {
        this.default = true;
    } 

    console.log("imagenes", this.imagenes.length);
    /*if(this.storage.length == 0)
    {
      this.alum.foto = "../assets/imgs/male.png";
    }
    else
    {
      for (var i = 0; i < this.cant.length; i++) {
        console.log(this.cant);
        if(this.cant[i] == true)
        {
          this.alum.foto = this.storage[i];
          
        }
      }
    }*/
  }

  guardar() {
    const itemRef = this.afDB.object('/prueba/' + this.alum.id + "/");
    itemRef.set(this.alum).then(success => {
      let tost = this.toastCtr.create({
        message: 'Datos guardados',
        duration: 3000,
        position: 'middle'
      });
      tost.present();
    }).catch(er => console.error(er));
    this.modificar = true;

  }
  mod() {
    this.modificar = false;
  }

  ionViewDidLoad() {
  }

  async tomarFoto() {
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 400,
      targetWidth: 400,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    await this.camera.getPicture(options).then((ImageData) => {
      const image = "data:image/jpeg;base64," + ImageData;
      const pictures = storage().ref('/perfil/' + this.alum.id + '/' + this.indice + '/');
      pictures.putString(image, 'data_url');
      const itemsRef = this.afDB.list('/prueba/' + this.alum.id + '/');
      itemsRef.set('fotos/' + this.indice, false);
    }, (err) => {

    });
    this.traerImagenes();
  }

  async traerImagenes() {

    this.imagenes = new Array<any>();

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="cssload-container">
              <div class="cssload-whirlpool"></div>
          </div>`,
      cssClass: 'loader'
    });

  loading.present();

    const itemsRef = this.afDB.list('/prueba/' + this.alum.id + '/fotos');
    this.items = itemsRef.valueChanges();
    this.items.subscribe(fotos => {
      this.cant = fotos;     
      console.log(this.imagenes);
      if(this.cant.length > 0)
      {
        this.default = false;
      }
      this.imagenesBD();
    });
   
    //this.indice = this.cant.length
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

  async imagenesBD() {
    for (var i = 0; i < this.cant.length; i++) {
      const picture = storage().ref("perfil/" + this.alum.id + '/' + i);
      console.log(i);
      await picture.getDownloadURL().then(data => this.storage = data);
      this.imagenes[i] = this.storage;
    }
    
    this.indice = this.imagenes.length;
    console.log("indice",this.indice);
    for (var i = 0; i < this.cant.length; i++) {
      if (this.cant[i] == true)
        this.imagen = this.imagenes[i];
    }
    if (this.imagen == null)
     
      this.default = true;      

  }

  cambiarImagen() {
    if (this.mostrarCambio == false)
      this.mostrarCambio = true;
    else
      this.mostrarCambio = false;
  }

  modificarImagen(imagen:any) {
    console.log(imagen);
    
    for (var i = 0; i < this.cant.length; i++) {
      if (this.imagenes[i] == imagen) {
        console.log(imagen);
        console.log(this.cant[i]);
        console.log('/prueba/' + this.alum.id + '/fotos/' + i);
        const itemRef = this.afDB.object('/prueba/' + this.alum.id + "/fotos/" + i);
        itemRef.set(true);
      }
      else {
        console.log(this.alum.id);
        console.log(this.cant[i]);
        console.log('/prueba/' + this.alum.id + '/fotos/' + i);
        const itemRef = this.afDB.object('/prueba/' + this.alum.id + "/fotos/" + i);
        itemRef.set(false);
      }
    }
    this.mostrarCambio=false;
  }
}
