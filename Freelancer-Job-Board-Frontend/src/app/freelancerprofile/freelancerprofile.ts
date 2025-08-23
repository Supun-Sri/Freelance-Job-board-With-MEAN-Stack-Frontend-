import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { GigService } from '../gig.service';
import { OrderService } from '../order.service';
import { User } from '../user.model';
import { Gig } from '../gig.model';
import { Order } from '../order.model';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-freelancerprofile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './freelancerprofile.html',
  styleUrls: ['./freelancerprofile.css']
})
export class Freelancerprofile implements OnInit {
  currentUser$: Observable<User | null>;
  freelancerGigs$: Observable<Gig[]> = of([]);
  freelancerOrders$: Observable<Order[]> = of([]);

  constructor(
    private authService: AuthService,
    private gigService: GigService,
    private orderService: OrderService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.freelancerGigs$ = this.currentUser$.pipe(
      switchMap(user => {
        if (user && user._id) {
          return this.gigService.getGigsByCreator(user._id);
        }
        return of([]);
      })
    );

    this.freelancerOrders$ = this.currentUser$.pipe(
      switchMap(user => {
        if (user && user._id) {
          return this.orderService.getOrdersByFreelancer(user._id);
        }
        return of([]);
      })
    );
  }

  navigate(route: string[]): void {
    this.router.navigate(route);
  }
}
