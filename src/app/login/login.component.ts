import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, take, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../user';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,FormsModule,MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public username = '';
  public password = '';
  loginForm!: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: AuthServiceService

  ) {
  }
  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, this.passwordValidator()]]
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordField = document.getElementById('password-field') as HTMLInputElement;
    const toggler = document.getElementById('toggler');
    if (passwordField && toggler) {
      if (this.isPasswordVisible) {
        passwordField.type = 'text';
        toggler.classList.remove('fa-eye');
        toggler.classList.add('fa-eye-slash');
      } else {
        passwordField.type = 'password';
        toggler.classList.remove('fa-eye-slash');
        toggler.classList.add('fa-eye');
      }
    }
  }
  passwordValidator() {
    return (control: FormControl) => {
      const password = control.value;
      const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
      const valid = regex.test(password);
      return valid ? null : { invalidPassword: true };
    };
  }
  
  onSubmit() {
    //if (this.loginForm.valid) {
      console.log('Form submitted successfully');
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      const newUser: User = {
        userName: username,
        password: password,
      };
      this.apiService.login(newUser).subscribe(
        response => {
          console.log('Login successful:', response);
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Login failed:', error);
        }
      );
    // }else{
    //   alert("Wrong")
    // }
  }
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
  
}
