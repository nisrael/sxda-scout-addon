/* Theme Switcher for Scout Addon Documentation */
/* Based on Bonita Documentation Theme implementation */

/**
 * Updates the HTML data-theme attribute based on current theme
 */
function updateHtmlThemeAttribute() {
  const rootHtmlElement = document.querySelector('html');
  rootHtmlElement.setAttribute('data-theme', isDarkTheme() ? 'dark' : 'light');
  rootHtmlElement.setAttribute('data-theme-system', isUsingSystemPreferences());
}

/**
 * Switches between light and dark highlight.js themes
 * by adding/removing a CSS class that overrides the media query
 */
function enableHighlightJsTheme() {
  const rootHtmlElement = document.querySelector('html');

  if (isDarkTheme()) {
    rootHtmlElement.classList.add('theme-dark');
    rootHtmlElement.classList.remove('theme-light');
  } else {
    rootHtmlElement.classList.add('theme-light');
    rootHtmlElement.classList.remove('theme-dark');
  }
}

/**
 * Updates both the HTML theme attribute and highlight.js theme
 */
function updateTheme() {
  updateHtmlThemeAttribute();
  enableHighlightJsTheme();
}

// Ensure that the right theme is used when the page loads
// Must be executed early to avoid flash of wrong theme
updateTheme();

/**
 * Check if user has set a theme preference in localStorage or use browser preferences
 * @returns {boolean} true if dark theme should be used
 */
function isDarkTheme() {
  const localThemeSetting = localStorage.getItem('theme');
  return !localThemeSetting
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : localThemeSetting === 'dark';
}

/**
 * Check if using system preferences (no localStorage setting)
 * @returns {boolean} true if using system preferences
 */
function isUsingSystemPreferences() {
  return !localStorage.getItem('theme');
}

// Theme cycle order: system → dark → light → system
const themeOrder = ['system', 'dark', 'light'];

// Icon SVGs for each theme state
const themeIcons = {
  system: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/><path d="M8 13V3a5 5 0 0 0 0 10z"/></svg>',
  light: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>',
  dark: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>'
};

const themeLabels = {
  system: 'Auto',
  light: 'Light',
  dark: 'Dark'
};

/**
 * Initialize theme switcher when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Create theme switcher button
  const navbar = document.querySelector('.navbar');
  if (!navbar) {
    console.warn('Could not find navbar element, theme switcher not added');
    return;
  }

  const navbarEnd = navbar.querySelector('.navbar-end');
  if (!navbarEnd) {
    console.warn('Could not find navbar-end element, theme switcher not added');
    return;
  }

  // Create theme switcher button
  const themeSwitcher = document.createElement('button');
  themeSwitcher.id = 'theme-switcher';
  themeSwitcher.className = 'navbar-item theme-switcher';
  themeSwitcher.setAttribute('aria-label', 'Switch theme');
  themeSwitcher.setAttribute('title', 'Switch theme (system/light/dark)');

  function getCurrentTheme() {
    if (isUsingSystemPreferences()) {
      return 'system';
    } else {
      return isDarkTheme() ? 'dark' : 'light';
    }
  }

  function updateSwitcherIcon() {
    const currentTheme = getCurrentTheme();
    themeSwitcher.innerHTML = `
      <span class="theme-icon">${themeIcons[currentTheme]}</span>
      <span class="theme-label">${themeLabels[currentTheme]}</span>
    `;
  }

  // Set initial icon
  updateSwitcherIcon();

  // Insert before the last item (usually the GitHub/edit link)
  navbarEnd.insertBefore(themeSwitcher, navbarEnd.lastElementChild);

  // Handle theme switching
  themeSwitcher.addEventListener('click', (event) => {
    event.preventDefault();

    const currentTheme = getCurrentTheme();
    const currentIndex = themeOrder.indexOf(currentTheme);
    const newTheme = themeOrder[(currentIndex + 1) % themeOrder.length];

    // Three states managed with localStorage:
    // - No value = system preferences
    // - 'light' = force light theme
    // - 'dark' = force dark theme
    if (newTheme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', newTheme);
    }

    // Add transition class for smooth theme change
    const bodyClassList = document.querySelector('body').classList;
    bodyClassList.add('theme-transition');

    updateTheme();
    updateSwitcherIcon();

    // Remove transition class after animation
    setTimeout(() => {
      bodyClassList.remove('theme-transition');
    }, 300);
  });
});

// Listen for system theme changes when in system mode
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (isUsingSystemPreferences()) {
      updateTheme();
    }
  });
}
