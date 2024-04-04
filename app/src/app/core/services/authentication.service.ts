import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, from, map, Observable, switchMap, tap } from 'rxjs';
import { ApiService } from './api.service';

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean | null> = new BehaviorSubject<
    boolean | null
  >(null);

  token = '';
  constructor(private apiService: ApiService) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Preferences.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('setting token: ', token.value, ' in auth service');
      this.isAuthenticated.next(true);
      this.token = token.value;
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.apiService.post(`/auth/login`, {
      login: credentials.email,
      password: credentials.password,
    }).pipe(
      map((data: any) => data.token),
      switchMap((token) => {
        return from(Preferences.set({ key: TOKEN_KEY, value: token }));
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: TOKEN_KEY });
    this.isAuthenticated.next(false);
  }

  register(credentials: { name: string; email: string; password: string }): Observable<any> {
    return this.apiService.post(`/auth/register`, {
      name: credentials.name,
      login: credentials.email,
      password: credentials.password,
    }).pipe(
      map((data: any) => data.token),
      switchMap((token) => {
        return from(Preferences.set({ key: TOKEN_KEY, value: token }));
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }
}
