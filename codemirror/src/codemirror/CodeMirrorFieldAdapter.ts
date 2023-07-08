/*
 * Copyright (c) 2023 BSI Business Systems Integration AG
 * Copyright (c) 2023 Nils Israel
 *
 * This program is based on work from the Eclipse Scout Project
 * https://www.eclipse.org/scout/ and provides an extension for it.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import {AppLinkActionEvent, Event, FormFieldAdapter} from '@eclipse-scout/core';
import {CodeMirrorField} from '../index';

export class CodeMirrorFieldAdapter extends FormFieldAdapter {

  protected _onWidgetAppLinkAction(event: AppLinkActionEvent) {
    this._send('appLinkAction', {
      ref: event.ref
    });
  }

  protected override _onWidgetEvent(event: Event<CodeMirrorField>) {
    if (event.type === 'appLinkAction') {
      this._onWidgetAppLinkAction(event as AppLinkActionEvent);
    } else {
      super._onWidgetEvent(event);
    }
  }
}
