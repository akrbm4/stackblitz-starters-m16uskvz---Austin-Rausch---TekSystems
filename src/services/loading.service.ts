import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingStates = new Map<string, boolean>();

  /**
   * Observable for global loading state
   */
  isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  /**
   * Set global loading state
   */
  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  /**
   * Set loading state for a specific operation
   */
  setLoadingFor(key: string, loading: boolean): void {
    this.loadingStates.set(key, loading);

    // Update global loading state based on any active operations
    const hasActiveLoading = Array.from(this.loadingStates.values()).some(
      (state) => state
    );
    this.loadingSubject.next(hasActiveLoading);
  }

  /**
   * Check if a specific operation is loading
   */
  isLoadingFor(key: string): boolean {
    return this.loadingStates.get(key) || false;
  }

  /**
   * Clear all loading states
   */
  clearAll(): void {
    this.loadingStates.clear();
    this.loadingSubject.next(false);
  }
}
