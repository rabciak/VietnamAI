# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vietnam House is a modern, responsive website for a Vietnamese restaurant in Poland. The site showcases the menu, brand identity, and essential information to attract customers.

**Restaurant Details:**
- Name: Vietnam House
- Tagline: "Kuchnia Orientalna" (Oriental Cuisine)
- Location: Zamość, Poland
- Phone: 665 559 841
- Facebook: /vietnam.house.zamosc

## Technology Stack

- **Framework:** React 19 with Vite 7
- **Styling:** Tailwind CSS v3.4.1 (with PostCSS and Autoprefixer)
- **Routing:** React Router DOM v7
- **Icons:** Lucide React
- **Deployment:** Single-page application (client-side only)

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
vietnam-house/
├── src/
│   ├── components/       # Reusable UI components
│   │   └── Navigation.jsx
│   ├── pages/           # Route-level page components
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── data/            # Static data and content
│   │   └── menuData.js
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles & Tailwind config
├── public/              # Static assets
└── package.json
```

## Brand Identity

**Colors:**
- Primary: Golden Yellow (#F5A623, #FFBF00)
- Secondary: Deep Red (#C41E3A)
- Text: Dark Gray (#2C2C2C)
- Background: White (#FFFFFF)

**Typography:**
- Headings: Bold, sans-serif (system fonts)
- Body: Inter, Open Sans, system-ui

**Design Principles:**
- Warm, inviting atmosphere
- Traditional Vietnamese elements
- Modern, clean layout
- Mobile-first responsive design

## Architecture

**Routing:**
The app uses React Router with the following routes:
- `/` - Home page with hero section and featured dishes
- `/menu` - Full menu with categories and search/filter
- `/about` - Restaurant story and values
- `/contact` - Contact information and reservation form

**State Management:**
- Local component state using React hooks (useState)
- No global state management (not needed for current scope)

**Data Layer:**
- Menu data stored in `/src/data/menuData.js`
- Contact form submissions are client-side only (log to console)
- No backend integration in v1

## Key Features

1. **Responsive Navigation:** Sticky header with mobile hamburger menu
2. **Hero Section:** Prominent CTAs for viewing menu and making reservations
3. **Menu System:** Categorized menu with search/filter functionality
4. **Contact Form:** Reservation request form with validation
5. **Accessibility:** WCAG 2.1 AA compliant with keyboard navigation support

## Menu Categories

The menu is organized into 16 categories:
1. Specjalność Kuchni (Kitchen Specialties)
2. Zupy (Soups)
3. Kurczak (Chicken)
4. Kaczka (Duck)
5. Sajgonki (Spring Rolls)
6. Wieprzowina (Pork)
7. Wołowina (Beef)
8. Rosół Pho (Pho Broth)
9. Zamiany (Additions)
10. Żeberka/Golonka (Ribs/Pork Shank)
11. Krewetki (Shrimp)
12. Ryż Smażony (Fried Rice)
13. Inne (Other)
14. Makarony - Padthai
15. Makarony - Chiński (Sojowy lub Ryżowy)
16. Makarony - Udon

**Menu Item Structure:**
```javascript
{
  name: string,
  description: string,
  price: number,
  spicy: number (0-3),  // Chili pepper count
  vegetarian: boolean,
  popular: boolean
}
```

## Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## Language

- Primary language: Polish
- All UI text and content in Polish
- Professional but warm tone

## Future Enhancements (Out of Scope for V1)

- Online ordering system
- Multi-language support (English)
- Customer reviews section
- Newsletter signup
- Blog with Vietnamese culture/recipes
- Loyalty program integration
- Instagram feed integration
- Backend API integration
- Real Google Maps integration
- Actual menu item data population
