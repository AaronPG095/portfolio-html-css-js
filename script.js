// ============================================
// LANGUAGE TRANSLATION SYSTEM
// ============================================

let translations = {};
let currentLanguage = 'en';

// Load translations from JSON file
async function loadTranslations() {
  try {
    const response = await fetch('./translations.json');
    translations = await response.json();
    return translations;
  } catch (error) {
    console.error('Error loading translations:', error);
    return null;
  }
}

// Get nested translation value using dot notation (e.g., "nav.about")
function getTranslation(key, lang = currentLanguage) {
  if (!translations[lang]) return key;
  const keys = key.split('.');
  let value = translations[lang];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  return typeof value === 'string' ? value : key;
}

// Apply translations to all elements with data-translate attribute
function applyTranslations(lang = currentLanguage) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    const translation = getTranslation(key, lang);
    element.textContent = translation;
  });
  
  // Update CV download button to use correct language file
  const cvButton = document.querySelector('.btn-color-2[data-translate="profile.downloadCV"]');
  if (cvButton) {
    const cvFile = lang === 'de' ? './assets/CV-German.pdf' : './assets/CV-English.pdf';
    cvButton.setAttribute('onclick', `window.open('${cvFile}')`);
    cvButton.setAttribute('aria-label', lang === 'de' ? 'Lebenslauf auf Deutsch herunterladen' : 'Download CV in English');
  }
  
  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', lang);
}

// Set language and apply translations
function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  applyTranslations(lang);
  updateLanguageToggle(lang);
}

// Update language toggle visual state
function updateLanguageToggle(lang) {
  const toggles = document.querySelectorAll('.language-toggle');
  toggles.forEach(toggle => {
    const enOption = toggle.querySelector('[data-lang="en"]');
    const deOption = toggle.querySelector('[data-lang="de"]');
    
    if (lang === 'en') {
      enOption?.classList.add('active');
      deOption?.classList.remove('active');
    } else {
      enOption?.classList.remove('active');
      deOption?.classList.add('active');
    }
  });
}

// Toggle language between English and German
function toggleLanguage() {
  const newLang = currentLanguage === 'en' ? 'de' : 'en';
  setLanguage(newLang);
}

// Initialize language system
async function initializeLanguage() {
  await loadTranslations();
  
  // Get saved language preference or default to English
  const savedLanguage = localStorage.getItem('language');
  const initialLanguage = savedLanguage || 'en';
  setLanguage(initialLanguage);
  
  // Add event listeners to language toggle buttons
  const languageToggles = document.querySelectorAll('.language-toggle');
  languageToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      // Check if clicking on a specific language option
      const clickedLang = e.target.getAttribute('data-lang');
      if (clickedLang && (clickedLang === 'en' || clickedLang === 'de')) {
        setLanguage(clickedLang);
      } else {
        toggleLanguage();
      }
    });
  });
}

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
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize language first
  await initializeLanguage();
  
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
  
  // Initialize carousel
  initializeCarousel();
  
  // Initialize skills carousel (mobile)
  initializeExperienceCarousel();
});

// ============================================
// SKILLS CAROUSEL (MOBILE)
// Same logic as Projects Carousel
// ============================================

let expCarouselContainer = null;
let expTouchStartX = null;
let expTouchEndX = null;
let expIsDragging = false;
let expDragStartX = 0;
let expScrollStartX = 0;
let expIsAnimating = false;

