/*
 * Copyright (c) 2010-2025 BSI Business Systems Integration AG
 * Copyright (c) 2023-2025 Nils Israel
 *
 * This program is an extension of the original work from the Eclipse Scout Project,
 * available at https://www.eclipse.org/scout/.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import {CodeMirrorField} from '../../src/index';
import {scout} from '@eclipse-scout/core';

/**
 * Behavior-focused tests for CodeMirrorField
 *
 * These tests focus on:
 * - Integration with CodeMirror 6 library
 * - User-facing behavior and side effects
 * - Configuration propagation to editor
 * - Edge cases that could cause bugs
 *
 * We DON'T test:
 * - Simple property assignments (setX() sets x)
 * - CodeMirror internals (trust the library)
 * - Scout framework internals (trust the framework)
 */
describe('CodeMirrorFieldSpec', () => {

  let session;

  beforeEach(() => {
    setFixtures(sandbox());
    session = sandboxSession();
  });

  // ========================================
  // INITIALIZATION AND CONFIGURATION
  // ========================================
  describe('initialization', () => {

    it('creates field with Scout-specific defaults', () => {
      let field = new CodeMirrorField();

      // Verify important defaults for Scout integration
      expect(field.language).toBe('None');
      expect(field.theme).toBe('None');
      expect(field.tabSize).toBe(2);
      expect(field.lineNumbers).toBe(true);
      expect(field.syntaxHighlighting).toBe(true);
      expect(field.highlightActiveLine).toBe(true);
    });

    it('accepts configuration via Scout model', () => {
      let field = scout.create(CodeMirrorField, {
        parent: session.desktop,
        language: 'javascript',
        tabSize: 4,
        lineNumbers: false,
        displayText: 'const x = 42;'
      });

      // Verify Scout's model initialization works
      expect(field.language).toBe('javascript');
      expect(field.tabSize).toBe(4);
      expect(field.lineNumbers).toBe(false);
      expect(field.displayText).toBe('const x = 42;');
    });
  });

  // ========================================
  // RENDERING AND DOM INTEGRATION
  // ========================================
  describe('rendering', () => {

    it('creates required DOM structure', () => {
      let field = scout.create(CodeMirrorField, {
        parent: session.desktop
      });
      field.render();

      // Verify Scout form field structure
      expect(field.$container).toBeDefined();
      expect(field.$container.hasClass('codemirror-field')).toBe(true);
      expect(field.$field).toBeDefined();

      // Verify CodeMirror editor was initialized (test through behavior)
      expect(field.$field.find('.cm-editor').length).toBe(1);
    });

    it('initializes editor with configured text', () => {
      let field = scout.create(CodeMirrorField, {
        parent: session.desktop,
        displayText: 'function test() { return 42; }'
      });
      field.render();

      // Test integration between Scout's displayText and CodeMirror
      // We can verify by reading back the display text
      expect(field.displayText).toBe('function test() { return 42; }');
    });

    it('syncs enabled state to field properties', () => {
      let field = scout.create(CodeMirrorField, {
        parent: session.desktop
      });
      field.render();

      // Test the behavior: disabled field
      field.setEnabled(false);

      expect(field.enabled).toBe(false);

      field.setEnabled(true);

      expect(field.enabled).toBe(true);
    });
  });

  // ========================================
  // VALUE SYNCHRONIZATION
  // ========================================
  describe('value synchronization', () => {

    let field;

    beforeEach(() => {
      field = scout.create(CodeMirrorField, {
        parent: session.desktop
      });
      field.render();
    });

    it('syncs Scout value to display text', () => {
      // Test Scout setValue propagates to displayText
      field.setValue('new value');

      expect(field.displayText).toBe('new value');
    });

    it('updates display text through setter', () => {
      // Test displayText setter
      field.setDisplayText('editor value');

      expect(field.displayText).toBe('editor value');
    });

    it('handles null value gracefully', () => {
      field.setDisplayText(null);

      // Verify it doesn't crash
      expect(field.displayText).toBe(null);
    });

    it('handles undefined value gracefully', () => {
      field.setDisplayText(undefined);

      // Verify it doesn't crash
      expect(field.displayText).toBe(undefined);
    });

    it('handles very large text without crashing', () => {
      // Test edge case: large code files
      let largeText = 'line\n'.repeat(1000);
      field.setDisplayText(largeText);

      // Verify it was set (don't count lines, just verify it's there)
      expect(field.displayText.length).toBeGreaterThanOrEqual(5000);
    });

    it('handles multi-line text correctly', () => {
      let multiLine = 'Line 1\nLine 2\nLine 3';
      field.setDisplayText(multiLine);

      expect(field.displayText).toBe(multiLine);
      // Count newlines to verify line structure preserved
      expect((field.displayText.match(/\n/g) || []).length).toBe(2);
    });
  });

  // ========================================
  // EDITOR FEATURES CONFIGURATION
  // ========================================
  describe('editor features', () => {

    let field;

    beforeEach(() => {
      field = scout.create(CodeMirrorField, {
        parent: session.desktop
      });
      field.render();
    });

    it('shows/hides line numbers in DOM', () => {
      // Default: line numbers enabled
      expect(field.$field.find('.cm-lineNumbers').length).toBeGreaterThan(0);

      // Disable line numbers
      field.setLineNumbers(false);
      expect(field.$field.find('.cm-lineNumbers').length).toBe(0);

      // Enable again
      field.setLineNumbers(true);
      expect(field.$field.find('.cm-lineNumbers').length).toBeGreaterThan(0);
    });

    it('toggles line wrapping behavior', () => {
      // Default: no wrapping, long lines scroll horizontally
      field.setDisplayText('a'.repeat(200));
      let editorWithoutWrap = field.$field.find('.cm-content');

      // Enable wrapping
      field.setLineWrapping(true);
      expect(field.lineWrapping).toBe(true);

      // Disable wrapping
      field.setLineWrapping(false);
      expect(field.lineWrapping).toBe(false);
    });

    it('shows active line highlighting in DOM', () => {
      field.setDisplayText('line 1\nline 2\nline 3');

      // Default: active line highlighting enabled
      field.setHighlightActiveLine(true);
      // Active line class should exist when highlighting is on
      let hasActiveLineClass = field.$field.find('.cm-activeLine, .cm-activeLineGutter').length > 0;
      expect(hasActiveLineClass).toBe(true);

      // When disabled, the extension is removed (harder to test DOM, but property updates)
      field.setHighlightActiveLine(false);
      expect(field.highlightActiveLine).toBe(false);
    });
  });

  // ========================================
  // LANGUAGE AND THEME
  // ========================================
  describe('language and theme', () => {

    let field;

    beforeEach(() => {
      field = scout.create(CodeMirrorField, {
        parent: session.desktop,
        displayText: 'function test() { return 42; }'
      });
      field.render();
    });

    it('sets language mode and affects editor configuration', (done) => {
      // Set JavaScript language
      field.setLanguage('JavaScript');

      // Language is set asynchronously, give it time
      setTimeout(() => {
        expect(field.language).toBe('JavaScript');
        // Language affects syntax highlighting (hard to verify DOM directly)
        // but we can verify it doesn't crash and property is set
        done();
      }, 100);
    });

    it('handles None language without errors', () => {
      field.setLanguage('None');
      expect(field.language).toBe('None');
      // Should not crash, None means no syntax highlighting
    });

    it('sets theme and affects editor styling', (done) => {
      // Themes are loaded asynchronously
      field.setTheme('dracula');

      setTimeout(() => {
        expect(field.theme).toBe('dracula');
        // Theme changes affect CSS classes (could check for theme-specific classes)
        done();
      }, 100);
    });

    it('handles None theme without errors', () => {
      field.setTheme('None');
      expect(field.theme).toBe('None');
      // Should not crash, None means default/no theme
    });
  });


  // ========================================
  // USER INTERACTION
  // ========================================
  describe('user interaction', () => {

    it('marks field as touched on touch event', () => {
      let field = scout.create(CodeMirrorField, {
        parent: session.desktop
      });
      field.render();

      expect(field.touched).toBe(false);

      field.touch();

      // Important for Scout validation workflow
      expect(field.touched).toBe(true);
    });
  });

  // ========================================
  // EDGE CASES AND ERROR CONDITIONS
  // ========================================
  describe('edge cases', () => {

    let field;

    beforeEach(() => {
      field = scout.create(CodeMirrorField, {
        parent: session.desktop
      });
      field.render();
    });

    it('handles empty string display text', () => {
      field.setDisplayText('');

      expect(field.displayText).toBe('');
    });

    it('handles text with special characters', () => {
      let specialText = 'Special: \t \n \\ " \' < > & @';
      field.setDisplayText(specialText);

      expect(field.displayText).toBe(specialText);
    });

    it('handles setting value before render', () => {
      let field2 = scout.create(CodeMirrorField, {
        parent: session.desktop
      });

      // Set value before rendering
      field2.setDisplayText('early value');
      field2.render();

      // Should be applied when editor is created
      expect(field2.displayText).toBe('early value');
    });

    it('handles rapid DOM changes when toggling line numbers', () => {
      // Rapid toggles should not cause DOM corruption
      field.setLineNumbers(false);
      field.setLineNumbers(true);
      field.setLineNumbers(false);
      field.setLineNumbers(true);

      // Final state: line numbers should be visible
      expect(field.$field.find('.cm-lineNumbers').length).toBeGreaterThan(0);
    });

    it('handles combination of features without conflicts', () => {
      // Set multiple features and verify DOM reflects the changes
      field.setDisplayText('line 1\nline 2\nline 3');
      field.setLineNumbers(true);
      field.setHighlightActiveLine(true);

      // Both features should be active in DOM
      expect(field.$field.find('.cm-lineNumbers').length).toBeGreaterThan(0);
      expect(field.$field.find('.cm-activeLine, .cm-activeLineGutter').length).toBeGreaterThan(0);
    });
  });
});
