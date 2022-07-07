import { CategoryService } from './../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { catchError, Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {

  faPlus = faPlus;
  faPen = faPen;
  faTrash = faTrash;

  category$: Observable<Category[]>;
  displayedColumns = ['id', 'name', 'action']

  constructor(private router: Router,
     private route: ActivatedRoute,
    private categoryService: CategoryService,
    public dialog: MatDialog) {

    this.category$ = this.updateList();
  }

  ngOnInit(): void {}

  updateList() {
    return this.categoryService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar a lista de categorias.');
        return of([]);
      })
    );
  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  nova() {
    this.router.navigate(['new-category'], { relativeTo: this.route });
  }

  update(id: string) {
    this.router.navigate(['update-category', id], { relativeTo: this.route });
  }

  deletar(id: string) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar?',
      text: 'Essa ação não é reversível',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(id).subscribe(
          result => {
            this.category$ = this.updateList();
            Swal.fire('Deletado!', 'A categoria foi deletada.', 'success')
          },
          error => Swal.fire('Erro ao deletar', '', 'error')
        );
      }
    });
  }
}