function scrollExperienceCarousel(direction) {
  if (!expCarouselContainer || expIsAnimating) return;
  
  const cards = Array.from(expCarouselContainer.querySelectorAll('.details-container'));
  if (cards.length === 0) return;
  
  const containerWidth = expCarouselContainer.clientWidth;
  const containerRect = expCarouselContainer.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;
  
  // Find currently centered card
  let currentIndex = -1;
  let minDistance = Infinity;
  
  cards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const distance = Math.abs(cardCenter - containerCenter);
    
    if (distance < minDistance) {
      minDistance = distance;
      currentIndex = index;
    }
  });
  
  if (currentIndex === -1) return;
  
  // Determine next card index
  let nextIndex;
  if (direction === 'left') {
    if (currentIndex === 0) return;
    nextIndex = currentIndex - 1;
  } else {
    if (currentIndex === cards.length - 1) return;
    nextIndex = currentIndex + 1;
  }
  
  const targetCard = cards[nextIndex];
  if (!targetCard) return;
  
  // Calculate scroll position to center the target card
  const cardLeft = targetCard.offsetLeft;
  const cardWidth = targetCard.offsetWidth;
  const targetScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2);
  
  // Smooth scroll animation
  const startScroll = expCarouselContainer.scrollLeft;
  const distance = targetScroll - startScroll;
  const duration = 300;
  const startTime = performance.now();
  
  expIsAnimating = true;
  const originalScrollBehavior = expCarouselContainer.style.scrollBehavior;
  expCarouselContainer.style.scrollBehavior = 'auto';
  
  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    
    const newScroll = startScroll + (distance * ease);
    expCarouselContainer.scrollLeft = Math.max(0, newScroll);
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      expCarouselContainer.scrollLeft = targetScroll;
      expCarouselContainer.style.scrollBehavior = originalScrollBehavior;
      expIsAnimating = false;
      updateExpCarouselUI();
    }
  }
  
  requestAnimationFrame(animateScroll);
}

function snapExpToNearestCenter() {
  if (!expCarouselContainer || expIsAnimating) return;
  
  const cards = Array.from(expCarouselContainer.querySelectorAll('.details-container'));
  if (cards.length === 0) return;
  
  const containerRect = expCarouselContainer.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;
  
  let nearestCard = null;
  let minDistance = Infinity;
  
  cards.forEach((card) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const distance = Math.abs(cardCenter - containerCenter);
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestCard = card;
    }
  });
  
  if (!nearestCard) return;
  
  const containerWidth = expCarouselContainer.clientWidth;
  const cardLeft = nearestCard.offsetLeft;
  const cardWidth = nearestCard.offsetWidth;
  const targetScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2);
  
  const startScroll = expCarouselContainer.scrollLeft;
  const scrollDistance = targetScroll - startScroll;
  const duration = 300;
  const startTime = performance.now();
  
  expIsAnimating = true;
  const originalScrollBehavior = expCarouselContainer.style.scrollBehavior;
  expCarouselContainer.style.scrollBehavior = 'auto';
  
  function animateSnap(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    
    const newScroll = startScroll + (scrollDistance * ease);
    expCarouselContainer.scrollLeft = Math.max(0, newScroll);
    
    if (progress < 1) {
      requestAnimationFrame(animateSnap);
    } else {
      expCarouselContainer.scrollLeft = targetScroll;
      expCarouselContainer.style.scrollBehavior = originalScrollBehavior;
      expIsAnimating = false;
      updateExpCarouselUI();
    }
  }
  
  requestAnimationFrame(animateSnap);
}

function updateExpCarouselUI() {
  if (!expCarouselContainer) return;
  
  const dots = document.querySelectorAll('.exp-dot');
  const cards = Array.from(expCarouselContainer.querySelectorAll('.details-container'));
  if (cards.length === 0) return;
  
  const containerRect = expCarouselContainer.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;
  
  let activeIndex = 0;
  let minDistance = Infinity;
  
  cards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const distance = Math.abs(cardCenter - containerCenter);
    
    if (distance < minDistance) {
      minDistance = distance;
      activeIndex = index;
    }
  });
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });
}

