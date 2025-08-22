import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gig } from './gig.model';

@Injectable({
  providedIn: 'root'
})
export class GigService {
  private apiUrl = 'http://localhost:3000/api/gigs'; // Assuming this is the API endpoint

  constructor(private http: HttpClient) { }

  getGigs(): Observable<Gig[]> {
    return this.http.get<Gig[]>(this.apiUrl);
  }

  getGig(id: string): Observable<Gig> {
    return this.http.get<Gig>(`${this.apiUrl}/${id}`);
  }

  addGig(gig: Omit<Gig, '_id' | 'rating' | 'reviews' | 'reviewsList'>): Observable<Gig> {
    return this.http.post<Gig>(this.apiUrl, gig);
  }

  getGigsByCreator(creatorId: string): Observable<Gig[]> {
    return this.http.get<Gig[]>(`${this.apiUrl}/creator/${creatorId}`);
  }
}