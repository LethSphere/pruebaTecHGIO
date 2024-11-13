import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesProductoComponent } from './catalogo/detalles-producto/detalles-producto.component';
import { ListadoProductosComponent } from './catalogo/listado-productos/listado-productos.component';
import { AgregarProductoComponent } from './catalogo/agregar-producto/agregar-producto.component';

const routes: Routes = [
  { path: 'general', component: ListadoProductosComponent },
  { path: 'detalles/:id', component: DetallesProductoComponent },
  { path: 'agregar', component: AgregarProductoComponent },
  { path: '', redirectTo: '/general', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
