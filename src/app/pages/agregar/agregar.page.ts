import { Component, } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {

  lista: Lista;
  nombreItem: string;
  constructor(private _deseosService: DeseosService,
    private router: ActivatedRoute) {

    const listaId = this.router.snapshot.paramMap.get('listaId');

    this.lista = this._deseosService.getLista(listaId);
  }


  addItem() {
    if (this.nombreItem.length === 0) return;

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = "";
    this._deseosService.saveStorage();
  }

  removeItem(index: number){
    this.lista.items.splice(index, 1);
    this._deseosService.saveStorage();
  }

  cambioCheck(item: ListaItem) {

    const pendientes = this.lista.items.filter((itemData) => !itemData.completado).length;
    if(pendientes <= 0){
      this.lista.terminadaEn = new Date();
      this.lista.completada = true ;
    }else{
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }
    this._deseosService.saveStorage();
  }

  
}
