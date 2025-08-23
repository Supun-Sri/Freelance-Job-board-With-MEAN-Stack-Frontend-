import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { GigService } from '../gig.service';
import { OrderService } from '../order.service';
import { User } from '../user.model';
import { Gig } from '../gig.model';
import { Order } from '../order.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule , Router } from '@angular/router';
@Component({
  selector: 'app-freelancerprofile',
  standalone: true, 
  imports: [CommonModule , RouterModule],
  templateUrl: './freelancerprofile.html',
  styleUrl: './freelancerprofile.css'
})
export class Freelancerprofile implements OnInit {
  currentUser: User | null = null;
  freelancerGigs: Gig[] = [];
  freelancerOrders: Order[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private gigService: GigService,
    private orderService: OrderService,
    private cd: ChangeDetectorRef ,
    private router: Router
  ) { }


  navigate(route: string[]): void {
    this.router.navigate(route);
  }
  ngOnInit(): void {

    this.authService.currentUser$.subscribe(user => {

      this.currentUser = user;
      if (this.currentUser && this.currentUser._id) {
        this.gigService.getGigsByCreator(this.currentUser._id).subscribe({
          next: (gigs) => {
            this.freelancerGigs = gigs;
            console.log('Freelancer Gigs:', this.freelancerGigs);
               this.cd.detectChanges(); 
          },
          error: (err) => {
            console.error('Error fetching freelancer gigs:', err);
          }
        });
   this.cd.detectChanges(); 
        this.orderService.getOrdersByFreelancer(this.currentUser._id).subscribe({
          
          next: (orders) => {
            this.freelancerOrders = orders;
              
          },
          error: (err) => {
            console.error('Error fetching freelancer orders:', err);
          }
        });
      }
    });
  }
}
