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
import {CodeMirrorFieldBackspaceKeyStroke} from '../../src/codemirror/CodeMirrorFieldBackspaceKeyStroke';
import {keys, scout} from '@eclipse-scout/core';

/**
 * Tests for CodeMirrorFieldBackspaceKeyStroke
 *
 * Tests the special Backspace key handling for CodeMirror fields,
 * which prevents unwanted form navigation when editing text.
 */
describe('CodeMirrorFieldBackspaceKeyStrokeSpec', () => {

  let session;
  let field;
  let keyStroke;

  beforeEach(() => {
    setFixtures(sandbox());
    session = sandboxSession();
    field = scout.create(CodeMirrorField, {
      parent: session.desktop
    });
    field.render();
    keyStroke = new CodeMirrorFieldBackspaceKeyStroke(field);
  });

  describe('initialization', () => {

    it('creates keystroke with Backspace key binding', () => {
      expect(keyStroke).toBeDefined();
      expect(keyStroke.field).toBe(field);
      expect(keyStroke.which).toContain(keys.BACKSPACE);
    });

    it('configures rendering hints correctly', () => {
      // Should not render (no visual feedback needed)
      expect(keyStroke.renderingHints.render).toBe(false);
    });

    it('does not prevent default by default', () => {
      // Allow browser's default Backspace behavior (delete character)
      expect(keyStroke.preventDefault).toBe(false);
    });
  });

  describe('propagation flags', () => {

    it('stops propagation when active element is textbox', () => {
      // Create a mock jQuery event
      let mockEvent = $.Event('keydown', {which: keys.BACKSPACE});

      // Mock activeElement to return element with role="textbox"
      let mockElement = document.createElement('div');
      mockElement.setAttribute('role', 'textbox');

      spyOn(field.$container, 'activeElement').and.returnValue(mockElement);

      // Apply propagation flags
      keyStroke._applyPropagationFlags(mockEvent);

      // Should prevent form navigation for textbox
      expect(keyStroke.preventInvokeAcceptInputOnActiveValueField).toBe(true);
      expect(mockEvent.isPropagationStopped()).toBe(true);
    });

    it('allows propagation when active element is not textbox', () => {
      // Create a mock jQuery event
      let mockEvent = $.Event('keydown', {which: keys.BACKSPACE});

      // Mock activeElement to return element with different role
      let mockElement = document.createElement('button');
      mockElement.setAttribute('role', 'button');

      spyOn(field.$container, 'activeElement').and.returnValue(mockElement);

      // Apply propagation flags
      keyStroke._applyPropagationFlags(mockEvent);

      // Should allow navigation for non-textbox elements
      expect(keyStroke.preventInvokeAcceptInputOnActiveValueField).toBe(false);
    });

    it('respects already stopped propagation', () => {
      // Create a mock jQuery event that's already stopped
      let mockEvent = $.Event('keydown', {which: keys.BACKSPACE});
      mockEvent.stopPropagation();

      // Mock activeElement to return textbox
      let mockElement = document.createElement('div');
      mockElement.setAttribute('role', 'textbox');

      spyOn(field.$container, 'activeElement').and.returnValue(mockElement);

      // Apply propagation flags
      keyStroke._applyPropagationFlags(mockEvent);

      // Should not set preventInvokeAcceptInputOnActiveValueField if already stopped
      expect(keyStroke.preventInvokeAcceptInputOnActiveValueField).toBe(false);
    });
  });

  describe('handle method', () => {

    it('does nothing (NOP)', () => {
      // The handle method is intentionally empty
      // Actual Backspace key handling is done by CodeMirror itself
      let mockEvent = $.Event('keydown', {which: keys.BACKSPACE});

      // Should not throw
      expect(() => {
        keyStroke.handle(mockEvent);
      }).not.toThrow();
    });
  });

  describe('integration with CodeMirrorField', () => {

    it('field has backspace keystroke registered', () => {
      // Verify that CodeMirrorField actually uses this keystroke
      // (This depends on CodeMirrorField implementation)
      let hasBackspaceKeyStroke = field.keyStrokeContext.keyStrokes.some(ks =>
        ks instanceof CodeMirrorFieldBackspaceKeyStroke
      );

      expect(hasBackspaceKeyStroke).toBe(true);
    });
  });
});
