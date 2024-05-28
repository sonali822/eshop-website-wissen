import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  limit = 30;
  skip = 0;
  loading = false;
  ngOnInit(): void {
    this.fetchProducts();
    this.setupIntersectionObserver();

  }
  constructor(
    private productApiService: ProductService,
    private router:Router
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