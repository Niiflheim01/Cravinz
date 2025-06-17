I want to create Cravinz, a collaborative food discovery platform, with Wasp (a full-stack framework with batteries included) and Shadcn-ui components (since it’s already integrated with our stack). Using Wasp’s full-stack features (like Auth) and following a vertical slice implementation, we can start small and grow by adding complexity over time — we’re not aiming for enterprise scale on day 1, just a strong base we can iteratively improve.

Product Overview
Cravinz helps users discover food and restaurants tailored to their preferences.
It combines a swipe-based UI, a curated feed, AI-powered recommendations, and social interaction — all in a single platform.

HERE’S THE PLAN:
Users have a profile with their food preferences and dietary restrictions.
Users can follow and connect with friends — to see their food journeys, reviews, and favorites.
User’s feed (Instagram-like) displays food photos, promotions, menus, stories, and reviews — personalized by algorithm.
Curated packs — collections of food or restaurants (Ketogenic, Filipino Comfort Foods, Low Carb, etc.).
Discovery — Tinder-like swipe to save or pass food and restaurant cards.
Map View — displays nearby food spots in Singapore (with 50+ seed restaurants).
Reviews & Comments — allows users to leave reviews, comments, and messages.
Business Profiles — restaurants can show menus, promotions, photos, reviews, and respond to customer messages. Later we can enable restaurant reservations (Tablein or OpenTable).


TECH STACK:
Framework: Wasp (full stack).
UI: Shadcn-ui components.
Auth: Managed by Wasp.
Database: Supabase.
AI/Recommendation: any free AI available you would recommend?
Map View: Leaflet or Google Maps API.
File Storage: any free alternative you would recommend? maybe cloud?


VERTICAL SLICE PLAN:
Start with the following vertical slice:
User Signup & Auth
Personalized Feed + Swipe
Craving Tracker
Group Swipe Feature(can invite friends via link or QR)
Curated Packs
User-Generated Content (Reviews)
Restaurant Profiles (with seed data for 50+ restaurants in Singapore)
Comments
AI-Powered Recommendations
Location-Based Discovery (Map View)

REASONING:
We’re choosing Wasp + Shadcn-ui + Maps for a few key reasons:
Full-stack simplicity with Wasp — lets us move faster without needing to piece together separate services.
Shadcn-ui guarantees a consistent UI without adding much custom CSS.
AI-assisted personalization lets us differentiate ourselves from competing food apps.
Vertical slice approach lets us implement a complete, functional flow first — then we can add additional complexity afterwards (like payments, loyalty programs, delivery, or group dining).