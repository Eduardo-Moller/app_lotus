import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, from, map, Observable, switchMap, tap } from 'rxjs';
import { ApiService } from './api.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

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
      localStorage.setItem('token', token.value);
      this.isAuthenticated.next(true);
      this.token = token.value;
    } else {
      this.isAuthenticated.next(false);
    }
  }

  async getToken() {
    const token = await Preferences.get({ key: TOKEN_KEY });
    if (token.value) {
      return token.value;
    }
    return null;
  }

  async getUser() {
    const user = await Preferences.get({ key: USER_KEY });
    if (user.value) {
      return JSON.parse(user.value);
    }
    return null;
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.apiService
      .post(`/auth/login`, {
        login: credentials.email,
        password: credentials.password,
      })
      .pipe(
        map((data: any) => data),
        switchMap((data) => {
          from(
            Preferences.set({ key: USER_KEY, value: JSON.stringify(data.user) })
          );
          return from(Preferences.set({ key: TOKEN_KEY, value: data.token }));
        }),
        tap((_) => {
          this.isAuthenticated.next(true);
        })
      );
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    await Preferences.remove({ key: TOKEN_KEY });
    this.isAuthenticated.next(false);
  }

  register(credentials: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.apiService
      .post(`/auth/register`, {
        name: credentials.name,
        login: credentials.email,
        password: credentials.password,
      })
      .pipe(
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
