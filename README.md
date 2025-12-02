# 🌐 NextJS Portfolio - Aaron Paul Greyling

A modern, responsive portfolio website showcasing my work as a Fullstack Developer. Built with Next.js 14 (App Router), React, and CSS Modules, featuring bilingual support (English/German), dark/light theme toggle, and smooth animations.

![Portfolio Preview](assets/Screenshot%202024-05-08%20140820.png)

## ✨ Features

### 🌍 **Multi-Language Support**
- **English & German** translations
- Seamless language switching with persistent preferences
- Dynamic CV download based on selected language
- Translation system using JSON-based configuration

### 🎨 **Theme System**
- **Dark/Light mode** toggle with smooth transitions
- Time-based theme detection (dark mode from 6 PM to 6 AM)
- Persistent theme preference using localStorage
- Custom CSS variables for consistent theming

### 📱 **Responsive Design**
- Fully responsive layout for all screen sizes
- Mobile-friendly hamburger navigation menu
- Touch-optimized interactions
- Adaptive typography and spacing

### ♿ **Accessibility**
- ARIA labels and semantic HTML
- Keyboard navigation support (Escape to close menu)
- Smooth scroll with proper offset
- High contrast ratios for readability

### 🎭 **Interactive Elements**
- Smooth scroll animations on section reveal
- Active navigation state tracking
- Scroll-to-top button
- Button ripple effects
- Fade-in animations on scroll

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AaronPG095/portfolio-html-css-js.git
   cd portfolio-html-css-js
   ```

2. **Open the project**
   - Option 1: Open `index.html` directly in your browser
   - Option 2: Use a local server (recommended for development)
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the website**
   - Direct file: Open `index.html` in your browser
   - Local server: Navigate to `http://localhost:8000`

## 📁 Project Structure

```
portfolio-html-css-js/
│
├── index.html              # Main HTML structure
├── style.css               # Main stylesheet with theme variables
├── mediaqueries.css        # Responsive design breakpoints
├── script.js               # JavaScript functionality
├── translations.json       # Language translations (EN/DE)
│
└── assets/                 # Static assets
    ├── profile-pic-1.jpg   # Profile picture
    ├── CV-English.pdf      # English CV
    ├── CV-German.pdf       # German CV
    ├── *.png               # Icons and project screenshots
    └── ...
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, Animations
- **JavaScript (ES6+)** - Modern JavaScript features
  - Async/Await
  - Intersection Observer API
  - LocalStorage API
  - Fetch API
- **JSON** - Translation data structure

## 🎯 Key Functionalities

### Language System
- Loads translations from `translations.json`
- Supports nested translation keys (e.g., `nav.about`)
- Automatically updates all elements with `data-translate` attribute
- Persists language preference in localStorage

### Theme System
- CSS custom properties for dynamic theming
- Smooth transitions between themes
- Time-based automatic theme detection
- Manual override with toggle button

### Navigation
- Smooth scrolling with header offset
- Active section highlighting
- Mobile hamburger menu
- Keyboard accessible (Escape key support)

### Animations
- Intersection Observer for scroll-triggered animations
- Fade-in effects on section reveal
- Button ripple effects
- Smooth transitions throughout

## 🎨 Customization

### Adding a New Language

1. Open `translations.json`
2. Add a new language object (e.g., `"fr": { ... }`)
3. Update the language toggle in `index.html` to include the new option
4. Update `script.js` to handle the new language code

### Modifying Colors

Edit CSS custom properties in `style.css`:

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

1. Add HTML structure in `index.html`
2. Add corresponding styles in `style.css`
3. Add translations in `translations.json`
4. Update navigation links

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

### Code Organization

- **HTML**: Semantic structure with accessibility in mind
- **CSS**: Modular approach with custom properties
- **JavaScript**: Organized into logical sections with clear comments
- **Translations**: JSON-based, easy to extend

### Best Practices

- ✅ Semantic HTML5 elements
- ✅ ARIA labels for accessibility
- ✅ Mobile-first responsive design
- ✅ Performance optimized (lazy loading images)
- ✅ Clean, maintainable code structure

## 📄 License

Copyright © 2024 Aaron Paul Greyling. All Rights Reserved.

## 🤝 Contributing

This is a personal portfolio project. If you'd like to suggest improvements or report issues, please feel free to open an issue or submit a pull request.

## 📧 Contact

- **Email**: [aaron.p.greyling@gmail.com](mailto:aaron.p.greyling@gmail.com)
- **LinkedIn**: [Aaron Paul Greyling](https://www.linkedin.com/in/aaron-paul-greyling-54a8a954/)
- **GitHub**: [@AaronPG095](https://github.com/AaronPG095)

## 🌟 Acknowledgments

- Built with modern web standards
- Inspired by best practices in web development
- Designed for performance and accessibility

---

**Made with ❤️ by Aaron Paul Greyling**

