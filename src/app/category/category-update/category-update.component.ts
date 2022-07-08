import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../services/category.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css'],
})
export class CategoryUpdateComponent implements OnInit {
  form: FormGroup;


  validation_messages = {
    'name': [
      { type: 'required', message: 'O nome é obrigatório' }
    ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: null,
      name: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.categoryService.findById(id).subscribe((category) => {
        this.form.setValue({
          id: category.id,
          name: category.name
        });
      });
    }
  }

  updateCategory(): void {
    this.categoryService.update(this.form.value).subscribe(
      (data) => this.sucess(),
      (error) => this.onError()
    );
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
