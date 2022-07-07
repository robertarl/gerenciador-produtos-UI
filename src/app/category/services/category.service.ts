import { Category } from './../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly API = 'api/categories';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Category[]>(this.API)
    .pipe(
      delay(1000),
      tap(categories => console.log(categories) )
    )
  }

  save(category: Category){
    return this.httpClient.post<Category>(this.API, category);
  }


  findById(id: string): Observable<Category>{
    const url = `${this.API}/${id}`;
    return this.httpClient.get<Category>(url);
  }

  update(category: Category): Observable<Category>{
    const url = `${this.API}/${category.id}`;
    return this.httpClient.put<Category>(url, category);
  }


  delete(id: string): Observable<Category>{
    const url = `${this.API}/${id}`;
    return this.httpClient.delete<Category>(url)
  }
}
