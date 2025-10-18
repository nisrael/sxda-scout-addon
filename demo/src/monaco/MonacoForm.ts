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
import {Form, FormModel, InitModelOf, models} from '@eclipse-scout/core';
import MonacoFormModel from './MonacoFormModel';
import {MonacoFormWidgetMap} from '../index';

export class MonacoForm extends Form {
  declare widgetMap: MonacoFormWidgetMap;

  constructor() {
    super();
  }

  protected override _jsonModel(): FormModel {
    return models.get(MonacoFormModel);
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);

    let monaco = this.widget('MonacoField');

    let enableField = this.widget('EnableField');
    enableField.setValue(monaco.enabled);
    enableField.on('propertyChange:value', event => monaco.setEnabled(event.newValue));

    let languageField = this.widget('LanguageField');
    languageField.setValue(monaco.language);
    languageField.on('propertyChange:value', event => {
      if (event.newValue) {
        monaco.setProperty('language', event.newValue);
      }
    });

    let themeField = this.widget('ThemeField');
    themeField.setValue(monaco.theme);
    themeField.on('propertyChange:value', event => {
      if (event.newValue) {
        monaco.setProperty('theme', event.newValue);
      }
    });

    let lineNumbersField = this.widget('LineNumbersField');
    lineNumbersField.setValue(monaco.lineNumbers);
    lineNumbersField.on('propertyChange:value', event => monaco.setProperty('lineNumbers', event.newValue));

    let minimapField = this.widget('MinimapField');
    minimapField.setValue(monaco.minimap);
    minimapField.on('propertyChange:value', event => monaco.setProperty('minimap', event.newValue));

    let wordWrapField = this.widget('WordWrapField');
    wordWrapField.setValue(monaco.wordWrap);
    wordWrapField.on('propertyChange:value', event => monaco.setProperty('wordWrap', event.newValue));

    let foldingField = this.widget('FoldingField');
    foldingField.setValue(monaco.folding);
    foldingField.on('propertyChange:value', event => monaco.setProperty('folding', event.newValue));

    let fontSizeField = this.widget('FontSizeField');
    fontSizeField.setValue(monaco.fontSize);
    fontSizeField.on('propertyChange:value', event => monaco.setProperty('fontSize', event.newValue));

    let tabSizeField = this.widget('TabSizeField');
    tabSizeField.setValue(monaco.tabSize);
    tabSizeField.on('propertyChange:value', event => monaco.setProperty('tabSize', event.newValue));

    let setValueField = this.widget('SetValueField');
    let setValueButton = this.widget('SetValueButton');
    setValueButton.on('click', event => monaco.setValue(setValueField.value));

    this.widget('EventsTab').setField(monaco);
  }
}
