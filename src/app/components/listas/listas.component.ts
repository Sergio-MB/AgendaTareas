import { Component, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  @Input() terminada = true;
  @ViewChild(IonList) lista: IonList;

  constructor(public _deseosService: DeseosService,
    private router: Router, private alertController: AlertController) { }

  verLista = (lista: Lista) => {
    
    if(!this.terminada){
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);

    }else{
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);

    }  
  }

  eliminarLista = (lista: Lista) => {
    this._deseosService.eliminarLista(lista);
  }

  modificarTitulo = async (lista: Lista) => {

    const alert = await this.alertController.create({

      header: 'Modificar título',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => this.lista.closeSlidingItems()
        },
        {
          text: 'Modificar',
          handler: (data) => {

            if (data.titulo.length === 0) return;

           
           this._deseosService.modificarTitulo(lista, data.titulo);
           this.lista.closeSlidingItems();

          }
        }]
    });

    alert.present();


    
  }


}
