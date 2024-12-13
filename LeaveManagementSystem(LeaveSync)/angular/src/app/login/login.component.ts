import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private authService:AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role:['', [Validators.required]]
    });

  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const { email, password,role } = this.loginForm.value;
  
  //     this.authService.login(email, password,role).subscribe(
  //       (user) => {
  //         if (user) {
  //           console.log('Login Successful:', user);
  //           this.loginError = '';
  //           // You can store the token or user information in localStorage/sessionStorage if needed.
  //           // localStorage.setItem('token', user.token);
  //         } else {
  //           this.loginError = 'Invalid email or password.';
  //         }
  //       },
  //       (error) => {
  //         console.error('Error during login:', error);
  //         this.loginError = 'An error occurred during login. Please try again later.';
  //       }
  //     );
  //   }
  // }
  

  onSubmit(): void {
    if (this.loginForm.valid) {
        const { email, password, role } = this.loginForm.value;

        // Map role to numeric value
        const roleValue = role === 'admin' ? 1 : 2;

        this.authService.login(email, password, role).subscribe(
            (user) => {
                console.log('Login Successful:', user);
                this.loginError = '';
            },
            (error) => {
                console.error('Error during login:', error);
                this.loginError = 'An error occurred during login. Please try again later.';
            }
        );
    }
}
}
