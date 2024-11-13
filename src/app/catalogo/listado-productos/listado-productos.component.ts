import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { Producto } from '../models/producto.model';
import { ProductoService } from '../services/producto.service';
import { PrecioPipe } from '../pipes/precio.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss'],
  providers: [ProductoService],
  imports: [CommonModule, RouterModule, PrecioPipe, MatCardModule, MatButtonModule]
})
export class ListadoProductosComponent implements OnInit {
  productos = signal<Producto[]>([]);

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    const productosGuardados = JSON.parse(localStorage.getItem('productos') || '[]');
    if (productosGuardados.length) {
      this.productos.set(productosGuardados);
    } else {
      this.productos.set(this.productoService.obtenerProductos());
    }
  }
  agregarProducto(): void {
    this.router.navigate(['/agregar']); 
  }

}
