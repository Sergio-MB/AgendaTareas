import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listaTareas: Lista[] = [];

  constructor() {
    this.loadStorage();
  }

  //getListaTareas = () => this.listaTareas;

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listaTareas.push(nuevaLista);

    this.saveStorage();

    return nuevaLista.id;
  }

  eliminarLista = (lista: Lista) => {
    this.listaTareas = this.listaTareas.filter(listaFiltrada => listaFiltrada.id !== lista.id);
    this.saveStorage();
  }

  getLista(id: string | number) {

    id = Number(id);
    const lista = this.listaTareas.find(lista => lista.id === id);

    return lista;

  }

  modificarTitulo(lista: Lista, titulo: string){
      
    lista.titulo = titulo;
    this.saveStorage();
   // return lista;
  }

  saveStorage() {
    localStorage.setItem("lista", JSON.stringify(this.listaTareas));
  }

  loadStorage() {
    if (localStorage.getItem("lista"))
      this.listaTareas = JSON.parse(localStorage.getItem("lista"));
  }
}
