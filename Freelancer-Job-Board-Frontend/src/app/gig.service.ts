import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gig } from './gig.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GigService {
private apiUrl = environment.apiUrl + '/gigs'; 

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
    return this.http.get<any>(`${this.apiUrl}/creator/${creatorId}`).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        }
        if (response && Array.isArray(response.gigs)) {
          return response.gigs;
        }
        return [];
      })
    );
  }
}