import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos = [
    { id: 1, nombre: 'HGIO 1', precio: 15000, descripcion:"descripcion 1" },
    { id: 2, nombre: 'HGIO 2', precio: 20000, descripcion:"descripcion 2" },
  ];

  obtenerProductos() {
    return this.productos;
  }

  obtenerProductoPorId(id: number) {
    return this.productos.find(p => p.id === id);
  }
}
