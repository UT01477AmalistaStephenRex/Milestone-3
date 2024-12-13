import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudentService } from '../service/student.service';
import { AuthService } from '../service/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthService) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
    });
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      const payload = {
        FirstName: this.registerForm.value.firstName,
        LastName: this.registerForm.value.lastName,
        Email: this.registerForm.value.email,
        MobileNumber: this.registerForm.value.mobile,
        Password: this.registerForm.value.password,
        Role: this.registerForm.value.role === 'admin' ? 1 : 2, // Map role to enum
      };
  
      this.authService.addUser(payload).subscribe(
        (response) => {
          console.log('User Registered Successfully:', response);
          this.registerForm.reset();
          // Optionally, show a success message or redirect
        },
        (error) => {
          console.error('Error during registration:', error);
          // Optionally, show an error message
        }
      );
    }
}  
}