function initializeExperienceCarousel() {
  expCarouselContainer = document.getElementById('experience-carousel-container');
  const experienceContainer = document.querySelector('#skills .about-containers');
  const dots = document.querySelectorAll('.exp-dot');
  
  if (!expCarouselContainer || !experienceContainer || dots.length === 0) return;
  
  const cards = experienceContainer.querySelectorAll('.details-container');
  if (cards.length === 0) return;
  
  // Set initial cursor style
  expCarouselContainer.style.cursor = 'grab';
  
  // Click on dot to scroll to specific card
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const targetCard = cards[index];
      if (!targetCard) return;
      
      const containerWidth = expCarouselContainer.clientWidth;
      const cardLeft = targetCard.offsetLeft;
      const cardWidth = targetCard.offsetWidth;
      const targetScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      
      const startScroll = expCarouselContainer.scrollLeft;
      const distance = targetScroll - startScroll;
      const duration = 300;
      const startTime = performance.now();
      
      expIsAnimating = true;
      const originalScrollBehavior = expCarouselContainer.style.scrollBehavior;
      expCarouselContainer.style.scrollBehavior = 'auto';
      
      function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        
        const newScroll = startScroll + (distance * ease);
        expCarouselContainer.scrollLeft = Math.max(0, newScroll);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          expCarouselContainer.scrollLeft = targetScroll;
          expCarouselContainer.style.scrollBehavior = originalScrollBehavior;
          expIsAnimating = false;
          updateExpCarouselUI();
        }
      }
      
      requestAnimationFrame(animateScroll);
    });
  });
  
  // Scroll event to update UI
  expCarouselContainer.addEventListener('scroll', updateExpCarouselUI);
  
  // Touch events for swipe - allow native scrolling
  let expTouchStartY = null;
  let expIsScrolling = false;
  
  expCarouselContainer.addEventListener('touchstart', (e) => {
    expTouchStartX = e.touches[0].clientX;
    expTouchStartY = e.touches[0].clientY;
    expIsScrolling = false;
  }, { passive: true });
  
  expCarouselContainer.addEventListener('touchmove', (e) => {
    if (expTouchStartX === null || expTouchStartY === null) return;
    
    const deltaX = Math.abs(e.touches[0].clientX - expTouchStartX);
    const deltaY = Math.abs(e.touches[0].clientY - expTouchStartY);
    
    // If vertical movement is greater, user is scrolling page - don't interfere
    if (deltaY > deltaX) {
      expIsScrolling = true;
      return;
    }
    
    expTouchEndX = e.touches[0].clientX;
  }, { passive: true });
  
  expCarouselContainer.addEventListener('touchend', () => {
    // Only handle swipe if it was a horizontal gesture and not page scrolling
    if (expIsScrolling || expTouchStartX === null || expTouchEndX === null) {
      // Allow native scrolling to complete, then snap after a delay
      setTimeout(() => {
        if (!expIsDragging) {
          snapExpToNearestCenter();
        }
      }, 100);
      expTouchStartX = null;
      expTouchEndX = null;
      expTouchStartY = null;
      expIsScrolling = false;
      return;
    }
    
    const distance = expTouchStartX - expTouchEndX;
    const minSwipeDistance = 50;
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        scrollExperienceCarousel('right');
      } else {
        scrollExperienceCarousel('left');
      }
    } else {
      snapExpToNearestCenter();
    }
    
    expTouchStartX = null;
    expTouchEndX = null;
    expTouchStartY = null;
    expIsScrolling = false;
  }, { passive: true });
  
  // Mouse drag events
  expCarouselContainer.addEventListener('mousedown', (e) => {
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    
    expIsDragging = true;
    expDragStartX = e.clientX;
    expScrollStartX = expCarouselContainer.scrollLeft;
    expCarouselContainer.style.cursor = 'grabbing';
    expCarouselContainer.style.userSelect = 'none';
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!expIsDragging) return;
    
    const deltaX = e.clientX - expDragStartX;
    expCarouselContainer.scrollLeft = expScrollStartX - (deltaX * 1.5);
    e.preventDefault();
  });
  
  document.addEventListener('mouseup', () => {
    if (!expIsDragging) return;
    
    expIsDragging = false;
    expCarouselContainer.style.cursor = 'grab';
    expCarouselContainer.style.userSelect = '';
    snapExpToNearestCenter();
  });
  
  expCarouselContainer.addEventListener('mouseleave', () => {
    if (expIsDragging) {
      expIsDragging = false;
      expCarouselContainer.style.cursor = 'grab';
      expCarouselContainer.style.userSelect = '';
      updateExpCarouselUI();
    }
  });
  
  // Set initial position to Frontend card (index 0)
  setTimeout(() => {
    const firstCard = cards[0];
    if (firstCard) {
      const containerWidth = expCarouselContainer.clientWidth;
      const cardLeft = firstCard.offsetLeft;
      const cardWidth = firstCard.offsetWidth;
      const centerScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      
      expCarouselContainer.style.scrollBehavior = 'auto';
      expCarouselContainer.scrollLeft = Math.max(0, centerScroll);
      
      setTimeout(() => {
        expCarouselContainer.style.scrollBehavior = 'smooth';
        updateExpCarouselUI();
      }, 0);
    }
  }, 100);
  
  // Update on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateExpCarouselUI, 250);
  });
}

