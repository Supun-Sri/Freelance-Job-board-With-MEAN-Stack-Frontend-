import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthService } from '../auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './loginpage.html',
  styleUrl: './loginpage.css'
})
export class Loginpage {
  activeForm: 'login' | 'signup' = 'login';

  // Login form data
  loginEmail = '';
  loginPassword = '';

  // Signup form data
  signupName = '';
  signupEmail = '';
  signupPassword = '';
  isSeller = false;
  
  constructor(private authService: AuthService, private router: Router) {}

  setActiveForm(form: 'login' | 'signup') {
    this.activeForm = form;
  }

  onLogin(): void {
    this.authService.login({ email: this.loginEmail, password: this.loginPassword }).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/']); // Navigate to home or dashboard
      },
      error: (err) => {
        console.error('Login failed', err);
        // Display error message to user
      }
    });
  }

  onSignup(): void {
    this.authService.signup({ name: this.signupName, email: this.signupEmail, password: this.signupPassword, isSeller: false }).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        // Optionally, log in the user directly after signup
        this.authService.login({ email: this.signupEmail, password: this.signupPassword }).subscribe({
          next: () => this.router.navigate(['/']),
          error: (err) => console.error('Auto-login after signup failed', err)
        });
      },
      error: (err) => {
        console.error('Signup failed', err);
        // Display error message to user
      }
    });
  }
}
