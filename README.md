# Explore KK — Complete through Phase 10

This package is a clean, complete Next.js project implementing Phases 1–10.

## Run

```powershell
cd "YOUR\PATH\explore-kk"
npm install
npm run dev
```

Open http://localhost:3000

## Features

1. Modern Explore KK homepage with 19 mapped tourist spots.
2. Places browser with search, category filters and details.
3. Interactive Kanyakumari map. Every mapped place has an ALWAYS-VISIBLE image card; clicking a marker opens a larger popup.
4. Supabase-ready schema and client. The site works with demo/local data even before Supabase is connected.
5. My Trip favorites stored in browser localStorage.
6. Simple smart itinerary generated from saved places.
7. Trip budget estimator.
8. Restaurant discovery with coordinates and Google Maps directions.
9. OSRM driving distance/time calculator at /directions.
10. Ratings and reviews stored locally per place.

## Supabase setup (Phase 4)

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy `.env.example` to `.env.local`.
5. Fill:
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
6. Restart `npm run dev`.

The UI intentionally has a local fallback so the hackathon demo still works without credentials.

## Important map behavior

The map intentionally shows an image card for every mapped tourist spot without requiring a click. A marker click opens a larger detailed popup. This avoids the "nothing happens until I click" problem while still keeping the map interactive.

## Data

The initial tourist-place records are based on the Kanyakumari district tourist listings and verified location/image references gathered for the project. Re-check operating hours and fees before presenting them as live guarantees.

## Security

Never put a Supabase service-role key in the browser or commit it to GitHub. Only use the anon key in `NEXT_PUBLIC_...`.


### Tourist data coverage
The bundled demo dataset contains the 19 tourist spots in the Kanniyakumari District Administration Tourist Spot Index used for this project. Some coordinates/images are sourced from Wikimedia/OpenStreetMap or official district pages; Kodayar Twin Falls uses an approximate map coordinate because the district page provides the destination but not a decimal coordinate.


## Latest UI update
- Small photo-filled location pins on the Kanyakumari map.
- Clicking a pin opens a complete place card with Open/Closed status, details, My Trip heart, and live-location directions.
- My Trip calculates an efficient road route through saved places from the user's live location.
- English, Tamil, and Hindi UI language selector.
