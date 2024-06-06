// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { StoreConfigModule } from './app/store.config';
// import { importProvidersFrom } from '@angular/core';
// import { provideStore } from '@ngrx/store';
// import { RouterModule } from '@angular/router';
// import { provideStoreDevtools } from '@ngrx/store-devtools';
// import { provideEffects } from '@ngrx/effects';
// import { routes } from './app/app.routes';
// import { routerReducer } from '@ngrx/router-store';


// bootstrapApplication(AppComponent,{
//   providers:[StoreConfigModule,
//     importProvidersFrom(RouterModule.forRoot(routes)),
//     provideStore({ router: routerReducer }),
//     provideStore(),
//     provideStoreDevtools(),
//     provideEffects(),
    
    
//   ]
// })
// .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { productReducer } from './app/products/products.reducer';

bootstrapApplication(AppComponent, {...appConfig,
  providers:[provideStore(productReducer)]
}
)
  .catch((err) => console.error(err));

