import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  template: "",
})
export abstract class BaseComponent implements OnDestroy {
  /**
   * Subject for handling component destruction and preventing memory leaks
   * Use this in takeUntil() operator for subscriptions
   */
  protected destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Common error handling method
   * Override in child components for specific error handling
   */
  protected handleError(error: any, context?: string): void {
    const errorMessage = context
      ? `Error in ${context}: ${error.message || error}`
      : `Component error: ${error.message || error}`;

    console.error("🔴", errorMessage);

    // TODO: You might want to show user-friendly error messages
    // Consider implementing a notification service
  }

  /**
   * Common loading state handler
   * Can be overridden in child components
   */
  protected handleLoading(isLoading: boolean, context?: string): void {
    if (context) {
      console.log(`⏳ Loading ${context}: ${isLoading}`);
    }
  }
}
