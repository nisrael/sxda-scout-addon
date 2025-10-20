#!/usr/bin/env node

/**
 * Build script for custom Highlight.js bundle with additional languages.
 *
 * This creates a custom highlight.js bundle that includes TypeScript and other
 * languages not included in the default Antora UI bundle.
 *
 * The bundle is placed in docs/supplemental-ui/js/vendor/highlight.js where
 * Antora's supplemental UI feature will use it to override the default bundle.
 *
 * Usage:
 *   npm run docs:build:highlight
 */

import { build } from 'esbuild';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Ensure output directory exists
const outputDir = join(rootDir, 'docs', 'supplemental-ui', 'js', 'vendor');
fs.mkdirSync(outputDir, { recursive: true });

// Create entry point file with all languages
const entryContent = `
import hljs from 'highlight.js/lib/core';

// Languages from default Antora UI bundle
import bash from 'highlight.js/lib/languages/bash';
import shell from 'highlight.js/lib/languages/shell';
import diff from 'highlight.js/lib/languages/diff';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import groovy from 'highlight.js/lib/languages/groovy';
import handlebars from 'highlight.js/lib/languages/handlebars';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import nix from 'highlight.js/lib/languages/nix';
import ruby from 'highlight.js/lib/languages/ruby';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

// Additional languages
import typescript from 'highlight.js/lib/languages/typescript';

// Register all languages
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('console', shell);
hljs.registerLanguage('diff', diff);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('groovy', groovy);
hljs.registerLanguage('hbs', handlebars);
hljs.registerLanguage('java', java);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('nix', nix);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);

// Explicitly set window.hljs for browser compatibility
if (typeof window !== 'undefined') {
  window.hljs = hljs;
}

// Export as default for esbuild
export default hljs;
`;

const entryFile = join(rootDir, 'scripts', 'highlight-entry.js');
fs.writeFileSync(entryFile, entryContent);

// Build with esbuild
console.log('Building custom highlight.js bundle...');

try {
  // First build as a CJS module
  const tempOutput = join(outputDir, 'highlight.temp.js');

  await build({
    entryPoints: [entryFile],
    bundle: true,
    minify: true,
    format: 'cjs',
    platform: 'browser',
    outfile: tempOutput
  });

  // Read the generated code
  let bundleCode = fs.readFileSync(tempOutput, 'utf8');

  // Wrap it in IIFE that properly exports to window
  const wrappedCode = `/* Custom Highlight.js bundle for Antora with TypeScript support */
;(function() {
  var exports = {};
  var module = { exports: exports };

  ${bundleCode}

  // Export to window
  var hljs = module.exports.default || module.exports;

  if (typeof window !== 'undefined') {
    window.hljs = hljs;
  }

  // Auto-initialize on page load (Antora compatibility)
  if (typeof document !== 'undefined') {
    var initHighlight = function() {
      document.querySelectorAll('pre code').forEach(function(block) {
        if (hljs && hljs.highlightElement) {
          hljs.highlightElement(block);
        }
      });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initHighlight);
    } else {
      initHighlight();
    }
  }
})();
`;

  // Write the final bundle
  const finalOutput = join(outputDir, 'highlight.js');
  fs.writeFileSync(finalOutput, wrappedCode);

  // Clean up temp file
  fs.unlinkSync(tempOutput);

  console.log('✓ Custom highlight.js bundle created successfully!');
  console.log(`✓ Location: ${join(outputDir, 'highlight.js')}`);
  console.log('✓ Languages: bash, console, diff, dockerfile, groovy, hbs, java, javascript, json, markdown, nix, ruby, shell, xml, yaml, typescript');

  // Clean up entry file
  fs.unlinkSync(entryFile);

  // Get bundle size
  const stats = fs.statSync(join(outputDir, 'highlight.js'));
  console.log(`✓ Bundle size: ${(stats.size / 1024).toFixed(2)} KB`);

} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
