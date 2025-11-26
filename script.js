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
// PROJECTS CAROUSEL FUNCTIONALITY
// ============================================

let carouselContainer = null;
let carouselArrowLeft = null;
let carouselArrowRight = null;
let touchStartX = null;
let touchEndX = null;
let isDragging = false;
let dragStartX = 0;
let scrollStartX = 0;

let isCarouselAnimating = false;

function scrollCarousel(direction) {
  if (!carouselContainer || isCarouselAnimating) return;
  
  // Get all project cards (no clones needed)
  const realProjects = Array.from(carouselContainer.querySelectorAll('.color-container'));
  if (realProjects.length === 0) return;
  
  // Find the currently centered project by checking scroll position relative to project positions
  const currentScroll = carouselContainer.scrollLeft;
  const containerWidth = carouselContainer.clientWidth;
  const containerRect = carouselContainer.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;
  
  // Find which real project is currently closest to center based on scroll position
  // Use offsetLeft which is relative to projects-container (accounts for padding automatically)
  let currentIndex = -1;
  let minDistance = Infinity;
  
  realProjects.forEach((project, index) => {
    const projectLeft = project.offsetLeft;
    const projectWidth = project.offsetWidth;
    const projectCenterScroll = projectLeft - (containerWidth / 2) + (projectWidth / 2);
    const distance = Math.abs(currentScroll - projectCenterScroll);
    
    if (distance < minDistance) {
      minDistance = distance;
      currentIndex = index;
    }
  });
  
  // If we couldn't find a centered project, try to find by visual position
  if (currentIndex === -1) {
    realProjects.forEach((project, index) => {
      const projectRect = project.getBoundingClientRect();
      const projectCenter = projectRect.left + projectRect.width / 2;
      const distance = Math.abs(projectCenter - containerCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        currentIndex = index;
      }
    });
  }
  
  if (currentIndex === -1) return;
  
  // Determine next project index (no wrapping - stop at boundaries)
  let nextIndex;
  if (direction === 'left') {
    // Can't go left if already at the start
    if (currentIndex === 0) return;
    nextIndex = currentIndex - 1;
  } else {
    // Can't go right if already at the end
    if (currentIndex === realProjects.length - 1) return;
    nextIndex = currentIndex + 1;
  }
  
  const targetProject = realProjects[nextIndex];
  if (!targetProject) return;
  
  // Calculate scroll position to center the target project
  // offsetLeft is relative to projects-container, but we need to account for carousel padding
  const projectLeft = targetProject.offsetLeft; // Relative to projects-container
  const projectWidth = targetProject.offsetWidth;
  
  // Get the padding-left of carousel-container (for centering calculation)
  const carouselPaddingLeft = parseFloat(getComputedStyle(carouselContainer).paddingLeft) || 0;
  
  // Calculate target scroll: project left edge - half container width + half project width
  // This centers the project in the visible area (accounting for padding)
  let targetScroll = projectLeft - (containerWidth / 2) + (projectWidth / 2);
  
  // Clamp target scroll to valid bounds
  // With content-box, scrollWidth includes all content including padding
  const scrollWidth = carouselContainer.scrollWidth;
  const clientWidth = carouselContainer.clientWidth;
  const maxScroll = Math.max(0, scrollWidth - clientWidth);
  
  // For the last project, allow scrolling to reach it (may need to exceed maxScroll slightly)
  // The padding-right on projects-container should provide enough space
  if (nextIndex === realProjects.length - 1) {
    // Last project: ensure we can scroll to center it
    // Don't clamp to maxScroll - allow the full calculated position
    targetScroll = Math.max(0, Math.min(targetScroll, scrollWidth));
  } else {
    // Other projects: clamp to normal bounds
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
  }
  
  // Custom smooth scroll with rotation-like animation (600ms duration)
  const startScroll = carouselContainer.scrollLeft;
  const distance = targetScroll - startScroll;
  const duration = 600; // Slightly longer for smoother rotation feel
  const startTime = performance.now();
  
  // Mark as animating to prevent conflicts
  isCarouselAnimating = true;
  
  // Temporarily disable smooth scroll behavior to avoid conflicts
  const originalScrollBehavior = carouselContainer.style.scrollBehavior;
  carouselContainer.style.scrollBehavior = 'auto';
  
  let animationFrameId = null;
  
  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Rotation-like easing: smooth acceleration and deceleration with circular motion feel
    // Using cubic-bezier-like easing that mimics rotation (smooth start, peak, smooth end)
    const ease = progress < 0.5
      ? 4 * progress * progress * progress // Smooth acceleration
      : 1 - Math.pow(-2 * progress + 2, 3) / 2; // Smooth deceleration with rotation feel
    
    const newScroll = startScroll + (distance * ease);
    // Clamp during animation - use scrollWidth to allow reaching the end
    const scrollWidth = carouselContainer.scrollWidth;
    const clampedScroll = Math.max(0, Math.min(newScroll, scrollWidth));
    carouselContainer.scrollLeft = clampedScroll;
    
    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animateScroll);
    } else {
      // Ensure final position is correct
      carouselContainer.scrollLeft = targetScroll;
      // Restore scroll behavior and update visibility
      carouselContainer.style.scrollBehavior = originalScrollBehavior;
      isCarouselAnimating = false;
      updateArrowVisibility();
    }
  }
  
  animationFrameId = requestAnimationFrame(animateScroll);
}