// ============================================
// SIDEBAR MENU TOGGLE
// ============================================

function toggleMenu() {
  const sidebar = document.querySelector('.sidebar-menu');
  const backdrop = document.querySelector('.sidebar-backdrop');
  const icon = document.querySelector('.hamburger-icon');
  const isOpen = sidebar && sidebar.classList.contains('open');
  
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
  if (backdrop) {
    backdrop.classList.toggle('open');
  }
  if (icon) {
    icon.classList.toggle('open');
    icon.setAttribute('aria-expanded', !isOpen);
  }
  
  // Prevent body scroll when sidebar is open
  if (!isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Close sidebar with Escape key (handled in keyboard navigation section)

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
      
      // Close mobile sidebar if open
      const sidebar = document.querySelector('.sidebar-menu');
      const backdrop = document.querySelector('.sidebar-backdrop');
      const icon = document.querySelector('.hamburger-icon');
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');
        if (icon) {
          icon.classList.remove('open');
          icon.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
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
  const navLinks = document.querySelectorAll('.nav-links a, .sidebar-links a');
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
  // Close sidebar with Escape key
  if (e.key === 'Escape') {
    const sidebar = document.querySelector('.sidebar-menu');
    const backdrop = document.querySelector('.sidebar-backdrop');
    const icon = document.querySelector('.hamburger-icon');
    if (sidebar && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      if (icon) {
        icon.classList.remove('open');
        icon.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
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
// PROJECTS CAROUSEL FUNCTIONALITY
// ============================================

let carouselContainer = null;
let projectDotsContainer = null;
let projectDots = [];
let touchStartX = null;
let touchEndX = null;
let isDragging = false;
let dragStartX = 0;
let scrollStartX = 0;

let isCarouselAnimating = false;
let dotUpdateRAF = null;

function getProjects() {
  if (!carouselContainer) return [];
  return Array.from(carouselContainer.querySelectorAll('.color-container'));
}

function getCurrentProjectIndex() {
  if (!carouselContainer) return -1;
  const projects = getProjects();
  if (projects.length === 0) return -1;
  
  const containerRect = carouselContainer.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;
  
  let currentIndex = 0;
  let minDistance = Infinity;
  
  projects.forEach((project, index) => {
    const projectRect = project.getBoundingClientRect();
    const projectCenter = projectRect.left + projectRect.width / 2;
    const distance = Math.abs(projectCenter - containerCenter);
    
    if (distance < minDistance) {
      minDistance = distance;
      currentIndex = index;
    }
  });
  
  return currentIndex;
}

function requestDotUpdate() {
  if (dotUpdateRAF) return;
  dotUpdateRAF = requestAnimationFrame(() => {
    dotUpdateRAF = null;
    updateProjectDots();
  });
}

function updateProjectDots() {
  if (!projectDots.length) return;
  const currentIndex = getCurrentProjectIndex();
  if (currentIndex === -1) return;
  
  projectDots.forEach((dot, index) => {
    const isActive = index === currentIndex;
    dot.classList.toggle('active', isActive);
    dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    dot.tabIndex = isActive ? 0 : -1;
  });
}

function scrollToProjectIndex(targetIndex, options = {}) {
  if (!carouselContainer || isCarouselAnimating) return;
  const projects = getProjects();
  const targetProject = projects[targetIndex];
  if (!targetProject) return;
  
  const duration = typeof options.duration === 'number' ? options.duration : 600;
  const containerRect = carouselContainer.getBoundingClientRect();
  const projectRect = targetProject.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;
  const projectCenter = projectRect.left + projectRect.width / 2;
  const delta = projectCenter - containerCenter;
  
  const scrollWidth = carouselContainer.scrollWidth;
  const clientWidth = carouselContainer.clientWidth;
  const maxScroll = Math.max(0, scrollWidth - clientWidth);
  
  let targetScroll = carouselContainer.scrollLeft + delta;
  targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
  
  const startScroll = carouselContainer.scrollLeft;
  const distance = targetScroll - startScroll;
  const startTime = performance.now();
  
  isCarouselAnimating = true;
  const originalScrollBehavior = carouselContainer.style.scrollBehavior;
  carouselContainer.style.scrollBehavior = 'auto';
  
  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    
    const newScroll = startScroll + (distance * ease);
    const clampedScroll = Math.max(0, Math.min(newScroll, maxScroll));
    carouselContainer.scrollLeft = clampedScroll;
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      carouselContainer.scrollLeft = targetScroll;
      carouselContainer.style.scrollBehavior = originalScrollBehavior;
      isCarouselAnimating = false;
      updateProjectDots();
    }
  }
  
  requestAnimationFrame(animateScroll);
}

function scrollCarousel(direction) {
  if (!carouselContainer || isCarouselAnimating) return;
  const projects = getProjects();
  if (projects.length === 0) return;
  
  const currentIndex = getCurrentProjectIndex();
  let targetIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
  targetIndex = Math.max(0, Math.min(projects.length - 1, targetIndex));
  
  if (targetIndex === currentIndex) return;
  scrollToProjectIndex(targetIndex);
}

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
  touchEndX = e.touches[0].clientX;
}

function handleTouchEnd() {
  if (touchStartX === null || touchEndX === null) {
    // If no swipe detected, snap to nearest center
    snapToNearestCenter();
    // Reset touch values
    touchStartX = null;
    touchEndX = null;
    return;
  }
  
  const distance = touchStartX - touchEndX;
  const minSwipeDistance = 50; // Minimum distance for a swipe
  
  if (Math.abs(distance) > minSwipeDistance) {
    if (distance > 0) {
      // Swipe left - scroll right
      scrollCarousel('right');
    } else {
      // Swipe right - scroll left
      scrollCarousel('left');
    }
  } else {
    // Small movement, snap to nearest center
    snapToNearestCenter();
  }
  
  // Reset touch values
  touchStartX = null;
  touchEndX = null;
}

function handleMouseDown(e) {
  // Don't start drag if clicking on buttons or links
  if (e.target.closest('button') || e.target.closest('a')) {
    return;
  }
  
  isDragging = true;
  dragStartX = e.clientX;
  scrollStartX = carouselContainer.scrollLeft;
  carouselContainer.style.cursor = 'grabbing';
  carouselContainer.style.userSelect = 'none';
  e.preventDefault();
}

function handleMouseMove(e) {
  if (!isDragging) return;
  
  const deltaX = e.clientX - dragStartX;
  // Multiply by 1.5 to make dragging faster and more responsive
  carouselContainer.scrollLeft = scrollStartX - (deltaX * 1.5);
  e.preventDefault();
}

function snapToNearestCenter() {
  if (!carouselContainer || isCarouselAnimating) return;
  const nearestIndex = getCurrentProjectIndex();
  if (nearestIndex === -1) return;
  scrollToProjectIndex(nearestIndex, { duration: 300 });
}

function handleMouseUp() {
  if (!isDragging) return;
  
  isDragging = false;
  carouselContainer.style.cursor = 'grab';
  carouselContainer.style.userSelect = '';
  
  // Snap to nearest centered project after drag
  snapToNearestCenter();
}

function handleMouseLeave() {
  if (isDragging) {
    isDragging = false;
    carouselContainer.style.cursor = 'grab';
    carouselContainer.style.userSelect = '';
  }
  requestDotUpdate();
}

function setupCarousel() {
  const projectsContainer = carouselContainer.querySelector('.projects-container');
  if (!projectsContainer) return;
  
  // Wait for layout to calculate proper widths
  setTimeout(() => {
    const projects = Array.from(projectsContainer.querySelectorAll('.color-container'));
    if (projects.length === 0) return;
    
    // Remove any existing clones
    const existingClones = projectsContainer.querySelectorAll('.carousel-clone');
    existingClones.forEach(clone => clone.remove());
    buildProjectDots();
    
    // Set initial scroll position to center the first project
    carouselContainer.style.scrollBehavior = 'auto';
    const firstProject = projects[0];
    if (firstProject) {
      const containerWidth = carouselContainer.clientWidth;
      const projectLeft = firstProject.offsetLeft; // Relative to projects-container
      const projectWidth = firstProject.offsetWidth;
      const centerScroll = projectLeft - (containerWidth / 2) + (projectWidth / 2);
      carouselContainer.scrollLeft = Math.max(0, centerScroll);
    }
    setTimeout(() => {
      carouselContainer.style.scrollBehavior = 'smooth';
      requestDotUpdate();
    }, 0);
  }, 100);
}

function buildProjectDots() {
  if (!projectDotsContainer) return;
  const projects = getProjects();
  projectDotsContainer.innerHTML = '';
  projectDots = [];
  
  if (projects.length <= 1) {
    projectDotsContainer.style.display = 'none';
    return;
  }
  
  projectDotsContainer.style.display = '';
  
  projects.forEach((project, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'project-dot';
    dot.setAttribute('data-index', index.toString());
    dot.setAttribute('role', 'tab');
    const titleElement = project.querySelector('.project-title');
    if (titleElement) {
      if (!titleElement.id) {
        titleElement.id = `project-title-${index + 1}`;
      }
      dot.setAttribute('aria-labelledby', titleElement.id);
    } else {
      dot.setAttribute('aria-label', `Show project ${index + 1}`);
    }
    dot.setAttribute('aria-selected', 'false');
    dot.tabIndex = index === 0 ? 0 : -1;
    
    dot.addEventListener('click', () => scrollToProjectIndex(index));
    dot.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const delta = event.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = Math.max(0, Math.min(projectDots.length - 1, index + delta));
        projectDots[nextIndex]?.focus();
        scrollToProjectIndex(nextIndex);
      }
    });
    
    projectDotsContainer.appendChild(dot);
    projectDots.push(dot);
  });
  
  updateProjectDots();
}

function initializeCarousel() {
  carouselContainer = document.getElementById('carousel-container');
  projectDotsContainer = document.getElementById('projects-carousel-dots');
  
  if (!carouselContainer || !projectDotsContainer) {
    return; // Carousel elements not found
  }
  
  // Set initial cursor style
  carouselContainer.style.cursor = 'grab';
  
  // Setup carousel
  buildProjectDots();
  setupCarousel();

  // Add scroll event listener to update dots
  carouselContainer.addEventListener('scroll', requestDotUpdate);
  
  // Add touch event listeners for swipe support
  carouselContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
  carouselContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
  carouselContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // Add mouse drag event listeners
  carouselContainer.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  carouselContainer.addEventListener('mouseleave', handleMouseLeave);

  // Initial dot state
  requestDotUpdate();
  
  // Update dot state on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      snapToNearestCenter();
      requestDotUpdate();
    }, 250);
  });
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
  .sidebar-links a.active {
    color: var(--color-black);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 0.5rem;
  }
`;
document.head.appendChild(style);
