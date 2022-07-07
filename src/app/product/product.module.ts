import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HeaderComponent} from './models/header/header.component'



@NgModule({
  declarations: [
    ProductsComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    FontAwesomeModule
  ]
})
export class ProductModule { }
