import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule,FormsModule,MatFormFieldModule,ReactiveFormsModule],
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
  public ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, this.passwordValidator()]]
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
      alert('Invalid form');
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
}
