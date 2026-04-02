# CulinaryFest — Indian Recipe Discovery App

A recipe discovery web app featuring authentic Indian cuisine from across all states, festive recipes, and a hands-free kitchen mode.

## Live Demo

**https://Bhavani5A8.github.io/Culinary**

> Deployed on GitHub Pages. Navigate to `/indian-cuisine` via the Cuisines menu to explore regional Indian recipes.

---

## Features

- **16 real recipes** — South Indian breakfasts, mains, desserts, drinks, and starters with full ingredients, instructions, and nutrition data
- **Indian Cuisine Explorer** — 9 regional states with authentic recipes (lazy-loaded for fast initial load)
- **Smart search** — real-time search across title, description, tags, and chef name with voice input support
- **Dark mode** — persists across page refreshes via `localStorage`
- **Kitchen Mode** — hands-free step-by-step cooking with voice commands and text-to-speech
- **Personalization** — dietary preferences, skill level, and favourite cuisines
- **URL-based routing** — browser back button works, pages are deep-linkable:
  - `/` — Home (South Indian breakfasts + featured recipes)
  - `/#/indian-cuisine` — Indian Cuisine Explorer

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19.1.1 |
| Routing | React Router DOM 7 (HashRouter) |
| Styling | Tailwind CSS 3.4 |
| Icons | Lucide React |
| Build | Create React App 5 |
| Deployment | GitHub Pages (`gh-pages`) |

---

## Local Development

```bash
git clone https://github.com/Bhavani5A8/Culinary.git
cd Culinary
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy

```bash
npm run deploy
```

This builds the app and publishes to the `gh-pages` branch automatically.

---

## Bug Fixes Applied (v1.1)

| # | Fix |
|---|-----|
| 1 | Removed broken `handleRecipeClick` in `recipeData.js` (4 undefined variable refs) |
| 2 | Removed debug "Toggle Enhancements" panel from production UI |
| 3 | Dark mode now persists via `localStorage` (survives page refresh) |
| 4 | Newsletter shows once per browser session (`sessionStorage` guard) |
| 5 | `RecipeCard` is keyboard-accessible (`role=button`, `tabIndex`, `onKeyDown`) |
| 6 | Web Speech API guarded for Firefox/Safari compatibility |
| 7 | Added React Router — browser back button, deep links, code-split lazy loading |
| 8 | Expanded recipe data from 7 → 16 real recipes with full content |
| 9 | All `console.log/warn/error` removed from production code |
