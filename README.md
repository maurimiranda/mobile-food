# Mobile Food Permits

A web application to explore San Francisco's mobile food facility permits. Built as part of the Radai Food Facilities Challenge (Frontend Focused).

## Problem

The Food Facilities Challenge asks for a frontend experience that lets users discover San Francisco mobile food facilities. Core requirements for the frontend track: search by applicant name, search by (partial) street name, optionally filter by permit status, and present the results in a React-based UI. Bonus points include automated tests and implementing the backend-version extras (like nearest vendors) on the client.

## Solution

This app is a map-first React/Next.js experience that fulfills the required searches and filters while adding geospatial helpers from the backend brief. Users can:

- Search by applicant or partial street/address text with live filtering by permit status.
- Browse an interactive map with markers styled by status and type.
- Click a marker to open a popup with permit details.
- Toggle filters via an interactive legend (status and facility type).
- Find the 5 nearest vendors to any clicked location (frontend implementation of the backend nearest-feature).
- Run Playwright E2E tests to verify core user flows.

## Tech Stack

- **Framework**: Next.js 16, React 19, TypeScript
- **Mapping**: MapLibre GL, react-map-gl, Turf.js
- **State**: Jotai
- **Styling**: Tailwind CSS
- **Testing**: Playwright (E2E)
- **Infrastructure**: Docker, Docker Compose

## Technical & Architectural Decisions

### Framework: Next.js + React

- **Why Next.js**: Provides a solid foundation with built-in routing, optimized builds, and excellent developer experience.
- **Why React 19**: Latest stable version with improved performance characteristics.
- **Client-side data fetching**: Data is fetched in the browser to enable Playwright route interception for E2E testing with fixture data.

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

## What I Would Do Differently With More Time

- **Backend API**:

  - Currently fetching directly from SF Gov's API on every page load. A proper backend would provide an API with pagination, filtering, and search capabilities.

- **Data**:

  - Implement caching strategies (e.g., SWR, React Query) to avoid refetching data on every page load.
  - Add fetch error catching.

- **UI/UX**:

  - Clustering: With 400+ markers, the map can feel cluttered at low zoom levels. Marker clustering would improve UX.
  - Mobile Optimization: Further refine the mobile experience for smaller screens.
  - Accessibility: Improve keyboard navigation and screen reader support.
  - Add global error catchings

- **Testing**:

  - Add E2E tests to cover all functionalities
  - Add more browsers to Playwright configuration for cross-browser compatibility.
  - Consider unit tests for critical utility functions.
  - Run tests into a different container to allow app to use server-side data fetching while still enabling E2E tests with fixture data.

## How to Run Locally

### Prerequisites

- Docker and Docker Compose installed
- MapTiler API key ([free tier available](https://docs.maptiler.com/cloud/api/authentication-key/#get-a-testing-key))

1. Build

```bash
make build
```

2. Create a `.env` file in the project root with the following content:

```
NEXT_PUBLIC_DATA_URL=https://data.sfgov.org/resource/rqzj-sfat.json
NEXT_PUBLIC_MAPTILER_KEY=your_maptiler_api_key_here
```

3. Run Development Server

```bash
make run
```

Open [http://localhost:3000](http://localhost:3000) in your browser

### Testing

1. Start the development server (if not already running)

2. Run E2E Tests

```bash
make test
```
