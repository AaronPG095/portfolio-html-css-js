// ============================================
// HAMBURGER MENU TOGGLE
// ============================================

// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================

function getTimeBasedTheme() {
  const hour = new Date().getHours();
  // Dark mode from 6 PM (18:00) to 6 AM (06:00)
  return hour >= 18 || hour < 6 ? 'dark' : 'light';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const toggles = document.querySelectorAll('.theme-toggle');
  toggles.forEach(toggle => {
    toggle.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
  });
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check for saved theme preference or use time-based default
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme || getTimeBasedTheme();
  setTheme(initialTheme);
  
  // Add event listeners to toggle buttons
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
  });
  
  // Update toggle state immediately
  updateThemeIcon(initialTheme);
});

// ============================================
// HAMBURGER MENU TOGGLE
// ============================================

function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  const isOpen = menu.classList.contains('open');
  
  menu.classList.toggle('open');
  icon.classList.toggle('open');
  
  // Update ARIA attributes for accessibility
  if (icon) {
    icon.setAttribute('aria-expanded', !isOpen);
  }
  
  // Close menu when clicking outside
  if (!isOpen) {
    document.addEventListener('click', closeMenuOnOutsideClick);
  } else {
    document.removeEventListener('click', closeMenuOnOutsideClick);
  }
}

function closeMenuOnOutsideClick(event) {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  const hamburgerNav = document.querySelector('#hamburger-nav');
  
  if (hamburgerNav && !hamburgerNav.contains(event.target) && menu.classList.contains('open')) {
    menu.classList.remove('open');
    icon.classList.remove('open');
    if (icon) {
      icon.setAttribute('aria-expanded', 'false');
    }
    document.removeEventListener('click', closeMenuOnOutsideClick);
  }
}

// ============================================
// SMOOTH SCROLL WITH OFFSET
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const menu = document.querySelector('.menu-links');
      const icon = document.querySelector('.hamburger-icon');
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
        icon.classList.remove('open');
        if (icon) {
          icon.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });
});

// ============================================
// SCROLL ANIMATIONS (FADE-IN ON SCROLL)
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
  
  // Fade in profile section immediately
  const profileSection = document.querySelector('#profile');
  if (profileSection) {
    setTimeout(() => {
      profileSection.style.opacity = '1';
      profileSection.style.transform = 'translateY(0)';
    }, 100);
  }
});

// ============================================
// ACTIVE NAVIGATION STATE
// ============================================

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .menu-links a');
  const headerHeight = document.querySelector('header')?.offsetHeight || 0;
  const scrollPosition = window.scrollY + headerHeight + 20; // Reduced offset to trigger earlier
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav(); // Initial call

// ============================================
// SCROLL TO TOP BUTTON (OPTIONAL)
// ============================================

let scrollToTopBtn = null;

function createScrollToTopButton() {
  scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--color-dark-grey);
    color: var(--color-white);
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease, background-color 300ms ease;
    z-index: 1000;
    box-shadow: var(--shadow-medium);
  `;
  
  // Update scroll-to-top button colors based on theme
  function updateScrollButtonTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    scrollToTopBtn.style.background = isDark ? 'var(--color-dark-grey)' : 'var(--color-dark-grey)';
    scrollToTopBtn.style.color = isDark ? 'var(--color-white)' : 'var(--color-white)';
  }
  
  // Watch for theme changes
  const themeObserver = new MutationObserver(updateScrollButtonTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  updateScrollButtonTheme();
  
  document.body.appendChild(scrollToTopBtn);
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }
  });
  
  scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-3px)';
    scrollToTopBtn.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
  });
  
  scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ============================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================

document.addEventListener('keydown', (e) => {
  // Close menu with Escape key
  if (e.key === 'Escape') {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    if (menu && menu.classList.contains('open')) {
      menu.classList.remove('open');
      icon.classList.remove('open');
      if (icon) {
        icon.setAttribute('aria-expanded', 'false');
      }
    }
  }
});

// ============================================
// PROJECT LINK HANDLER
// ============================================

function openProjectLink(url) {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

// ============================================
// ENHANCED BUTTON INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .nav-links a.active,
  .menu-links a.active {
    color: var(--color-black);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 0.5rem;
  }
`;
document.head.appendChild(style);
