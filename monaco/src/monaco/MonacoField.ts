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

import {InitModelOf, ValueField} from '@eclipse-scout/core';
import {MonacoFieldModel} from "./MonacoFieldModel";
import * as monaco from 'monaco-editor';


export class MonacoField extends ValueField<string> implements MonacoFieldModel{
  editor: string;

  protected override _init(model: InitModelOf<this>) {
    super._init(model);
  }


  override _renderDisplayText() {
    super._renderDisplayText();
  }


  override _render() {
    // Create the container
    this.addContainer(this.$parent, 'monaco-field');

    // Add a label
    this.addLabel();

    let $field = this.$parent.appendDiv('monaco');
    this.addField($field);

    monaco.editor.create($field.get()[0], {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'javascript'
    });

    // Add other required form field elements
    this.addMandatoryIndicator();
    this.addStatus();
  }
}
