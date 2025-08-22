import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


@Component({
  selector: 'app-frontpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './frontpage.html',
  styleUrl: './frontpage.css'
})
export class Frontpage implements OnInit, OnDestroy {
  slides = [
    {
      title: 'Find the perfect freelance services for your business.',
      subtitle: 'Get it done, from a wide variety of talented freelancers.',
      imageUrl: 'https://images.pexels.com/photos/7135037/pexels-photo-7135037.jpeg'
    },
    {
      title: 'Stunning websites, powerful applications.',
      subtitle: 'Connect with top developers to bring your ideas to life.',
      imageUrl: 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg'
    },
    {
      title: 'Creative designs that capture your brand.',
      subtitle: 'Work with talented designers to create a unique identity.',
      imageUrl: 'https://images.pexels.com/photos/1616516/pexels-photo-1616516.jpeg'
    }
  ];

  currentIndex = 0;
  private autoPlaySubscription: Subscription | undefined;
  searchTerm: string = '';

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    if (this.autoPlaySubscription) {
      this.autoPlaySubscription.unsubscribe();
    }
  }

  startAutoPlay(): void {
    this.autoPlaySubscription = interval(5000).subscribe(() => {
      this.nextSlide();
    });
  }

  stopAutoPlay(): void {
    if (this.autoPlaySubscription) {
      this.autoPlaySubscription.unsubscribe();
    }
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  selectSlide(index: number): void {
    this.currentIndex = index;
  }

  search(): void {
    console.log(this.searchTerm)
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
    }
  }

  getSafeImageUrl(imageUrl: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${imageUrl})`);
  }
}
