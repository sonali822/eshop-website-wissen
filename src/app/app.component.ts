import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { StoreModule } from '@ngrx/store';
import { StoreConfigModule } from './store.config';
import { productReducer } from './products/products.reducer';
import { EffectsModule } from '@ngrx/effects';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,HomeComponent,HeaderComponent],

   
  
 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  title = 'eShopCart';
  isLoginPage(): boolean {
    return this.router.url === '/' || this.router.url === '';
  }
}
