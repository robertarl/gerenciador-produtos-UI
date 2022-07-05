import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  form: FormGroup

  constructor(private formBilder: FormBuilder,
              private service: ProductService,
              private snackBar: MatSnackBar,
              private location: Location) {
    this.form = this.formBilder.group({
      name: [null],
      price: 0
    });
  }

  ngOnInit(): void {

  }

  createProduct(){
    this.service.save(this.form.value)
                .subscribe(data => this.sucess(),
                error =>this.onError());
  }

  cancel(){
    this.location.back();
  }

  private sucess(){
    this.snackBar.open('Produto salvo com sucesso!', 'Close', {duration: 3000});
    this.cancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar produto!', 'Close', {duration: 3000});
  }
}
