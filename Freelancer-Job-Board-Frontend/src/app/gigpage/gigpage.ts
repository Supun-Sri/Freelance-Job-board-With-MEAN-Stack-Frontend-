import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Gig, PricingTier } from '../gig.model';
import { GigService } from '../gig.service';
import { User } from '../user.model';

@Component({
  selector: 'app-gigpage',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './gigpage.html',
  styleUrl: './gigpage.css'
})
export class Gigpage implements OnInit {
  gig: Gig | undefined;
  creator: User | undefined;
  selectedTier: 'Basic' | 'Standard' | 'Premium' = 'Basic';

  constructor(
    private route: ActivatedRoute,
    private gigService: GigService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    const gigId = this.route.snapshot.paramMap.get('id');
    if (gigId) {
      this.gigService.getGig(gigId).subscribe({
        next: (gig) => {
          this.gig = gig;
          if (gig && gig.creator) {
      
            this.creator = gig.creator as User; 
             this.cd.detectChanges(); 
          }
        },
        error: (err) => {
          console.error('Error fetching gig', err);
        }
      });
    }
  }

  selectTier(tier: 'Basic' | 'Standard' | 'Premium'): void {
    this.selectedTier = tier;
  }

  getSelectedTierDetails(): PricingTier | undefined {
    if (!this.gig) return undefined;
    return this.gig.pricingTiers[this.selectedTier.toLowerCase() as 'basic' | 'standard' | 'premium'];
  }

  buyGig(): void {
    if (this.gig) {
      this.router.navigate(['/buy', this.gig._id]);
    }
  }
}