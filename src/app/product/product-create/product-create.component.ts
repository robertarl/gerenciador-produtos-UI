import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../services/product.service';
import { Location } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';
import { Category } from 'src/app/category/models/category';
import { CategoryService } from 'src/app/category/services/category.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  form: FormGroup;

  categories$: Observable<Category[]>;

  validation_messages = {
    'name': [
      { type: 'required', message: 'O nome é obrigatório' }
    ],
    'category': [
      { type: 'required', message: 'A categoria é obrigatória' }
    ],
    'price': [
      { type: 'required', message: 'O preço é obrigatório' }

    ],
    'quantity': [
      { type: 'required', message: 'A quantidade é obrigatória' }
    ],
    'description': [
      { type: 'required', message: 'A descrição é obrigatória' }
    ]
  }

  constructor(private formBuilder: FormBuilder,
              private service: ProductService,
              private categoryService: CategoryService,
              private snackBar: MatSnackBar,
              private location: Location) {


    this.categories$ = this.categoryService.list();
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      price: [0,  Validators.required],
      quantity: [null,  Validators.required],
      description: [null,  Validators.required]
    });
  }

  ngOnInit(): void {

  }

  createProduct(){
    if(this.form.valid) {
      this.service.save(this.form.value)
      .subscribe(data => this.sucess(),
      error =>this.onError());
    } else {
      this.snackBar.open('Os campos precisam ser prenchidos!!!', 'X', {duration: 3000});
    }
  }

  cancel(){
    this.location.back();
  }

  private sucess(){
    this.snackBar.open('Produto salvo com sucesso!', 'X', {duration: 3000});
    this.cancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar produto!', 'X', {duration: 3000});
  }
}
