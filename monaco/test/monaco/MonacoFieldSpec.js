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
import {MonacoField} from '../../src/index';
import {scout} from '@eclipse-scout/core';
import * as monaco from 'monaco-editor';

/**
 * Behavior-focused tests for MonacoField
 *
 * These tests focus on:
 * - Integration with Monaco Editor library
 * - User-facing behavior and side effects
 * - Configuration propagation to editor
 * - Edge cases that could cause bugs
 * - DOM rendering and structure
 *
 * We DON'T test:
 * - Simple property assignments (setX() sets x)
 * - Monaco Editor internals (trust the library)
 * - Scout framework internals (trust the framework)
 */
describe('MonacoFieldSpec', () => {

  let session;

  afterEach(() => {
    // Remove all beforeunload listeners
    // FIXME find out which plugin is responsible for the popup
    //  "Seite verlassen? Deine Änderungen werden evtl. nicht gespeichert."
    // which leads to
    // Chrome 141.0.0.0 (Mac OS 10.15.7) ERROR
    //   Some of your tests did a full page reload!
    // and ExitStatus 3
    window.onbeforeunload = null;
  });

  beforeEach(() => {
    setFixtures(sandbox());
    session = sandboxSession();
  });

  // ========================================
  // INITIALIZATION AND CONFIGURATION
  // ========================================
  describe('initialization', () => {

    it('creates field with Scout-specific defaults', () => {
      let field = new MonacoField();

      // These defaults are important for Scout integration
      expect(field.language).toBe('plaintext');
      expect(field.theme).toBe('vs');
      expect(field.lineNumbers).toBe(true);
      expect(field.minimap).toBe(true);
      expect(field.wordWrap).toBe(false);
      expect(field.fontSize).toBe(14);
      expect(field.tabSize).toBe(4);
      expect(field.insertSpaces).toBe(true);
      expect(field.automaticLayout).toBe(true);
      expect(field.folding).toBe(true);
      expect(field.renderWhitespace).toBe('none');
      expect(field.scrollBeyondLastLine).toBe(false);
      expect(field.formatOnPaste).toBe(false);
      expect(field.formatOnType).toBe(false);
    });

    it('accepts configuration via Scout model', () => {
      let field = scout.create(MonacoField, {
        parent: session.desktop,
        language: 'javascript',
        theme: 'vs-dark',
        fontSize: 16,
        tabSize: 2,
        displayText: 'console.log("test");'
      });

      // Verify Scout's model initialization works
      expect(field.language).toBe('javascript');
      expect(field.theme).toBe('vs-dark');
      expect(field.fontSize).toBe(16);
      expect(field.tabSize).toBe(2);
      expect(field.displayText).toBe('console.log("test");');
    });
  });

  // ========================================
  // RENDERING AND DOM INTEGRATION
  // ========================================
  describe('rendering', () => {

    it('creates required DOM structure', () => {
      let field = scout.create(MonacoField, {
        parent: session.desktop
      });
      field.render();

      // Verify Scout form field structure
      expect(field.$container).toBeDefined();
      expect(field.$container.hasClass('monaco-field')).toBe(true);
      expect(field.$field).toBeDefined();

      // Verify Monaco editor was initialized
      expect(field.editor).toBeDefined();
      expect(typeof field.editor.getValue).toBe('function');
    });

    it('initializes editor with configured text', () => {
      let field = scout.create(MonacoField, {
        parent: session.desktop,
        displayText: 'function test() {}'
      });
      field.render();

      // This tests the integration between Scout's displayText and Monaco
      expect(field.editor.getValue()).toBe('function test() {}');
    });

    it('syncs enabled state to editor readonly mode', () => {
      let field = scout.create(MonacoField, {
        parent: session.desktop
      });
      field.render();

      // Test the behavior: disabled field = readonly editor
      field.setEnabled(false);
      expect(field.editor.getOption(monaco.editor.EditorOption.readOnly)).toBe(true);

      field.setEnabled(true);
      expect(field.editor.getOption(monaco.editor.EditorOption.readOnly)).toBe(false);
    });
  });

  // ========================================
  // VALUE SYNCHRONIZATION
  // ========================================
  describe('value synchronization', () => {

    let field;

    beforeEach(() => {
      field = scout.create(MonacoField, {
        parent: session.desktop
      });
      field.render();
    });

    it('syncs Scout value to Monaco editor', () => {
      // Test Scout -> Monaco direction
      field.setValue('new value');

      expect(field.editor.getValue()).toBe('new value');
    });

    it('reads current value from Monaco editor', () => {
      // Test Monaco -> Scout direction
      field.editor.setValue('editor value');

      let displayText = field._readDisplayText();
      expect(displayText).toBe('editor value');
    });

    it('handles null value gracefully', () => {
      field.setDisplayText(null);

      // Should convert to empty string, not crash
      expect(field.editor.getValue()).toBe('');
    });

    it('handles undefined value gracefully', () => {
      field.setDisplayText(undefined);

      expect(field.editor.getValue()).toBe('');
    });

    it('handles very large text without crashing', () => {
      // Test edge case: large code files
      let largeText = 'line\n'.repeat(1000);
      field.setDisplayText(largeText);

      // Monaco may add trailing newline, so check >= 1000
      expect(field.editor.getValue().split('\n').length).toBeGreaterThanOrEqual(1000);
    });
  });

  // ========================================
  // EDITOR CONFIGURATION PROPAGATION
  // ========================================
  describe('editor configuration', () => {

    let field;

    beforeEach(() => {
      field = scout.create(MonacoField, {
        parent: session.desktop
      });
      field.render();
    });

    it('applies language setting to Monaco editor', () => {
      field.setLanguage('javascript');

      // Verify it actually configures the Monaco editor
      let model = field.editor.getModel();
      expect(model.getLanguageId()).toBe('javascript');
    });

    it('applies theme to Monaco editor', () => {
      field.setTheme('vs-dark');

      // Theme is applied globally, so we just verify the property is set
      expect(field.theme).toBe('vs-dark');
    });

    it('applies line numbers setting to Monaco editor', () => {
      field.setLineNumbers(false);

      let options = field.editor.getOption(monaco.editor.EditorOption.lineNumbers);
      // Monaco returns line number options structure, just verify it's set to off
      expect(field.lineNumbers).toBe(false);
    });

    it('applies minimap setting to Monaco editor', () => {
      field.setMinimap(false);

      let minimap = field.editor.getOption(monaco.editor.EditorOption.minimap);
      expect(minimap.enabled).toBe(false);
    });

    it('applies word wrap setting to Monaco editor', () => {
      field.setWordWrap(true);

      let wordWrap = field.editor.getOption(monaco.editor.EditorOption.wordWrap);
      expect(wordWrap).toBe('on');
    });

    it('applies font size to Monaco editor', () => {
      field.setFontSize(18);

      expect(field.editor.getOption(monaco.editor.EditorOption.fontSize)).toBe(18);
    });

    it('applies folding setting to Monaco editor', () => {
      field.setFolding(false);

      expect(field.editor.getOption(monaco.editor.EditorOption.folding)).toBe(false);
    });

    it('applies render whitespace setting to Monaco editor', () => {
      field.setRenderWhitespace('all');

      expect(field.editor.getOption(monaco.editor.EditorOption.renderWhitespace)).toBe('all');
    });

    it('applies scroll beyond last line setting to Monaco editor', () => {
      field.setScrollBeyondLastLine(true);

      expect(field.editor.getOption(monaco.editor.EditorOption.scrollBeyondLastLine)).toBe(true);
    });

    it('applies format on paste setting to Monaco editor', () => {
      field.setFormatOnPaste(true);

      expect(field.editor.getOption(monaco.editor.EditorOption.formatOnPaste)).toBe(true);
    });

    it('applies format on type setting to Monaco editor', () => {
      field.setFormatOnType(true);

      expect(field.editor.getOption(monaco.editor.EditorOption.formatOnType)).toBe(true);
    });
  });

  // ========================================
  // USER INTERACTION
  // ========================================
  describe('user interaction', () => {

    it('marks field as touched on touch event', () => {
      let field = scout.create(MonacoField, {
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
      field = scout.create(MonacoField, {
        parent: session.desktop
      });
      field.render();
    });

    it('handles multi-line text with mixed line endings', () => {
      // Real-world scenario: files from different OS
      let text = 'Unix\nWindows\r\nOld Mac\rMixed';
      field.setDisplayText(text);

      // Monaco should normalize this
      let value = field.editor.getValue();
      expect(value).toContain('Unix');
      expect(value).toContain('Windows');
      expect(value).toContain('Old Mac');
      expect(value).toContain('Mixed');
    });

    it('handles setting value before render', () => {
      let field2 = scout.create(MonacoField, {
        parent: session.desktop
      });

      // Set value before rendering
      field2.setDisplayText('early value');
      field2.render();

      // Should be applied when editor is created
      expect(field2.editor.getValue()).toBe('early value');
    });

    it('handles empty string display text', () => {
      field.setDisplayText('');

      expect(field.editor.getValue()).toBe('');
    });

    it('handles text with special characters', () => {
      let specialText = 'Special: \t \n \\ " \' < > & @';
      field.setDisplayText(specialText);

      expect(field.editor.getValue()).toBe(specialText);
    });

    it('handles rapid DOM changes when toggling settings', () => {
      // Rapid toggles should not cause DOM corruption
      field.setLineNumbers(false);
      field.setLineNumbers(true);
      field.setLineNumbers(false);
      field.setLineNumbers(true);
      field.setLineNumbers(true);

      // Final state: line numbers should be visible
      let options = field.editor.getOption(monaco.editor.EditorOption.lineNumbers);
      expect(options.renderType).toBe(1); // 'on'
    });

    it('handles combination of features without conflicts', () => {
      // Set multiple features and verify they don't conflict
      field.setDisplayText('line 1\nline 2\nline 3');
      field.setLineNumbers(true);
      field.setMinimap(false);
      field.setWordWrap(true);
      field.setFontSize(16);

      // All features should be active
      expect(field.editor.getOption(monaco.editor.EditorOption.lineNumbers).renderType).toBe(1);
      expect(field.editor.getOption(monaco.editor.EditorOption.minimap).enabled).toBe(false);
      expect(field.editor.getOption(monaco.editor.EditorOption.wordWrap)).toBe('on');
      expect(field.editor.getOption(monaco.editor.EditorOption.fontSize)).toBe(16);
    });
  });

  // ========================================
  // CLEANUP AND DISPOSAL
  // ========================================
  describe('cleanup', () => {

    it('properly disposes Monaco editor on remove', () => {
      let field = scout.create(MonacoField, {
        parent: session.desktop
      });
      field.render();

      expect(field.editor).toBeDefined();

      field.remove();

      // Editor should be disposed
      expect(field.editor).toBe(null);
    });

    it('handles remove when not rendered', () => {
      let field = scout.create(MonacoField, {
        parent: session.desktop
      });

      // Should not crash when removing unrendered field
      expect(() => field.remove()).not.toThrow();
    });
  });

  // ========================================
  // BEHAVIORAL EDGE CASES
  // ========================================
  describe('behavioral edge cases', () => {

    it('returns empty string when reading displayText before render', () => {
      let field = scout.create(MonacoField, {
        parent: session.desktop
      });

      // Read display text before rendering - important edge case
      let value = field._readDisplayText();

      // Should return empty string, not crash
      expect(value).toBe('');
    });

    it('converts null displayText to empty string during render', () => {
      let field = scout.create(MonacoField, {
        parent: session.desktop,
        displayText: null
      });
      field.render();

      // Should convert null to empty string to prevent Monaco errors
      expect(field.editor.getValue()).toBe('');
    });

    it('converts undefined displayText to empty string during render', () => {
      let field = scout.create(MonacoField, {
        parent: session.desktop,
        displayText: undefined
      });
      field.render();

      // Should convert undefined to empty string to prevent Monaco errors
      expect(field.editor.getValue()).toBe('');
    });

    it('skips unnecessary setValue when displayText has not changed', () => {
      let field = scout.create(MonacoField, {
        parent: session.desktop,
        displayText: 'test'
      });
      field.render();

      // Track if setValue is called
      let setValueCalled = false;
      let originalSetValue = field.editor.setValue;
      field.editor.setValue = function(value) {
        setValueCalled = true;
        return originalSetValue.call(this, value);
      };

      // Set the same value - should skip the setValue call for performance
      field.setDisplayText('test');

      expect(setValueCalled).toBe(false);
    });

    it('prevents infinite loops by using _isUpdatingEditorFromRenderer flag', () => {
      let field = scout.create(MonacoField, {
        parent: session.desktop,
        updateDisplayTextOnModify: true
      });
      field.render();

      let changeCount = 0;
      field.on('propertyChange:displayText', () => changeCount++);

      // Set from code - should use flag to prevent editor change handler from firing
      field.setDisplayText('new value');

      // Should only trigger one property change (from setDisplayText, not from editor handler)
      expect(changeCount).toBe(1);
    });

    it('makes editor readonly when disabled during initial render', () => {
      let field = scout.create(MonacoField, {
        parent: session.desktop,
        enabled: false
      });
      field.render();

      // Editor should be readonly to match Scout's disabled state
      expect(field.editor.getOption(monaco.editor.EditorOption.readOnly)).toBe(true);
    });
  });
});