function updateArrowVisibility() {
  if (!carouselContainer || !carouselArrowLeft || !carouselArrowRight) return;
  
  const realProjects = Array.from(carouselContainer.querySelectorAll('.color-container'));
  if (realProjects.length === 0) return;
  
  const currentScroll = carouselContainer.scrollLeft;
  const containerWidth = carouselContainer.clientWidth;
  
  // Find which project is currently centered
  // Use getBoundingClientRect for accurate position calculation accounting for padding
  const containerRect = carouselContainer.getBoundingClientRect();
  let currentIndex = -1;
  let minDistance = Infinity;
  
  realProjects.forEach((project, index) => {
    // Use offsetLeft which is relative to projects-container (accounts for padding automatically)
    const projectLeft = project.offsetLeft;
    const projectWidth = project.offsetWidth;
    const projectCenterScroll = projectLeft - (containerWidth / 2) + (projectWidth / 2);
    const distance = Math.abs(currentScroll - projectCenterScroll);
    
    if (distance < minDistance) {
      minDistance = distance;
      currentIndex = index;
    }
  });
  
  // Show/hide arrows based on position (no wrapping)
  if (currentIndex === 0) {
    // At the start - can only go right
    carouselArrowLeft.disabled = true;
    carouselArrowLeft.setAttribute('aria-hidden', 'true');
    carouselArrowRight.disabled = false;
    carouselArrowRight.removeAttribute('aria-hidden');
  } else if (currentIndex === realProjects.length - 1) {
    // At the end - can only go left
    carouselArrowLeft.disabled = false;
    carouselArrowLeft.removeAttribute('aria-hidden');
    carouselArrowRight.disabled = true;
    carouselArrowRight.setAttribute('aria-hidden', 'true');
  } else {
    // In the middle - can go both directions
    carouselArrowLeft.disabled = false;
    carouselArrowLeft.removeAttribute('aria-hidden');
    carouselArrowRight.disabled = false;
    carouselArrowRight.removeAttribute('aria-hidden');
  }
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
  
  const projects = Array.from(carouselContainer.querySelectorAll('.color-container'));
  if (projects.length === 0) return;
  
  const containerRect = carouselContainer.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;
  
  // Find the nearest project to center
  let nearestProject = null;
  let minDistance = Infinity;
  
  projects.forEach((project) => {
    const projectRect = project.getBoundingClientRect();
    const projectCenter = projectRect.left + projectRect.width / 2;
    const distance = Math.abs(projectCenter - containerCenter);
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestProject = project;
    }
  });
  
  if (!nearestProject) return;
  
  // Calculate scroll position to center the nearest project
  // Use offsetLeft which is relative to projects-container (accounts for padding automatically)
  const containerWidth = carouselContainer.clientWidth;
  const projectLeft = nearestProject.offsetLeft;
  const projectWidth = nearestProject.offsetWidth;
  let targetScroll = projectLeft - (containerWidth / 2) + (projectWidth / 2);
  
  // Clamp target scroll to valid bounds - allow full scroll width to reach last project
  const scrollWidth = carouselContainer.scrollWidth;
  targetScroll = Math.max(0, Math.min(targetScroll, scrollWidth));
  
  // Smooth scroll to center
  const startScroll = carouselContainer.scrollLeft;
  const distance = targetScroll - startScroll;
  const duration = 300;
  const startTime = performance.now();
  
  isCarouselAnimating = true;
  const originalScrollBehavior = carouselContainer.style.scrollBehavior;
  carouselContainer.style.scrollBehavior = 'auto';
  
  function animateSnap(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    
    const newScroll = startScroll + (distance * ease);
    // Clamp during animation - use scrollWidth to allow reaching the end
    const scrollWidth = carouselContainer.scrollWidth;
    const clampedScroll = Math.max(0, Math.min(newScroll, scrollWidth));
    carouselContainer.scrollLeft = clampedScroll;
    
    if (progress < 1) {
      requestAnimationFrame(animateSnap);
    } else {
      // Ensure final position is correct
      carouselContainer.scrollLeft = targetScroll;
      carouselContainer.style.scrollBehavior = originalScrollBehavior;
      isCarouselAnimating = false;
      updateArrowVisibility();
    }
  }
  
  requestAnimationFrame(animateSnap);
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
    updateArrowVisibility();
  }
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
      // Update arrow visibility after initial positioning
      updateArrowVisibility();
    }, 0);
  }, 100);
}

function initializeCarousel() {
  carouselContainer = document.getElementById('carousel-container');
  carouselArrowLeft = document.getElementById('carousel-arrow-left');
  carouselArrowRight = document.getElementById('carousel-arrow-right');
  
  if (!carouselContainer || !carouselArrowLeft || !carouselArrowRight) {
    return; // Carousel elements not found
  }
  
  // Set initial cursor style
  carouselContainer.style.cursor = 'grab';
  
  // Setup carousel
  setupCarousel();
  
  // Add click event listeners to arrows
  carouselArrowLeft.addEventListener('click', () => scrollCarousel('left'));
  carouselArrowRight.addEventListener('click', () => scrollCarousel('right'));
  
  // Add scroll event listener to update arrow visibility
  carouselContainer.addEventListener('scroll', updateArrowVisibility);
  
  // Add touch event listeners for swipe support
  carouselContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
  carouselContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
  carouselContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // Add mouse drag event listeners
  carouselContainer.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  carouselContainer.addEventListener('mouseleave', handleMouseLeave);
  
  // Initial arrow visibility check
  updateArrowVisibility();
  
  // Update arrow visibility on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateArrowVisibility, 250);
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
  .menu-links a.active {
    color: var(--color-black);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 0.5rem;
  }
`;
document.head.appendChild(style);
