// store.config.ts
import { StoreModule, provideStore } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { productReducer } from './products/products.reducer';
import { ProductEffects } from './products/products.effects';

@NgModule({
//   imports: [
//     StoreModule.forRoot({ product: productReducer }), // Provide your reducers here
//     EffectsModule.forRoot([ProductEffects]),
//   ],
})
export class StoreConfigModule {}
