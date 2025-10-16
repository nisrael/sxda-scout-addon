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
import {AceField} from '../../src/index';
import {scout} from '@eclipse-scout/core';

/**
 * Behavior-focused tests for AceField
 *
 * These tests focus on:
 * - Integration with ACE editor library
 * - User-facing behavior and side effects
 * - Edge cases that could cause bugs
 * - DOM rendering and structure
 *
 * We DON'T test:
 * - Simple property assignments (setX() sets x)
 * - ACE editor internals (trust the library)
 * - Scout framework internals (trust the framework)
 */
describe('AceFieldSpec', () => {

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
      let field = new AceField();

      // These defaults are important for Scout integration
      expect(field.theme).toBe('textmate');
      expect(field.aceMode).toBe('text');
      expect(field.tabSize).toBe(2);
      expect(field.useSoftTabs).toBe(true);
    });

    it('accepts configuration via Scout model', () => {
      let field = scout.create(AceField, {
        parent: session.desktop,
        theme: 'monokai',
        aceMode: 'javascript',
        displayText: 'console.log("test");'
      });

      // Verify Scout's model initialization works
      expect(field.theme).toBe('monokai');
      expect(field.aceMode).toBe('javascript');
      expect(field.displayText).toBe('console.log("test");');
    });
  });

  // ========================================
  // RENDERING AND DOM INTEGRATION
  // ========================================
  describe('rendering', () => {

    it('creates required DOM structure', () => {
      let field = scout.create(AceField, {
        parent: session.desktop
      });
      field.render();

      // Verify Scout form field structure
      expect(field.$container).toBeDefined();
      expect(field.$container.hasClass('ace-field')).toBe(true);
      expect(field.$field).toBeDefined();

      // Verify ACE editor was initialized
      expect(field.editor).toBeDefined();
      expect(typeof field.editor.getValue).toBe('function');
    });

    it('initializes editor with configured text', () => {
      let field = scout.create(AceField, {
        parent: session.desktop,
        displayText: 'function test() {}'
      });
      field.render();

      // This tests the integration between Scout's displayText and ACE
      expect(field.editor.getValue()).toBe('function test() {}');
    });

    it('syncs enabled state to editor readonly mode', () => {
      let field = scout.create(AceField, {
        parent: session.desktop
      });
      field.render();

      // Test the behavior: disabled field = readonly editor
      field.setEnabled(false);
      expect(field.editor.getReadOnly()).toBe(true);

      field.setEnabled(true);
      expect(field.editor.getReadOnly()).toBe(false);
    });
  });

  // ========================================
  // VALUE SYNCHRONIZATION
  // ========================================
  describe('value synchronization', () => {

    let field;

    beforeEach(() => {
      field = scout.create(AceField, {
        parent: session.desktop
      });
      field.render();
    });

    it('syncs Scout value to ACE editor', () => {
      // Test Scout -> ACE direction
      field.setValue('new value');

      expect(field.editor.getValue()).toBe('new value');
    });

    it('reads current value from ACE editor', () => {
      // Test ACE -> Scout direction
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

      // ACE may add trailing newline, so check >= 1000
      expect(field.editor.getValue().split('\n').length).toBeGreaterThanOrEqual(1000);
    });
  });

  // ========================================
  // TEXT SELECTION API
  // ========================================
  describe('selection operations', () => {

    let field;

    beforeEach(() => {
      field = scout.create(AceField, {
        parent: session.desktop,
        displayText: 'Line 1\nLine 2\nLine 3'
      });
      field.render();
    });

    it('selects specific line', () => {
      let selectedText = field.selectLine(1);

      // Verify our custom selection method works
      expect(selectedText).toBe('Line 2');
    });

    it('selects text by range', () => {
      field.selectRange(0, 0, 0, 6);

      // Verify row/col based selection
      expect(field.getSelectedText()).toBe('Line 1');
    });

    it('clears selection', () => {
      field.selectLine(0);
      expect(field.getSelectedText()).toBeTruthy();

      field.clearSelection();
      expect(field.getSelectedText()).toBe('');
    });
  });

  // ========================================
  // EDITOR CONFIGURATION PROPAGATION
  // ========================================
  describe('editor configuration', () => {

    let field;

    beforeEach(() => {
      field = scout.create(AceField, {
        parent: session.desktop
      });
      field.render();
    });

    it('applies tab size to ACE session', () => {
      field.setTabSize(8);

      // Verify it actually configures the ACE editor
      expect(field.editor.session.getTabSize()).toBe(8);
    });

    it('applies soft tabs setting to ACE session', () => {
      field.setUseSoftTabs(false);

      expect(field.editor.session.getUseSoftTabs()).toBe(false);
    });

    it('applies wrap mode to ACE session', () => {
      field.setUseWrapMode(true);

      expect(field.editor.session.getUseWrapMode()).toBe(true);
    });

    it('applies print margin visibility to ACE editor', () => {
      field.setShowPrintMargin(true);

      expect(field.editor.getShowPrintMargin()).toBe(true);
    });

    it('applies active line highlighting to ACE editor', () => {
      field.setHighlightActiveLine(false);

      expect(field.editor.getHighlightActiveLine()).toBe(false);
    });
  });

  // ========================================
  // USER INTERACTION
  // ========================================
  describe('user interaction', () => {

    it('marks field as touched on touch event', () => {
      let field = scout.create(AceField, {
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
      field = scout.create(AceField, {
        parent: session.desktop
      });
      field.render();
    });

    it('handles multi-line text with mixed line endings', () => {
      // Real-world scenario: files from different OS
      let text = 'Unix\nWindows\r\nOld Mac\rMixed';
      field.setDisplayText(text);

      // ACE should normalize this
      let value = field.editor.getValue();
      expect(value).toContain('Unix');
      expect(value).toContain('Windows');
      expect(value).toContain('Old Mac');
      expect(value).toContain('Mixed');
    });

    it('handles rapid property changes', () => {
      // Test for race conditions
      field.setTabSize(2);
      field.setTabSize(4);
      field.setTabSize(8);

      expect(field.editor.session.getTabSize()).toBe(8);
    });

    it('handles setting value before render', () => {
      let field2 = scout.create(AceField, {
        parent: session.desktop
      });

      // Set value before rendering
      field2.setDisplayText('early value');
      field2.render();

      // Should be applied when editor is created
      expect(field2.editor.getValue()).toBe('early value');
    });
  });
});
