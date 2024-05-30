import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private httpClient: HttpClient) { }

 
  getAllProducts(limit: number, skip: number): Observable<{ products: Product[] }> {
    return this.httpClient.get<{ products: Product[] }>(`${this.apiUrl}?limit=${limit}&skip=${skip}`);
  }
 

  getSingleProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

}
