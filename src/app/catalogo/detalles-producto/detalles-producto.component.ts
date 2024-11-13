import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';
import { PrecioPipe } from '../pipes/precio.pipe';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detalles-producto',
  standalone: true,
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.scss'],
  providers: [ProductoService],
  imports: [
    CommonModule,
    PrecioPipe,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class DetallesProductoComponent implements OnInit {
  producto = signal<Producto | undefined>(undefined);
  productoForm: FormGroup;
  editable = false; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {
    this.productoForm = new FormGroup({
      nombre: new FormControl({ value: '', disabled: true }),
      precio: new FormControl({ value: 0, disabled: true }),
      descripcion: new FormControl({ value: '', disabled: true })
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarProducto(id);

    if (this.producto()) {
      this.productoForm.patchValue({
        nombre: this.producto()?.nombre,
        precio: this.producto()?.precio,
        descripcion: this.producto()?.descripcion
      });
    }
  }
  get precioNoNull(): number {
    return this.producto()?.precio ?? 0;
  }

  cargarProducto(id: number): void {
    const productosGuardados = JSON.parse(localStorage.getItem('productos') || '[]');
    const productoEncontrado = productosGuardados.find((p: Producto) => p.id === id);

    if (productoEncontrado) {
      this.producto.set(productoEncontrado);
    } else {
      this.producto.set(this.productoService.obtenerProductoPorId(id));
    }
  }

  editar(): void {
    this.editable = !this.editable;

    if (this.editable) {
      this.productoForm.enable(); 
    } else {
      this.productoForm.disable(); 
    }
  }

  actualizarProducto(): void {
    if (this.productoForm.valid) {
      const actualizado = {
        ...this.producto(),
        ...this.productoForm.value
      };
      this.producto.set(actualizado);
      const productos = JSON.parse(localStorage.getItem('productos') || '[]');
      const index = productos.findIndex((p: Producto) => p.id === actualizado.id);
      if (index !== -1) {
        productos[index] = actualizado;
      } else {
        productos.push(actualizado);
      }
      localStorage.setItem('productos', JSON.stringify(productos));
      this.editar(); 
    }
  }

  regresar(): void {
    this.router.navigate(['/general']);
  }
}
