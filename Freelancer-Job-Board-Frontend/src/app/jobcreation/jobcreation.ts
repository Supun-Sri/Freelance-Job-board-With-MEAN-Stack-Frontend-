import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GigService } from '../gig.service';
import { AuthService } from '../auth.service';
import { Gig } from '../gig.model';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';

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
    image: '', 
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
  file: File | null = null;
 uploadedUrl: string | null = null;

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.file = input.files[0];   
  }
}

  constructor(
    private gigService: GigService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  createGig(): void {
  if (!this.file) {
    alert('Please select an image file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.file);
  formData.append('upload_preset', 'ml_default');

  this.http.post<any>(
    'https://api.cloudinary.com/v1_1/dq8jyhdua/auto/upload',
    formData
  ).subscribe({
    next: (res) => {
      console.log(res);
      this.uploadedUrl = res.secure_url;
      this.newGig.image = this.uploadedUrl || this.newGig.image;

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
          },
          complete: () => {
            alert('Gig creation process completed');
            this.router.navigate(['/freelancerprofile']);
          }
        });
      } else {
        console.error('User not logged in');
        this.router.navigate(['/login']);
      }
    },
    error: (err) => {
      console.error('Upload failed', err);
    }
  });
}
}