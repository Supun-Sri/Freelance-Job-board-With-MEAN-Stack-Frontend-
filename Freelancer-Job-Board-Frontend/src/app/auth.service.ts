import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of, finalize } from 'rxjs'; // Added catchError, of
import { User } from './user.model';
import { environment } from '../environments/environment';
interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  isSeller: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private authenticationDone = new BehaviorSubject<boolean>(false);
  public authenticationDone$ = this.authenticationDone.asObservable();

  constructor(private http: HttpClient) {
    this.loadCurrentUser(); // Call a method to load current user on service initialization
  }

  private loadCurrentUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get<User>(`${this.apiUrl}/me`).pipe(
        tap(user => this.currentUserSubject.next(user)),
        catchError(error => {
          console.error('Error loading current user:', error);
          this.currentUserSubject.next(null);
          return of(null);
        }),
        finalize(() => this.authenticationDone.next(true))
      ).subscribe();
    } else {
      this.authenticationDone.next(true);
    }
  }

  login(credentials: {email: string, password: string}): Observable<{ token: string, user: User }> {
    return this.http.post<{ token: string, user: User }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  signup(credentials: SignupCredentials): Observable<any> { // Changed parameter type
      return this.http.post(`${this.apiUrl}/signup`, credentials);
  }
}
