# sola-Weather app

A modern weather app built with React and Vite.  
It supports geolocation, city search, favorites, dark mode, and i18n (EN/DE) using OpenWeather APIs.

## Features
- Current weather by city or your location (Geolocation)
- 5-day forecast + hourly temperature chart
- Favorites (save/remove cities)
- Recent searches
- Dark/Light mode
- i18n: English / German

## Tech Stack
- React + TypeScript + Vite
- Tailwind CSS
- React Router
- i18next / react-i18next
- OpenWeather API (Weather + Geocoding)
- Recharts (charts)
- lucide-react (icons)

## Getting Started

### 1) Install
```bash
npm install
2) Environment Variables
Create a .env file in the project root:

VITE_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_KEY
VITE_API_BASE_URL=https://api.openweathermap.org/data/2.5
VITE_API_GEO_URL=https://api.openweathermap.org/geo/1.0
VITE_API_UNITS=metric
3) Run locally
npm run dev
Open:

http://localhost:5173

Scripts
npm run dev       # start development server
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # lint (if configured)
Notes
Do not commit your .env file to GitHub.

If you want weather descriptions in German, make sure the API requests include lang=de (the app can do this automatically based on selected language).

Project Structure (high level)
src/
  components/      # UI components (header, footer, forecast, etc.)
  pages/           # routes/pages (dashboard, city page, not-found)
  hooks/           # data fetching hooks (weather, forecast, geocoding)
  locales/         # i18n JSON files (en/de)
  context/         # theme provider
License
Choose a license (for example MIT) and add a LICENSE file if you want.

Author / Contact
GitHub: https://github.com/SOULAIMANEIDBOUFKER

LinkedIn: https://www.linkedin.com/in/soulaimane-idboufker-92aab92aa

Email: soulaimaneidboufker@gmail.com


# sola-Weather app  

Eine moderne Wetter-App mit React und Vite.  
Die App unterstützt Geolocation, Stadtsuche, Favoriten, Dark Mode und i18n (EN/DE) mit OpenWeather APIs.

## Funktionen
- Aktuelles Wetter nach Stadt oder Standort (Geolocation)
- 5-Tage-Vorhersage + Temperatur-Chart (stündlich)
- Favoriten (Städte speichern / entfernen)
- Letzte Suchen
- Dark/Light Mode
- i18n: Englisch / Deutsch

## Tech Stack
- React + TypeScript + Vite
- Tailwind CSS
- React Router
- i18next / react-i18next
- OpenWeather API (Wetter + Geocoding)
- Recharts (Charts)
- lucide-react (Icons)

## Start

### 1) Installation
```bash
npm install
2) Environment Variables
Erstelle eine Datei .env im Projekt-Root:

VITE_OPENWEATHER_API_KEY=DEIN_OPENWEATHER_KEY
VITE_API_BASE_URL=https://api.openweathermap.org/data/2.5
VITE_API_GEO_URL=https://api.openweathermap.org/geo/1.0
VITE_API_UNITS=metric
3) Lokal starten
npm run dev
Öffnen:

http://localhost:5173

Scripts
npm run dev       # Development Server
npm run build     # Production Build
npm run preview   # Preview vom Build
npm run lint      # Lint (wenn konfiguriert)
Hinweise
Committe die .env Datei nicht auf GitHub.

Wenn du Wetter-Beschreibungen auf Deutsch willst, müssen die API Requests lang=de nutzen (die App kann das automatisch je nach Sprache).

Projektstruktur (kurz)
src/
  components/      # UI Komponenten (header, footer, forecast, usw.)
  pages/           # Seiten/Routes (dashboard, city, not-found)
  hooks/           # Daten-Fetching (weather, forecast, geocoding)
  locales/         # i18n JSON Dateien (en/de)
  context/         # Theme Provider
Lizenz
Du kannst z.B. MIT wählen und eine LICENSE Datei hinzufügen.

Autor / Kontakt
GitHub: https://github.com/SOULAIMANEIDBOUFKER

LinkedIn: https://www.linkedin.com/in/soulaimane-idboufker-92aab92aa

Email: soulaimaneidboufker@gmail.com