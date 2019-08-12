import { Router } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';
import { Component, OnInit, Input, ViewChild, ViewChildren } from '@angular/core';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonItemSliding, {static: false}) slide: IonItemSliding;
  @Input() terminada = true;


  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController) {
               }

  ngOnInit() { }

  listaSeleccionada( lista: Lista ) {
    this.router.navigateByUrl(this.router.url + `/add/${ lista.id }`);
  }

  borrarLista( lista: Lista ) {

    this.deseosService.borrarLista( lista );

  }

  async editarLista( lista: Lista ) {
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
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
        text: 'Editar',
        handler: ( data ) => {
          console.log(data);
          if ( data.titulo.length === 0) {
            return;
          }
          lista.titulo = data.titulo;
          this.deseosService.guardarStorage();
          this.slide.closeOpened();
        }
      }],
    });
    await alert.present();
  }
}
