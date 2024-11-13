import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Producto } from '../models/producto.model';
import { MatCardModule } from '@angular/material/card'; 

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule 
  ]
})
export class AgregarProductoComponent {
  productoForm = new FormGroup({
    nombre: new FormControl(''),
    precio: new FormControl(0),
    descripcion: new FormControl('')
  });

  constructor(public router: Router) {}

  guardarProducto(): void {
    const nuevoProducto: Producto = {
      id: Date.now(),
      nombre: this.productoForm.get('nombre')?.value || '', 
      precio: this.productoForm.get('precio')?.value || 0,
      descripcion: this.productoForm.get('descripcion')?.value || ''
    };

    const productos = JSON.parse(localStorage.getItem('productos') || '[]');
    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));

    this.router.navigate(['/general']);
  }
}
