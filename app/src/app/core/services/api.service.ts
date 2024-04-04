import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  post(path: string, body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${path}`, body, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${path}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  private handleError(error: any) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
