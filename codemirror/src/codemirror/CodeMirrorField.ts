

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

import {FormField} from '@eclipse-scout/core';
import {CodeMirrorFieldModel} from '../index';

export class CodeMirrorField extends FormField implements CodeMirrorFieldModel{
  override _render() {
    // Create the container
    this.addContainer(this.$parent, 'code-mirror-field');

    // Add a label
    this.addLabel();

    let $field = this.$parent.appendDiv('content');
    // add the field to the form field.
    this.addField($field);

    // Add other required form field elements
    this.addMandatoryIndicator();
    this.addStatus();
  }
}
