import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/users';
  private currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            this.currentUser$.next(users[0]);
            return true;
          }
          return false;
        })
      );
  }

  logout(): void {
    this.currentUser$.next(null);
  }

  getUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  isLoggedIn(): boolean {
    return this.currentUser$.value !== null;
  }

  getUserSnapshot(): User | null {
    return this.currentUser$.value;
  }
}
