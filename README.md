# 🌐 Next.js Portfolio - Aaron Paul Greyling

A modern, responsive portfolio website showcasing my work as a Fullstack Developer. Built with **Next.js 14** (App Router), **TypeScript**, **React 18**, and **CSS Modules**, featuring bilingual support (English/German), dark/light theme toggle, and smooth animations.

![Portfolio Preview](assets/Screenshot%202024-05-08%20140820.png)

## ✨ Features

### 🌍 **Multi-Language Support**
- **English & German** translations with React Context API
- Seamless language switching with persistent preferences
- Dynamic CV download based on selected language
- JSON-based translation system with nested keys

### 🎨 **Theme System**
- **Dark/Light mode** toggle with smooth transitions
- Time-based theme detection (dark mode from 6 PM to 6 AM)
- Persistent theme preference using localStorage
- Custom CSS variables for consistent theming

### 📱 **Responsive Design**
- Fully responsive layout for all screen sizes
- Mobile-friendly hamburger navigation menu with sidebar
- Touch-optimized interactions
- Adaptive typography and spacing
- Multiple media query breakpoints (400px, 600px, 1200px, 1400px)

### ♿ **Accessibility**
- ARIA labels and semantic HTML
- Keyboard navigation support (Escape to close menu)
- Smooth scroll with proper offset
- High contrast ratios for readability
- Error boundaries for graceful error handling

### 🎭 **Interactive Elements**
- Smooth scroll animations on section reveal
- Active navigation state tracking with intersection observer
- Scroll-to-top button
- Button ripple effects
- Fade-in animations on scroll
- Lazy loading for below-the-fold components

### ⚡ **Performance Optimizations**
- Code splitting with React lazy loading
- Suspense boundaries for better UX
- Optimized component structure
- Server-side rendering capabilities

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AaronPG095/portfolio-html-css-js.git
   cd portfolio-html-css-js
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
portfolio-html-css-js/
│
├── app/                      # Next.js App Router directory
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page component
│   ├── globals.css          # Global styles
│   └── not-found.tsx        # 404 page
│
├── components/              # React components
│   ├── About/              # About section
│   ├── Contact/            # Contact section
│   ├── Footer/             # Footer component
│   ├── Header/             # Header with navigation
│   │   ├── DesktopNav.tsx  # Desktop navigation
│   │   ├── MobileNav.tsx   # Mobile navigation
│   │   └── Sidebar.tsx     # Mobile sidebar menu
│   ├── LanguageToggle/    # Language switcher
│   ├── Profile/            # Hero/profile section
│   ├── Projects/           # Projects showcase
│   │   └── ProjectsCarousel.tsx
│   ├── Providers/          # Context providers wrapper
│   ├── ScrollToTop/        # Scroll to top button
│   ├── Skills/             # Skills section
│   │   └── SkillsCarousel.tsx
│   ├── ThemeToggle/        # Theme switcher
│   └── ui/                 # UI components
│       └── ErrorBoundary.tsx
│
├── contexts/               # React Context providers
│   └── LanguageContext.tsx # Language context
│
├── hooks/                  # Custom React hooks
│   ├── useActiveSection.ts
│   ├── useCarousel.ts
│   ├── useIntersectionObserver.ts
│   ├── useLanguage.ts
│   └── useTheme.ts
│
├── lib/                    # Utility libraries
│   ├── theme.ts           # Theme utilities
│   └── translations.ts    # Translation utilities
│
├── data/                   # Data files
│   └── translations.json   # Language translations (EN/DE)
│
├── public/                 # Static assets
│   └── assets/            # Images, PDFs, icons
│
├── types/                  # TypeScript type definitions
│   └── index.ts
│
├── mediaqueries-*.css      # Responsive breakpoint styles
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## 🛠️ Technologies Used

### Core Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript

### Styling
- **CSS Modules** - Scoped component styles
- **CSS Custom Properties** - Dynamic theming
- **Responsive Design** - Mobile-first approach

### Features & APIs
- **React Context API** - State management for theme and language
- **Intersection Observer API** - Scroll animations
- **LocalStorage API** - Persistent preferences
- **React Suspense** - Code splitting and lazy loading
- **Error Boundaries** - Error handling

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## 🎯 Key Functionalities

### Language System
- React Context-based language management
- Loads translations from `data/translations.json`
- Supports nested translation keys (e.g., `nav.about`)
- Automatically updates all components using `useLanguage` hook
- Persists language preference in localStorage

### Theme System
- React Context-based theme management
- CSS custom properties for dynamic theming
- Smooth transitions between themes
- Time-based automatic theme detection
- Manual override with toggle button
- Uses `useTheme` hook for theme access

### Navigation
- Smooth scrolling with header offset
- Active section highlighting using intersection observer
- Mobile hamburger menu with sidebar
- Desktop and mobile navigation components
- Keyboard accessible (Escape key support)

### Component Architecture
- Modular component structure
- CSS Modules for scoped styling
- Custom hooks for reusable logic
- Error boundaries for fault tolerance
- Lazy loading for performance

### Animations
- Intersection Observer for scroll-triggered animations
- Fade-in effects on section reveal
- Button ripple effects
- Smooth transitions throughout
- Carousel components for projects and skills

## 🎨 Customization

### Adding a New Language

1. Open `data/translations.json`
2. Add a new language object (e.g., `"fr": { ... }`)
3. Update the `LanguageToggle` component to include the new option
4. The language context will automatically handle the new language

### Modifying Colors

Edit CSS custom properties in component CSS modules or `app/globals.css`:

```css
:root {
  --color-black: rgb(0, 0, 0);
  --color-dark-grey: rgb(53, 53, 53);
  /* ... */
}

[data-theme="dark"] {
  --color-black: rgb(255, 255, 255);
  /* ... */
}
```

### Adding New Sections

1. Create a new component in `components/YourSection/`
2. Add corresponding styles in `YourSection.module.css`
3. Add translations in `data/translations.json`
4. Import and add the component to `app/page.tsx`
5. Update navigation links in `components/Header/`

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
# Example (if needed)
NEXT_PUBLIC_API_URL=your_api_url
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Organization

- **Components**: Modular React components with CSS Modules
- **Hooks**: Reusable custom hooks for common functionality
- **Contexts**: React Context for global state (theme, language)
- **Types**: TypeScript interfaces and types
- **Utils**: Helper functions and utilities

### Best Practices

- ✅ TypeScript for type safety
- ✅ CSS Modules for scoped styling
- ✅ React Server Components where possible
- ✅ Lazy loading for performance
- ✅ Error boundaries for error handling
- ✅ Semantic HTML5 elements
- ✅ ARIA labels for accessibility
- ✅ Mobile-first responsive design
- ✅ Clean, maintainable code structure

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- **Netlify**
- **AWS Amplify**
- **Railway**
- **DigitalOcean App Platform**

## 📄 License

Copyright © 2026 Aaron Paul Greyling. All Rights Reserved.

## 🤝 Contributing

This is a personal portfolio project. If you'd like to suggest improvements or report issues, please feel free to open an issue or submit a pull request.

## 📧 Contact

- **Email**: [aaron.p.greyling@gmail.com](mailto:aaron.p.greyling@gmail.com)
- **LinkedIn**: [Aaron Paul Greyling](https://www.linkedin.com/in/aaron-paul-greyling-54a8a954/)
- **GitHub**: [@AaronPG095](https://github.com/AaronPG095)

## 🌟 Acknowledgments

- Built with modern web standards and best practices
- Designed for performance and accessibility
- Inspired by the Next.js community and documentation

---

**Made with ❤️ by Aaron Paul Greyling**
