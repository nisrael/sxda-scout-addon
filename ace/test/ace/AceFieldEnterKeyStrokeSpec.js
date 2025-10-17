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
import {AceFieldEnterKeyStroke} from '../../src/ace/AceFieldEnterKeyStroke';
import {keys, scout} from '@eclipse-scout/core';

/**
 * Tests for AceFieldEnterKeyStroke
 *
 * Tests the special Enter key handling for Ace editor fields,
 * which prevents form submission when editing multi-line text.
 */
describe('AceFieldEnterKeyStrokeSpec', () => {

  let session;
  let field;
  let keyStroke;

  beforeEach(() => {
    setFixtures(sandbox());
    session = sandboxSession();
    field = scout.create(AceField, {
      parent: session.desktop
    });
    field.render();
    keyStroke = new AceFieldEnterKeyStroke(field);
  });

  describe('initialization', () => {

    it('creates keystroke with Enter key binding', () => {
      expect(keyStroke).toBeDefined();
      expect(keyStroke.field).toBe(field);
      expect(keyStroke.which).toContain(keys.ENTER);
    });

    it('configures rendering hints correctly', () => {
      // Should not render (no visual feedback needed)
      expect(keyStroke.renderingHints.render).toBe(false);
    });

    it('does not prevent default by default', () => {
      // Allow browser's default Enter behavior (newline in textarea)
      expect(keyStroke.preventDefault).toBe(false);
    });
  });

  describe('propagation flags', () => {

    it('stops propagation when active element is textarea', () => {
      // Create a mock jQuery event
      let mockEvent = $.Event('keydown', {which: keys.ENTER});

      // Mock activeElement to return textarea
      spyOn(field.$container, 'activeElement').and.returnValue(
        $('<textarea>')[0]
      );

      // Apply propagation flags
      keyStroke._applyPropagationFlags(mockEvent);

      // Should prevent form submission for textarea
      expect(keyStroke.preventInvokeAcceptInputOnActiveValueField).toBe(true);
      expect(mockEvent.isPropagationStopped()).toBe(true);
    });

    it('allows propagation when active element is not textarea', () => {
      // Create a mock jQuery event
      let mockEvent = $.Event('keydown', {which: keys.ENTER});

      // Mock activeElement to return input
      spyOn(field.$container, 'activeElement').and.returnValue(
        $('<input>')[0]
      );

      // Apply propagation flags
      keyStroke._applyPropagationFlags(mockEvent);

      // Should allow form submission for non-textarea elements
      expect(keyStroke.preventInvokeAcceptInputOnActiveValueField).toBe(false);
    });

    it('respects already stopped propagation', () => {
      // Create a mock jQuery event that's already stopped
      let mockEvent = $.Event('keydown', {which: keys.ENTER});
      mockEvent.stopPropagation();

      // Mock activeElement to return textarea
      spyOn(field.$container, 'activeElement').and.returnValue(
        $('<textarea>')[0]
      );

      // Apply propagation flags
      keyStroke._applyPropagationFlags(mockEvent);

      // Should not set preventInvokeAcceptInputOnActiveValueField if already stopped
      expect(keyStroke.preventInvokeAcceptInputOnActiveValueField).toBe(false);
    });
  });

  describe('handle method', () => {

    it('does nothing (NOP)', () => {
      // The handle method is intentionally empty
      // Actual Enter key handling is done by Ace editor itself
      let mockEvent = $.Event('keydown', {which: keys.ENTER});

      // Should not throw
      expect(() => {
        keyStroke.handle(mockEvent);
      }).not.toThrow();
    });
  });

  describe('integration with AceField', () => {

    it('field has enter keystroke registered', () => {
      // Verify that AceField actually uses this keystroke
      // (This depends on AceField implementation)
      let hasEnterKeyStroke = field.keyStrokeContext.keyStrokes.some(ks =>
        ks instanceof AceFieldEnterKeyStroke
      );

      expect(hasEnterKeyStroke).toBe(true);
    });
  });
});
