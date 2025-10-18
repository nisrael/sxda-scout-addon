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
import StringFieldFormModel from './StringFieldFormModel';
import {StringFieldFormWidgetMap} from '../index';

export class StringFieldForm extends Form {
  declare widgetMap: StringFieldFormWidgetMap;

  constructor() {
    super();
  }

  protected override _jsonModel(): FormModel {
    return models.get(StringFieldFormModel);
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);

    let stringField = this.widget('StringField');

    let enableField = this.widget('EnableField');
    enableField.setValue(stringField.enabled);
    enableField.on('propertyChange:value', event => stringField.setEnabled(event.newValue));

    let updateDisplayTextOnModifyField = this.widget('UpdateDisplayTextOnModifyField');
    updateDisplayTextOnModifyField.setValue(stringField.updateDisplayTextOnModify);
    updateDisplayTextOnModifyField.on('propertyChange:value', event => stringField.setUpdateDisplayTextOnModify(event.newValue));

    let multilineField = this.widget('MultilineField');
    multilineField.setValue(stringField.multilineText);
    multilineField.on('propertyChange:value', event => stringField.setMultilineText(event.newValue));

    let spellCheckEnabledField = this.widget('SpellCheckEnabledField');
    spellCheckEnabledField.setValue(stringField.spellCheckEnabled);
    spellCheckEnabledField.on('propertyChange:value', event => stringField.setSpellCheckEnabled(event.newValue));

    let trimTextField = this.widget('TrimTextField');
    trimTextField.setValue(stringField.trimText);
    trimTextField.on('propertyChange:value', event => stringField.setTrimText(event.newValue));

    let wrapTextField = this.widget('WrapTextField');
    wrapTextField.setValue(stringField.wrapText);
    wrapTextField.on('propertyChange:value', event => stringField.setWrapText(event.newValue));

    let selectionTrackingEnabledField = this.widget('SelectionTrackingEnabledField');
    selectionTrackingEnabledField.setValue(stringField.selectionTrackingEnabled);
    selectionTrackingEnabledField.on('propertyChange:value', event => stringField.setSelectionTrackingEnabled(event.newValue));

    let inputMaskedField = this.widget('InputMaskedField');
    inputMaskedField.setValue(stringField.inputMasked);
    inputMaskedField.on('propertyChange:value', event => stringField.setInputMasked(event.newValue));

    let maxLengthField = this.widget('MaxLengthField');
    maxLengthField.setValue(stringField.maxLength);
    maxLengthField.on('propertyChange:value', event => {
      if (event.newValue !== null && event.newValue !== undefined) {
        stringField.setMaxLength(event.newValue);
      }
    });

    let setValueField = this.widget('SetValueField');
    let setValueButton = this.widget('SetValueButton');
    setValueButton.on('click', event => stringField.setValue(setValueField.value));

    this.widget('EventsTab').setField(stringField);
  }
}
