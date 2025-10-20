# Custom Highlight.js Bundle

This directory contains a custom Highlight.js bundle for Antora with additional language support (particularly TypeScript).

## Overview

The default Antora UI bundle includes a pre-built `highlight.js` with a limited set of languages. Since we can't modify the Antora UI build process directly, we use Antora's **supplemental UI** feature to override the default `js/vendor/highlight.js` with our custom bundle.

## How It Works

1. The build script at `scripts/build-highlight.mjs` creates a custom highlight.js bundle
2. The bundle is placed in `docs/supplemental-ui/js/vendor/highlight.js`
3. When Antora builds the site, it overlays files from `supplemental-ui` onto the UI bundle
4. Our custom `highlight.js` replaces the default one in the generated site

## Languages Included

This bundle includes all languages from the default Antora UI plus TypeScript:

- bash
- console (shell)
- diff
- dockerfile
- groovy
- handlebars (hbs)
- java
- javascript (js)
- json
- markdown
- nix
- ruby
- shell
- xml
- yaml
- **typescript (ts)** ← Added

## Building the Bundle

The bundle is automatically built when you run:

```bash
npm run docs:build
```

To build just the highlight.js bundle:

```bash
npm run docs:build:highlight
```

## Adding More Languages

To add more languages, edit `scripts/build-highlight.mjs` and add entries to the imports and registration section:

```javascript
// Add to imports
import python from 'highlight.js/lib/languages/python';

// Add to registration
hljs.registerLanguage('python', python);
```

Available languages can be found in the [highlight.js repository](https://github.com/highlightjs/highlight.js/tree/main/src/languages).

## Theming

Syntax highlighting colors are controlled by a separate CSS file at `docs/supplemental-ui/css/highlight-theme.css`.

### Single Theme

```bash
# Update to a specific theme
npm run docs:update-theme github-dark
npm run docs:update-theme monokai
npm run docs:update-theme atom-one-dark
npm run docs:update-theme nord

# Then rebuild the docs
npm run docs:build
```

### Dual Theme (Light/Dark Mode Auto-Switch)

Automatically switch between light and dark themes based on user's system preference:

```bash
# Set light theme and dark theme
npm run docs:update-theme github github-dark
npm run docs:update-theme stackoverflow-light atom-one-dark

# Then rebuild the docs
npm run docs:build
```

Popular themes include: `github`, `github-dark`, `monokai`, `atom-one-dark`, `vs2015`, `nord`, `stackoverflow-light`

See all available themes at: https://github.com/highlightjs/highlight.js/tree/main/src/styles

## Usage in Documentation

In your AsciiDoc files, specify the language in code blocks:

```asciidoc
[source,typescript]
----
interface Person {
  name: string;
  age: number;
}
----
```

Or in Markdown:

````markdown
```typescript
interface Person {
  name: string;
  age: number;
}
```
````

## File Structure

```
docs/supplemental-ui/js/vendor/
├── README.md              # This file
├── highlight.js           # Generated bundle (gitignored)
└── highlight.temp.js      # Temporary build file (gitignored)

scripts/
├── build-highlight.mjs    # Build script
└── highlight-entry.js     # Temporary entry point (gitignored, created during build)
```

## Technical Details

- **Bundler**: esbuild
- **Build Process**:
  1. Creates entry point with all language imports
  2. Bundles as CommonJS module (minified)
  3. Wraps in IIFE with proper window.hljs export
  4. Adds auto-initialization code
- **Format**: IIFE (Immediately Invoked Function Expression) wrapping CommonJS
- **Global**: `window.hljs`
- **Auto-initialization**: Yes, on DOMContentLoaded
- **Minified**: Yes

The bundle is configured to be compatible with how Antora's default UI uses highlight.js, including automatic initialization on page load.

## Dependencies

The build requires these devDependencies (already configured in root `package.json`):

- `highlight.js` - The syntax highlighting library
- `esbuild` - Fast JavaScript bundler
