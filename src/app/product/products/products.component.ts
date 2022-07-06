import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import Swal from 'sweetalert2';
import { faFilter, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  faPlus = faPlus;
  faFilter = faFilter;
  faPen = faPen;
  faTrash = faTrash;


  products$: Observable<Product[]>;
  displayedColumns = ['id', 'name', 'category', 'price', 'stock', 'action'];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.products$ = this.updateList();
  }

  updateList(){
      return this.productService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar a lista de produtos.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  update(id: string) {
    this.router.navigate(['update', id], { relativeTo: this.route });
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
        this.productService.delete(id).subscribe(
          result => {
            this.products$ = this.updateList();
            Swal.fire('Deletado!', 'O produto foi deletado.', 'success')
          },
          error => Swal.fire('Erro ao deletar', '', 'error')
        );
      }
    });
  }

}
