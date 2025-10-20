✈️ Take-Home Assignment: Flight Routes Explorer (Angular)

You will build a simple yet functional web-based interface that allows users to explore flight routes and airport details using the provided dataset.

## 🚀 Getting Started

### Commands

```bash
# Install dependencies
npm install

# Run mock API (in one terminal)
npm run mock-api

# Run app (in another terminal)
npm start
```

### Data Endpoints

- `http://localhost:3000/airport` - Flight routes data
- `http://localhost:3000/airportDetails` - Airport details with descriptions

## 📁 Project Structure (Already Set Up)

```
src/
├── services/
│   ├── api.service.ts          ✅ HTTP client with caching & error handling
│   ├── airport.service.ts      ✅ Partial implementation with patterns
│   └── loading.service.ts      ✅ Loading state management
├── models/
│   └── airport.model.ts        ✅ TypeScript interfaces
├── constants/
│   └── airport.constants.ts    ✅ Airport codes and filter keys
├── utils/
│   └── array.utils.ts          ✅ Helper functions for data processing
├── components/
│   └── base.component.ts       ✅ Base component with common patterns
├── environments/
│   └── environment.ts          ✅ Configuration
└── app.routes.ts              ✅ Routing setup (TODO: uncomment routes)
```

## ✅ Assignment Requirements

### 1. Origin Airport Dropdown

- Display dropdown with all unique origin airports (OriginAirportCode)
- Use `AirportService.getOriginAirports()` - already implemented!
- When user selects origin → show destinations for that origin

### 2. Filter Options

- Add checkbox filters for destination results:
  - `IsSeasonal`: Show only seasonal routes
  - `IsJetBlue`: Show only JetBlue routes
  - `IsInterline`: Show only interline routes
- Filters update results dynamically in real-time
- Use `ArrayUtils.filterByMultipleConditions()` helper

### 3. Destination Airport Details Page

- Clicking destination navigates to `/airport/:code`
- Display: `fullName`, `cityName`, `description`, `thingsToDo`
- Use routing and `AirportService.getAirportDetails()`

## 🛠️ What You Need to Implement

### Components to Create:

1. **HomeComponent** - Main page with dropdown and filters
2. **AirportDetailsComponent** - Airport detail page

### Service Methods to Complete:

Check `airport.service.ts` - several TODO methods need implementation following the established patterns.

### Routing:

Uncomment routes in `app.routes.ts` and add `<router-outlet>` to main template.

## � Coding Patterns to Follow

### ✅ Use the Base Component:

```typescript
export class HomeComponent extends BaseComponent {
  ngOnInit() {
    this.airportService
      .getOriginAirports()
      .pipe(takeUntil(this.destroy$)) // ← Use destroy$ pattern
      .subscribe({
        next: (data) => this.handleData(data),
        error: (error) => this.handleError(error, "loading airports"),
      });
  }
}
```

### ✅ Use the Loading Service:

```typescript
constructor(private loadingService: LoadingService) {}

loadData() {
  this.loadingService.setLoadingFor('airports', true);
  // ... API call
  this.loadingService.setLoadingFor('airports', false);
}
```

### ✅ Use Existing Utilities:

```typescript
// Get unique values
const origins = ArrayUtils.getUniqueValues(airports, "OriginAirportCode");

// Filter data
const filtered = ArrayUtils.filterByMultipleConditions(routes, filters);
```

## 🎯 Success Criteria

- [ ] Origin dropdown populated from API
- [ ] Destinations update when origin selected
- [ ] All three filter checkboxes work dynamically
- [ ] Clicking destination navigates to details page
- [ ] Airport details page shows all required info
- [ ] Proper error handling and loading states
- [ ] Follow established patterns and use provided services
