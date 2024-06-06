import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ProductActions from './products.actions';
import { ProductService } from '../product.service';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProducts),
    mergeMap(() => this.productService.getAllProducts(0, 0).pipe(
      map(response => ProductActions.loadProductsSuccess({ products: response.products })),
      catchError(error => of(ProductActions.loadProductsFailure({ error }))),
    )),
  ));

  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {}
}
