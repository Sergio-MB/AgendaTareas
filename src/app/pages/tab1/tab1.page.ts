import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public _deseosService: DeseosService,
    private router: Router,
    private alertController: AlertController) {
  }

  addLista = async () => {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',

      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => console.log('cancelado')
        },
        {
          text: 'Crear',
          handler: (data) => {

            if (data.titulo.length === 0) return;

            const listaId = this._deseosService.crearLista(data.titulo);
            //Navegamos
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);

          }
        }]
    });

    alert.present();

  }

 
}
