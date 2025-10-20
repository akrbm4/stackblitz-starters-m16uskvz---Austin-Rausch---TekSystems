import { provideHttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

@Component({
  selector: "app-root",
  template: `
    <div class="app-container">
      <header>
        <h1>✈️ Airline Routes Explorer</h1>
        <nav>
          <!-- TODO: Add navigation links here -->
          <!-- <a routerLink="/">Home</a> -->
          <!-- <a routerLink="/explore-by-interest">Explore by Interest</a> -->
        </nav>
      </header>
      <main>
        <!-- TODO: Add router-outlet here -->
        <!-- <router-outlet></router-outlet> -->

        <!-- Temporary content until routing is implemented -->
        <div class="welcome-message">
          <h2>Welcome to the Flight Routes Explorer!</h2>
          <p>This is your starting point. You need to:</p>
          <ul>
            <li>✅ Services and models are already set up</li>
            <li>❌ Create HomeComponent with airport dropdown and filters</li>
            <li>❌ Create AirportDetailsComponent for airport details</li>
            <li>❌ Implement routing between components</li>
            <li>❌ Add router-outlet and navigation links</li>
          </ul>
          <p>
            <strong
              >Check the services folder for existing patterns to
              follow!</strong
            >
          </p>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      header {
        border-bottom: 2px solid #007acc;
        padding-bottom: 20px;
        margin-bottom: 30px;
      }
      h1 {
        color: #007acc;
        margin: 0;
      }
      .welcome-message {
        background: #f5f5f5;
        padding: 30px;
        border-radius: 8px;
        border-left: 4px solid #007acc;
      }
      ul {
        line-height: 1.6;
      }
      li {
        margin-bottom: 8px;
      }
    `,
  ],
})
export class App {
  name = "Angular Flight Routes Explorer";
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // Additional providers can be added here
  ],
});
