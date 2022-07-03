import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [

  { path: '', component: ProductsComponent},
  { path: 'new', component: ProductCreateComponent },
  { path:'update/:id', component: ProductUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
