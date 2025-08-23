import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gig } from '../gig.model';
import { GigService } from '../gig.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { switchMap, of } from 'rxjs';

@Component({
  selector: 'app-buypage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buypage.html',
  styleUrls: ['./buypage.css']
})
export class Buypage implements OnInit {
  gig: Gig | undefined;
  currentUser: User | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gigService: GigService,
    private orderService: OrderService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => this.currentUser = user);

    this.route.paramMap.pipe(
      switchMap(params => {
        const gigId = params.get('id');
        if (gigId) {
          return this.gigService.getGig(gigId);
        }
        return of(null);
      })
    ).subscribe({
      next: (gig) => {
        if(gig) {
          this.gig = gig;
        } else {
          this.error = 'Could not load gig details.';
        }
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching gig:', err);
        this.error = 'Could not load gig details.';
        this.cd.detectChanges();
      }
    });
  }

  completeOrder(): void {
    console.log('Attempting to complete order...');
    if (!this.gig || !this.currentUser) {
      this.error = 'Gig or user information is missing.';
      return;
    }

    if (this.gig.creator._id === this.currentUser._id) {
      this.error = 'You cannot buy your own gig.';
      return;
    }

    const order = {
      gig: this.gig._id,
      buyer: this.currentUser._id,
      freelancer: this.gig.creator._id,
      price: this.gig.pricingTiers.standard.price // Assuming standard tier for now
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        // Navigate to a success page or user's orders
        this.router.navigate(['/buyerprofile']); 
      },
      error: (err) => {
        this.error = 'There was an error creating the order. Please try again.';
        console.error(err);
      }
    });
  }
}

