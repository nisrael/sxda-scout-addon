/*
 * Copyright (c) 2010-2024 BSI Business Systems Integration AG
 * Copyright (c) 2023-2024 Nils Israel
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
import {Form, FormModel, InitModelOf, models} from '@eclipse-scout/core';
import {CodeMirrorFormWidgetMap} from '../index';
import CodeMirrorFormModel from "./CodeMirrorFormModel";

export class CodeMirrorForm extends Form {
  declare widgetMap: CodeMirrorFormWidgetMap;

  constructor() {
    super();
  }

  protected override _jsonModel(): FormModel {
    return models.get(CodeMirrorFormModel);
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);

    let codeMirror = this.widget('CodeMirrorField');

    let setValueField = this.widget('SetValueField');
    let setValueButton = this.widget('SetValueButton');
    //setValueButton.on('click', event => ace.setValue(setValueField.value));

    this.widget('EventsTab').setField(codeMirror);
  }
}
