# Legacy Files

This directory contains legacy files from the original HTML/CSS/JS version of the portfolio website. These files are **not used** by the current Next.js application and are kept for reference only.

## Legacy Files

- `index.html` - Original HTML structure (replaced by Next.js App Router)
- `script.js` - Original JavaScript functionality (replaced by React components and hooks)
- `style.css` - Original stylesheet (replaced by CSS modules and `app/globals.css`)
- `mediaqueries-*.css` - Original responsive stylesheets (functionality moved to CSS modules)

## Current Architecture

The portfolio now uses:
- **Next.js 14** with App Router (`app/` directory)
- **React Components** (`components/` directory)
- **CSS Modules** (component-specific styles)
- **React Hooks** (`hooks/` directory)
- **Context API** for state management (`contexts/` directory)

## Migration Notes

The functionality from these legacy files has been migrated to:
- Navigation → `components/Header/`
- Translations → `lib/translations.js` + `contexts/LanguageContext.js`
- Theme → `lib/theme.js` + `hooks/useTheme.js`
- Carousels → `hooks/useCarousel.js` + carousel components
- Scroll handling → `hooks/useActiveSection.js` + `components/ScrollToTop/`

These legacy files can be safely removed if not needed for reference.
