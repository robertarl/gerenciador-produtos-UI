import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../services/product.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/category/models/category';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  form: FormGroup;

  categories$: Observable<Category[]>;

  validation_messages = {
    'name': [
      { type: 'required', message: 'O nome é obrigatório' }
    ],
    'categoryId': [
      { type: 'required', message: 'A categoria é obrigatória' }
    ],
    'price': [
      { type: 'required', message: 'O preço é obrigatório' }

    ],
    'quantity': [
      { type: 'required', message: 'A quantidade é obrigatória' }
    ]
    ,
    'description': [
      { type: 'required', message: 'A descrição é obrigatória' }
    ]
  }

  constructor(
    private formBilder: FormBuilder,
    private service: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {

    this.categories$ = this.categoryService.list();
    this.form = this.formBilder.group({
      id: null,
      name: [null, Validators.required],
      categoryId: [null, Validators.required],
      price: [0, Validators.required],
      quantity: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.findById(id).subscribe((product) => {
        this.form.setValue({
          id: product.id,
          name: product.name,
          categoryId: product.category.id,
          price: product.price,
          quantity: product.quantity,
          description: product.description,
        });
      });
    }
  }

  updateProduct(): void {
    if(this.form.valid) {
      this.service.save(this.form.value)
      .subscribe(data => this.sucess(),
      error =>this.onError());
    } else {
      this.snackBar.open('Os campos precisam ser prenchidos!!!', 'X', {duration: 3000});
    }
  }

  cancel() {
    this.location.back();
  }

  private sucess() {
    this.snackBar.open('Produto atualizado com sucesso!', 'Close', {
      duration: 3000,
    });
    this.cancel();
  }

  private onError() {
    this.snackBar.open('Erro ao atualizar o produto!', 'Close', {
      duration: 3000,
    });
  }
}
