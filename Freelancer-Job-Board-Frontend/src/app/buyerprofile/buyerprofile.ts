import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { OrderService } from '../order.service';
import { User } from '../user.model';
import { Order } from '../order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyerprofile',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './buyerprofile.html',
  styleUrl: './buyerprofile.css'
})
export class Buyerprofile implements OnInit {
  currentUser: User | null = null;
  buyerOrders: Order[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private orderService: OrderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
 
      this.cd.detectChanges();
      this.currentUser = user;
         this.cd.detectChanges(); 
      if (this.currentUser && this.currentUser._id) {
        this.orderService.getOrdersByBuyer(this.currentUser._id).subscribe({

          next: (orders) => {
            this.buyerOrders = orders;
            this.cd.detectChanges();

          },
          error: (err) => {
            console.error('Error fetching buyer orders:', err);
          }
        });
      }
    });
  }
}
