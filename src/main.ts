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
        <nav>
          <a routerLink="/">Home</a>
          <a routerLink="/explore-by-interest">Explore by Interest</a>
        </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [],
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
