import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [ CommonModule, RouterLink ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  isMenuOpen = false;
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.currentUser$.pipe(map(user => !!user));
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  togglenavbutton(): void {
    if (this.isAuthenticated$) {
      this.isvisible = true;
    } else {
      this.isvisible = false;
    }
  }
  isvisible = false;

  logout(): void {
    this.authService.logout();
  }
}
