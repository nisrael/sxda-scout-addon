#!/usr/bin/env node

/**
 * Script to update the Highlight.js theme.
 *
 * Downloads a theme from the Highlight.js repository and saves it to
 * docs/supplemental-ui/css/highlight-theme.css
 *
 * Supports dual themes (light/dark mode):
 *   node scripts/update-highlight-theme.mjs [light-theme] [dark-theme]
 *
 * Or single theme:
 *   node scripts/update-highlight-theme.mjs [theme-name]
 *
 * Examples:
 *   node scripts/update-highlight-theme.mjs github github-dark
 *   node scripts/update-highlight-theme.mjs stackoverflow-light atom-one-dark
 *   node scripts/update-highlight-theme.mjs github
 *   node scripts/update-highlight-theme.mjs monokai
 *
 * Available themes: https://github.com/highlightjs/highlight.js/tree/main/src/styles
 */

import https from 'https';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const lightTheme = process.argv[2] || 'github';
const darkTheme = process.argv[3]; // Optional dark theme
const baseUrl = 'https://raw.githubusercontent.com/highlightjs/highlight.js/main/src/styles';
const outputPath = join(rootDir, 'docs', 'supplemental-ui', 'css', 'highlight-theme.css');

// Function to download a theme
function downloadTheme(themeName) {
  return new Promise((resolve, reject) => {
    const themeUrl = `${baseUrl}/${themeName}.css`;
    console.log(`Downloading theme: ${themeName}...`);

    https.get(themeUrl, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download theme '${themeName}': HTTP ${res.statusCode}`));
        return;
      }

      let cssContent = '';
      res.on('data', (chunk) => { cssContent += chunk; });
      res.on('end', () => { resolve(cssContent); });
    }).on('error', reject);
  });
}

// Main execution
async function main() {
  try {
    if (darkTheme) {
      // Dual theme mode
      console.log(`Setting up dual theme mode:`);
      console.log(`  Light mode: ${lightTheme}`);
      console.log(`  Dark mode: ${darkTheme}`);

      const [lightCss, darkCss] = await Promise.all([
        downloadTheme(lightTheme),
        downloadTheme(darkTheme)
      ]);

      const header = `/**
 * Highlight.js Themes for Code Blocks (Dual Mode)
 *
 * This file contains both light and dark syntax highlighting themes.
 * The theme switches automatically based on user's color scheme preference,
 * OR can be manually controlled via the theme switcher button.
 *
 * To change themes, run: npm run docs:update-theme [light-theme] [dark-theme]
 *
 * Popular theme combinations:
 * - github github-dark
 * - stackoverflow-light atom-one-dark
 * - github monokai
 *
 * See all themes at: https://github.com/highlightjs/highlight.js/tree/main/src/styles
 *
 * Current themes:
 *   Light mode: ${lightTheme}
 *   Dark mode: ${darkTheme}
 */

/* Light mode theme (${lightTheme}) */
/* Applied when: system prefers light mode, OR no preference, OR user forces light */
@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
${lightCss}
}

/* Force light theme when user manually selects it */
html.theme-light {
${lightCss}
}

/* Dark mode theme (${darkTheme}) */
/* Applied when: system prefers dark mode, OR user forces dark */
@media (prefers-color-scheme: dark) {
${darkCss}
}

/* Force dark theme when user manually selects it */
html.theme-dark {
${darkCss}
}
`;

      fs.mkdirSync(dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, header, 'utf8');

      console.log(`✓ Dual themes configured successfully!`);
      console.log(`✓ Light theme: ${lightTheme}`);
      console.log(`✓ Dark theme: ${darkTheme}`);
      console.log(`✓ Saved to: ${outputPath}`);
      console.log(`✓ Size: ${(header.length / 1024).toFixed(2)} KB`);

    } else {
      // Single theme mode
      console.log(`Setting up single theme mode: ${lightTheme}`);

      const cssContent = await downloadTheme(lightTheme);

      const header = `/**
 * Highlight.js Theme for Code Blocks
 *
 * This file contains the syntax highlighting theme.
 * To change the theme, run: npm run docs:update-theme [theme-name]
 * For dual light/dark themes, run: npm run docs:update-theme [light-theme] [dark-theme]
 *
 * Popular themes:
 * - github (light, GitHub-style)
 * - github-dark (dark, GitHub-style)
 * - monokai (dark, colorful)
 * - atom-one-dark (dark, Atom editor style)
 * - vs2015 (dark, Visual Studio style)
 * - nord (dark, Nordic color palette)
 * - stackoverflow-light (light, Stack Overflow style)
 *
 * See all themes at: https://github.com/highlightjs/highlight.js/tree/main/src/styles
 *
 * Current theme: ${lightTheme}
 */

${cssContent}
`;

      fs.mkdirSync(dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, header, 'utf8');

      console.log(`✓ Theme '${lightTheme}' downloaded successfully!`);
      console.log(`✓ Saved to: ${outputPath}`);
      console.log(`✓ Size: ${(header.length / 1024).toFixed(2)} KB`);
    }

    console.log(`\nRebuild your docs to see the new theme:`);
    console.log(`  npm run docs:build`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(`Make sure the theme name is valid.`);
    console.error(`See available themes at: https://github.com/highlightjs/highlight.js/tree/main/src/styles`);
    process.exit(1);
  }
}

main();
