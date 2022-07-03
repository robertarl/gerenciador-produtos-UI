import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [

  {path: 'products',
  loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
  },
  {
    path: "",
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
