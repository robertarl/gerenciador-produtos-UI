import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../services/category.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  form: FormGroup

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private location: Location) {

    this.form = this.formBuilder.group({
      name: [null],
      description: null
    });
   }

  ngOnInit(): void {
  }

  createCategory(){
    this.categoryService.save(this.form.value)
                .subscribe(data => this.sucess(),
                error =>this.onError());
  }

  cancel(){
    this.location.back();
  }

  private sucess(){
    this.snackBar.open('Categoria cadastrada com sucesso!', 'Close', {duration: 3000});
    this.cancel();
  }

  private onError(){
    this.snackBar.open('Erro ao cadastrar categoria!', 'Close', {duration: 3000});
  }

}
