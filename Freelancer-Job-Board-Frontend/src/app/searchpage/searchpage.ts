import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Gig } from '../gig.model';
import { GigService } from '../gig.service';

@Component({
  selector: 'app-searchpage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './searchpage.html',
  styleUrl: './searchpage.css'
})
export class Searchpage implements OnInit {
  gigs: Gig[] = [];
  filteredGigs: Gig[] = [];

  searchTerm: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  filters = {
    highQuality: false,
    twoDayDelivery: false,
    topRatedSeller: false,
    proVerified: false
  };

  constructor(private gigService: GigService, private route: ActivatedRoute , private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.gigService.getGigs().subscribe({
      next: (gigs) => {
        this.gigs = gigs;
        this.route.queryParams.subscribe(params => {
          if (params['q']) {
            this.searchTerm = params['q'];
          }
          this.applyFilters( );
           this.cd.detectChanges(); 
        });
      },
      error: (err) => {
        console.error('Error fetching gigs', err);
      }
    });
  }

  applyFilters(  ): void {
    this.filteredGigs = this.gigs.filter(gig => {
      const matchesSearchTerm = gig.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesMinPrice = this.minPrice === null || gig.price >= this.minPrice;
      const matchesMaxPrice = this.maxPrice === null || gig.price <= this.maxPrice;
      const matchesHighQuality = !this.filters.highQuality || gig.highQuality;
      const matchesTwoDayDelivery = !this.filters.twoDayDelivery || gig.twoDayDelivery;
      const matchesTopRatedSeller = !this.filters.topRatedSeller || gig.topRatedSeller;
      const matchesProVerified = !this.filters.proVerified || gig.proVerified;
      return matchesSearchTerm && matchesMinPrice && matchesMaxPrice && matchesHighQuality && matchesTwoDayDelivery && matchesTopRatedSeller && matchesProVerified;
    });
  }
}