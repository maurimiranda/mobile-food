# Mobile Food Permits

A web application to explore San Francisco's mobile food facility permits. Built as part of the Radai Food Facilities Challenge (Frontend Focused).

## Problem Description

San Francisco has hundreds of mobile food vendors (food trucks, push carts) operating across the city. The city maintains a public dataset with permit information, but the raw data isn't easily explorable. This application provides an intuitive interface to:

1. **Search vendors** by name or the food they serve
2. **Search by location** using partial street names (e.g., "SAN" finds vendors on "SANSOME ST")
3. **Filter by permit status** (Approved, Requested, Expired, etc.)
4. **Discover nearby vendors** by clicking anywhere on the map

## Solution Approach

I built an interactive map-based interface rather than a traditional table/list view. This decision was driven by the inherently geographic nature of the data—users looking for food trucks typically care about _where_ they are, not just _what_ they serve.

### Key Features

- **Interactive Map**: MapLibre-powered map showing all vendor locations with color-coded status markers
- **Live Search**: Real-time search across vendor names, addresses, and food items
- **Location Search**: Click anywhere on the map to find the 5 nearest facilities
- **Filtering**: Filter by permit status (Approved, Requested, Expired, Suspend, Issued) and facility type (Truck, Cart, Other)
- **Visual Legend**: Interactive legend that doubles as filter toggles

## Tech Stack

- **Framework**: Next.js 16, React 19, TypeScript
- **Mapping**: MapLibre GL, react-map-gl, Turf.js
- **State**: Jotai
- **Styling**: Tailwind CSS
- **Testing**: Playwright (E2E)
- **Infrastructure**: Docker, Docker Compose

## Technical & Architectural Decisions

### Framework: Next.js + React

- **Why Next.js**: Server-side rendering for the initial data fetch improves perceived performance. The app fetches permit data on the server before sending HTML to the client, avoiding a loading spinner on first paint.
- **Why React 19**: Latest stable version with improved performance characteristics.

### Mapping: MapLibre + react-map-gl

- **Why MapLibre over Google Maps/Mapbox**: Open-source, no API request limits, and free to use. MapTiler provides the tile styling.
- **Why react-map-gl**: Declarative React bindings make it easy to manage markers, popups, and map state alongside React component state.

### State Management: Jotai

- **Why Jotai over Redux/Context**: Minimal boilerplate for a project of this size. Atomic state model works well for independent pieces of UI state (selected permits, active filters, search mode).
- **Trade-off**: Less structured than Redux, but appropriate for the scope.

### Geospatial: Turf.js

- Used for calculating distances between points (nearest vendor feature) and bounding box calculations for map animations.

### Styling: Tailwind CSS

- Rapid prototyping without context-switching to CSS files. Utility classes make it easy to maintain consistent spacing and colors.

### Containerization: Docker

- Ensures consistent development environment and simplifies deployment. The same container can run locally or in production.

## Critique

### What I Would Do Differently With More Time

- **Backend API**: Currently fetching directly from SF Gov's API on every page load. A proper backend would:

  - Cache the data with periodic refresh
  - Provide faster response times
  - Enable more complex queries (spatial queries, fuzzy search)

- **Clustering**: With 400+ markers, the map can feel cluttered at low zoom levels. Marker clustering would improve UX.

- **Testing**:

  -- Add more tests
  -- Add more browsers to Playwright configiuration for cross-browser compatibility
  -- Maybe add unit tests for critical components? Not sure

## How to Run Locally

### Prerequisites

- Docker and Docker Compose installed
- MapTiler API key (free tier available)

1. Build

```bash
make build
```

2. Create a `.env` file in the project root with the following content:

```
NEXT_PUBLIC_MAPTILER_KEY=your_maptiler_api_key_here
```

3. Run Development Server

```bash
docker compose up
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

1. Start the development server (if not already running)

2. Run E2E Tests

```bash
make test
```

### Linting

```bash
make lint
```
