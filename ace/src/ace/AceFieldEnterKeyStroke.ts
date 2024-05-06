/*
 * Copyright (c) 2010, 2023 BSI Business Systems Integration AG
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import {keys, KeyStroke, ScoutKeyboardEvent} from '@eclipse-scout/core';
import {AceField} from "./AceField";

export class AceFieldEnterKeyStroke extends KeyStroke {
  declare field: AceField;

  constructor(aceField: AceField) {
    super();
    this.field = aceField;
    this.which = [keys.ENTER];
    this.renderingHints.render = false;
    this.preventDefault = false;
  }

  protected override _applyPropagationFlags(event: ScoutKeyboardEvent) {
    super._applyPropagationFlags(event);

    let activeElement = this.field.$container.activeElement(true);
    this.preventInvokeAcceptInputOnActiveValueField = !event.isPropagationStopped() && activeElement.tagName.toLowerCase() === 'textarea';
    if (this.preventInvokeAcceptInputOnActiveValueField) {
      event.stopPropagation();
    }
  }

  override handle(event: JQuery.KeyboardEventBase) {
    // NOP
  }
}
