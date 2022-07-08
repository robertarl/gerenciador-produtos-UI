import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, tap } from 'rxjs';
import { Category } from 'src/app/category/models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API = 'api/products';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Product[]>(this.API)
    .pipe(
      delay(1000),
      tap(products => console.log(products) )
    )
  }

  categoryList(){
    return this.httpClient.get<Category[]>(this.API)
  }

  save(product: Product){

    return this.httpClient.post<Product>(`${this.API}`, product);
  }


  findById(id: string): Observable<Product>{
    const url = `${this.API}/${id}`;
    return this.httpClient.get<Product>(url);
  }

  update(product: Product): Observable<Product>{
    const url = `${this.API}/${product.id}`;
    return this.httpClient.put<Product>(url, product);
  }


  delete(id: string): Observable<Product>{
    const url = `${this.API}/${id}`;
    return this.httpClient.delete<Product>(url)
  }
}
