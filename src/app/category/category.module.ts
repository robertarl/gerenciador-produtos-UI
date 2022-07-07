import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { HeaderComponent } from './models/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryUpdateComponent } from './category-update/category-update.component';




@NgModule({
  declarations: [
    CategoriesComponent,
    HeaderComponent,
    CategoryCreateComponent,
    CategoryUpdateComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FontAwesomeModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
