import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../user';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule,FormsModule,MatFormFieldModule,ReactiveFormsModule,MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
  
})
export class SignupComponent {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: AuthServiceService
  ) {
  }
  signUpForm!: FormGroup;
  public username = '';
  public password = '';
  public consentChecked = false;
  isPasswordVisible: boolean = false;

  public ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, this.passwordValidator()]],
      consentChecked: [false, Validators.requiredTrue]
    });
  }
  onSubmit()
  {
    if (this.signUpForm.valid) {
      const username = this.signUpForm.value.username;
      const password = this.signUpForm.value.password;
      const newUser: User = {
        userName: username,
        password: password,
      };
      this.apiService.addUser(newUser)
      .subscribe(response => {
        console.log(response); // Handle response here
      });
    } else {
      alert('Please fill the Required Details');
    }
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  passwordValidator() {
    return (control: FormControl) => {
      const password = control.value;
      const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
      const valid = regex.test(password);
      return valid ? null : { invalidPassword: true };
    };
  }
  
  togglePasswordVisibility(): void {
    console.log("sadjadfa")
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
}
