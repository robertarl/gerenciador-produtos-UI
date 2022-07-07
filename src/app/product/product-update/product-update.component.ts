import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../services/product.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  form: FormGroup

  constructor(private formBilder: FormBuilder,
              private service: ProductService,
              private snackBar: MatSnackBar,
              private location: Location,
              private route: ActivatedRoute) {
    this.form = this.formBilder.group({
      id: null,
      name: [null],
      category: null,
      price: 0,
      quantity: [null],
      description: null
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if(id != null){
      this.service.findById(id).subscribe((product) => {
        this.form.setValue({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          quantity: product.quantity,
          description: product.description
        })
      });
    }

  }

  updateProduct(): void{
    this.service.update(this.form.value)
                .subscribe(data => this.sucess(),
                error =>this.onError());
  }

  cancel(){
    this.location.back();
  }

  private sucess(){
    this.snackBar.open('Produto atualizado com sucesso!', 'Close', {duration: 3000});
    this.cancel();
  }

  private onError(){
    this.snackBar.open('Erro ao atualizar o produto!', 'Close', {duration: 3000});
  }
}
