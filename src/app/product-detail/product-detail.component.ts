import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatCardModule,],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product?: Product ;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = Number(params.get('id'));
      if (productId) {
        this.getProductDetails(productId);
      }
    });
  }

  private getProductDetails(id: number): void {
    this.productService.getSingleProduct(id).subscribe((product: Product) => {
      this.product = product;
    });
  }
}

