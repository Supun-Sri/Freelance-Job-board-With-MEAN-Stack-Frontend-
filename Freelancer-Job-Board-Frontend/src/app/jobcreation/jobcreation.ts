import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GigService } from '../gig.service';
import { AuthService } from '../auth.service';
import { Gig } from '../gig.model';
import { User } from '../user.model';

@Component({
  selector: 'app-jobcreation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './jobcreation.html',
  styleUrl: './jobcreation.css'
})
export class Jobcreation implements OnInit {
  newGig: Omit<Gig, '_id' | 'rating' | 'reviews' | 'reviewsList' | 'creator'> = {
    title: '',
    price: 0,
    image: 'https://placehold.co/600x400/cccccc/ffffff?text=New+Gig', // Placeholder
    highQuality: false,
    twoDayDelivery: false,
    topRatedSeller: false,
    proVerified: false,
    description: '',
    pricingTiers: {
      basic: { name: 'Basic', price: 0, deliveryDays: 2, description: '', features: [] },
      standard: { name: 'Standard', price: 0, deliveryDays: 4, description: '', features: [] },
      premium: { name: 'Premium', price: 0, deliveryDays: 7, description: '', features: [] }
    }
  };
  currentUser: User | null = null;

  constructor(
    private gigService: GigService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  createGig(): void {
    if (this.currentUser) {
      const gigToCreate = {
        ...this.newGig,
        creator: this.currentUser
      };
      
      this.gigService.addGig(gigToCreate).subscribe({
        next: (createdGig) => {
          this.router.navigate(['/gig', createdGig._id]);
        },
        error: (err) => {
          console.error('Error creating gig', err);
          // Optionally, show an error message to the user
        }
      });
    } else {
      // Handle case where user is not logged in
      console.error('User not logged in');
      // Optionally, redirect to login page
      this.router.navigate(['/login']);
    }
  }
}