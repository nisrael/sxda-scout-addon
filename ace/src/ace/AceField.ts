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
import {AceFieldModel} from "./AceFieldModel";
import {AceFieldEventMap} from "./AceFieldEventMap";
import * as ace from "ace-builds";

export class AceField extends ValueField<string> implements AceFieldModel{
  declare model: AceFieldModel;
  declare eventMap: AceFieldEventMap;
  declare self: AceField;

  editor: ace.Ace.Editor;
  theme: string;

  constructor() {
    super();
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);
  }

  setTheme(theme: string) {
    this.setProperty('theme', theme);
  }

  _setTheme(theme: string){
    this.theme = theme;
  }


  override _renderDisplayText() {
    super._renderDisplayText();
  }


  override _render() {
    // Create the container
    this.addContainer(this.$parent, 'ace-field');

    // Add a label
    this.addLabel();

    let $field = this.$parent.appendDiv('ace');
    this.addField($field);


    this.editor = ace.edit($field.get()[0]);

    // Add other required form field elements
    this.addMandatoryIndicator();
    this.addStatus();
  }

  _renderTheme(){
    this.editor.setTheme("ace/theme/"+this.theme);
  }

  protected override _renderProperties() {
    super._renderProperties();
    this._renderTheme();
  }
}
