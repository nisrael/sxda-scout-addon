# Custom CSS for Antora Documentation

This directory contains custom CSS files that extend the default Antora UI.

## Files

### vars.scss (Source)
SCSS source file containing CSS custom properties (variables) for both light and dark themes.
This file is **compiled to CSS** during the build process.

- Comprehensive color variables for light and dark modes
- Uses `html[data-theme='dark']` selector for dark theme overrides
- Based on Bonita Documentation Theme approach
- **Do not edit vars.css directly** - edit this SCSS file instead

### vars.css (Generated)
Compiled CSS from `vars.scss`. This file is generated automatically during build and should **not** be edited manually or committed to git.

### custom.css
General custom styling for the documentation site, including:
- Navbar color customization
- Custom branding elements
- Theme switcher button styling

### highlight-theme.css
Syntax highlighting theme for code blocks powered by Highlight.js.

## Theme Switcher

The documentation includes an interactive theme switcher button in the navbar that allows users to toggle between three states:

1. **System** (Auto) - Follows the user's operating system preference
2. **Light** - Forces light theme regardless of system preference
3. **Dark** - Forces dark theme regardless of system preference

The user's preference is saved in localStorage and persists across sessions.

### How It Works

- Click the theme button in the navbar to cycle through: System → Dark → Light → System
- The button shows an icon and label indicating the current state:
  - 🌓 Auto (system preference)
  - ☀️ Light (forced light)
  - 🌙 Dark (forced dark)
- When set to "System", the theme automatically follows your OS dark/light mode setting
- Manual selections (Light/Dark) override the system preference

## Changing the Highlight.js Theme

For the theme switcher to work properly, you should configure **dual themes** (one light, one dark).

### Dual Theme (Recommended)

To configure both light and dark themes for the theme switcher:

```bash
npm run docs:update-theme [light-theme] [dark-theme]
```

Examples:
```bash
npm run docs:update-theme github github-dark
npm run docs:update-theme stackoverflow-light atom-one-dark
npm run docs:update-theme github monokai
```

This configures:
- The light theme for light mode (system preference or manual selection)
- The dark theme for dark mode (system preference or manual selection)
- Class-based overrides that work with the theme switcher button

### Single Theme (Not Recommended)

If you want a single theme for all users (theme switcher will still work but won't change colors):

```bash
npm run docs:update-theme [theme-name]

# Examples:
npm run docs:update-theme github
npm run docs:update-theme github-dark
npm run docs:update-theme monokai
```

Note: With a single theme, the switcher button will cycle but the colors won't change. Use dual themes for full functionality.

### Rebuilding

After updating the theme or vars.scss, rebuild your documentation:
```bash
npm run docs:build
```

This will:
1. Compile `vars.scss` to `vars.css`
2. Build the custom highlight.js bundle
3. Generate the Antora site

## Available Themes

Browse all available themes at:
- Preview: https://highlightjs.org/demo
- Source: https://github.com/highlightjs/highlight.js/tree/main/src/styles

Popular theme combinations:
- `github` + `github-dark` - Clean, GitHub-style
- `stackoverflow-light` + `atom-one-dark` - High contrast
- `github` + `monokai` - Light minimal + dark colorful
- `vs2015` + `vs2015` - Consistent dark theme

## Technical Details

The theme switcher works by:

1. **JavaScript** (`js/theme-switcher.js`):
   - Manages theme state in localStorage
   - Sets `data-theme="light"` or `data-theme="dark"` attribute on `<html>` element
   - Adds `theme-light` or `theme-dark` class to `<html>` element
   - Provides UI button in navbar
   - Listens for system theme changes

2. **CSS** (`css/highlight-theme.css`):
   - Contains both light and dark **code highlighting** themes
   - Uses `@media (prefers-color-scheme)` for system preference
   - Uses `html.theme-light` and `html.theme-dark` classes for manual overrides
   - Class-based selectors have higher specificity than media queries

3. **CSS** (`css/custom.css`):
   - Styles the theme switcher button
   - Adds smooth transition effects
   - **Complete dark theme** using `html[data-theme="dark"]` selector
   - CSS custom properties (variables) for easy color customization
   - Covers all page elements: navigation, content, tables, code, etc.

## Manual Theme Customization

### Code Highlighting Colors

You can manually edit `highlight-theme.css` to customize syntax highlighting colors or copy CSS from other sources. The file uses standard Highlight.js CSS class names (`.hljs`, `.hljs-keyword`, `.hljs-string`, etc.).

If you customize manually, make sure to include both:
- `@media (prefers-color-scheme: ...)` rules for system preference
- `html.theme-light` and `html.theme-dark` rules for manual selection

### Site-Wide Theme Colors (SCSS Variables)

To customize theme colors for both light and dark modes, edit `vars.scss`:

**Light theme** (in `:root` block):
```scss
:root {
  --color-white: #fff;
  --color-link: #104d92;
  --navbar-background: var(--color-blue-bonita);
  /* ... and many more! */
}
```

**Dark theme** (in `html[data-theme='dark']` block):
```scss
html[data-theme='dark'] {
  --color-white: #151a25;
  --color-link: #00d9ff;
  --navbar-background: var(--color-blue-bonita);
  /* ... and many more! */
}
```

After editing `vars.scss`, run:
```bash
npm run docs:build:css  # Compile SCSS to CSS
# OR
npm run docs:build      # Full build (includes CSS compilation)
```

The SCSS variables control **everything**:
- All background colors
- All text colors
- Border colors
- Link colors
- Navigation colors
- Code block colors
- Table colors
- Admonition colors
- Icon filters
- And much more!

This approach is much cleaner than using custom CSS overrides!
