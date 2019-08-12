import { Component, Input } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  totalListas = 0;
  listasFiltradas = [];

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController ) {
                 this.actualizarTotalListas();
               }

  actualizarTotalListas() {
        this.listasFiltradas = this.deseosService.listas;
        this.listasFiltradas = this.listasFiltradas.filter( lista => lista.terminada === false);
        this.totalListas = this.listasFiltradas.length;
  }
  
  async agregarLista() {

    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
        }
      },
      {
        text: 'Crear',
        handler: ( data ) => {
          console.log(data);
          if ( data.titulo.length === 0) {
            return;
          }
          const listaId = this.deseosService.crearLista( data.titulo );
          this.router.navigateByUrl(`/tabs/tab1/add/${ listaId }`);
          this.actualizarTotalListas();
        }
      }],
    });
    await alert.present();
  }



}
