import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadProducts } from '../products/products.actions';
import { selectProductError, selectProductLoading, selectProductState, selectProducts } from '../products/products.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  limit = 30;
  skip = 0;
  loading = false;
  products$!: any;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  categories: string[] = ['Category 1', 'Category 2', 'Category 3']; // Hardcoded categories
  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.products$ = this.store.select(selectProducts);
    this.loading$ = this.store.select(selectProductLoading);
    this.error$ = this.store.select(selectProductError);
    console.log( this.products$ ,"this.products$ ");
    this.products$.subscribe({
      next: (value: any) => {
        this.products.push(value);
      },
      complete: () => {
        console.log(this.products, "this.products in complete");
      }
    });
    

    // this.fetchProducts();
    // this.setupIntersectionObserver();

  }
  constructor(
    private productApiService: ProductService,
    private router:Router,
    private store: Store
  ) {
  }
  fetchProducts(): void {
    this.productApiService.getAllProducts(this.limit, this.skip).subscribe(
      (response) => {
        this.products = [...this.products, ...response.products];
        this.skip += this.limit;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.loading = false;
      }
    );
  }
  setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.fetchProducts();
        }
      });
    }, options);

    const target = document.querySelector('#scroll-anchor');
    if (target) {
      observer.observe(target);
    }
  }
  viewProduct(productId:number)
  {
    this.router.navigate(['/product', productId]);
  }
}