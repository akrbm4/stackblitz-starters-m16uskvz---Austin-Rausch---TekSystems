import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry, shareReplay, tap } from "rxjs/operators";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private cache = new Map<string, Observable<any>>();
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Generic GET request with caching and error handling
   */
  get<T>(endpoint: string, useCache = true): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;

    if (useCache && this.cache.has(url)) {
      return this.cache.get(url) as Observable<T>;
    }

    const request$ = this.http.get<T>(url).pipe(
      retry(environment.retryAttempts),
      tap(() => {
        if (environment.enableLogging) {
          console.log(`✅ API Success: ${endpoint}`);
        }
      }),
      catchError(this.handleError),
      shareReplay(1)
    );

    if (useCache) {
      this.cache.set(url, request$);
      // Clear cache after timeout
      setTimeout(() => {
        this.cache.delete(url);
      }, environment.cacheTimeout);
    }

    return request$;
  }

  /**
   * Clear all cached requests
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "An unknown error occurred";

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }

    if (environment.enableLogging) {
      console.error("❌ API Error:", errorMessage);
    }

    return throwError(() => new Error(errorMessage));
  }
}
