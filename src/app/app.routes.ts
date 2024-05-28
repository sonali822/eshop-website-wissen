import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
    // { path: 'signup', component: SignupComponent }, 
    // { path: 'login', component: LoginComponent }, 
    // { path: '', component: HomeComponent }, 
    // { path: 'product/:id', component: ProductDetailComponent }, 
    { 
        path: 'signup', 
        loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) 
      },
      { 
        path: 'login', 
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) 
      },
      { 
        path: '', 
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) 
      },
      { 
        path: 'product/:id', 
        loadComponent: () => import('./product-detail/product-detail.component').then(m => m.ProductDetailComponent) 
      }
];
