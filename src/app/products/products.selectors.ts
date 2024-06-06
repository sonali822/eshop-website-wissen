import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState, initialState } from './products.reducer';

//  export const selectProductState = createFeatureSelector<ProductState>('products');
export const selectProductState = (state:ProductState)=>state




export const selectProducts = createSelector(
    selectProductState,
  (state: ProductState) => state.products
);

export const selectProductLoading = createSelector(
    selectProductState,
  (state: ProductState) => state.loading
);

export const selectProductError = createSelector(
    selectProductState,
  (state: ProductState) => state.error
);
