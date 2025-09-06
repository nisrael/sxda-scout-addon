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
import {keys, KeyStroke, ScoutKeyboardEvent} from '@eclipse-scout/core';
import {CodeMirrorField} from "./CodeMirrorField";

export class CodeMirrorFieldBackspaceKeyStroke extends KeyStroke {
  declare field: CodeMirrorField;

  constructor(field: CodeMirrorField) {
    super();
    this.field = field;
    this.which = [keys.BACKSPACE];
    this.renderingHints.render = false;
    this.preventDefault = false;
  }

  protected override _applyPropagationFlags(event: ScoutKeyboardEvent) {
    super._applyPropagationFlags(event);

    let activeElement = this.field.$container.activeElement(true);
    this.preventInvokeAcceptInputOnActiveValueField = !event.isPropagationStopped() && activeElement.getAttribute('role').toLowerCase() === 'textbox';
    if (this.preventInvokeAcceptInputOnActiveValueField) {
      event.stopPropagation();
    }
  }

  override handle(event: JQuery.KeyboardEventBase) {
    // NOP
  }
}
