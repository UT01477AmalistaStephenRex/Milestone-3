import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, role } = this.loginForm.value;
      console.log(role);

      // Map role to numeric value if necessary (Admin: 1, User: 2)
      const roleValue = role

      this.authService.login(email, password, roleValue).subscribe(
        (user) => {
          if (user) {
            console.log('Login Successful:', user);
            this.loginError = '';

            // Redirect based on role
            if (roleValue == '1') {
              // If the user is an admin, navigate to the admin dashboard
              this.router.navigate(['/admin-dashboard']);
            } else {
              // Otherwise, navigate to the regular user dashboard
              this.router.navigate(['/dashboard']);
            }
          } else {
            this.loginError = 'Invalid email or password.';
          }
        },
        (error) => {
          console.error('Error during login:', error);
          this.loginError = 'An error occurred during login. Please try again later.';
        }
      );
    }
  }
}
