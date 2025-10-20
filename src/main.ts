import { provideHttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, RouterModule } from "@angular/router";
import { routes } from "./app.routes";

@Component({
  selector: "app-root",
  template: `
    <div class="app-container">
      <header>
        <h1>✈️ Airline Routes Explorer</h1>
        <nav class="navigation">
          <a routerLink="/">Home</a>
          <a routerLink="/explore-by-interest">Explore by Interest</a>
        </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .navigation {
        display: flex;
        gap: 1rem;
      }

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
  imports: [RouterModule],
  standalone: true,
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
