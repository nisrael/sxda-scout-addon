/*
 *  Copyright (c) 2010-20240129-202419 BSI Business Systems Integration AG
 *  Copyright (c) 2023-20240129-202419 Nils Israel
 *
 * This program is an extension of the original work from the Eclipse Scout Project,
 * available at https://www.eclipse.org/scout/.
 *
 *  This program and the accompanying materials are made
 *  available under the terms of the Eclipse Public License 2.0
 *  which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 *  SPDX-License-Identifier: EPL-2.0
 */
import {Form, FormModel, InitModelOf, KeyStroke, models} from '@eclipse-scout/core';
import AceFormModel from './AceFormModel';
import {AceFormWidgetMap} from '../index';
import {AceModes, AceThemes} from "../../../ace/src";
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';


export class AceForm extends Form {
  declare widgetMap: AceFormWidgetMap;

  constructor() {
    super();
  }

  protected override _jsonModel(): FormModel {
    return models.get(AceFormModel);
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);

    let ace = this.widget('AceField');

    let enableField = this.widget('EnableField');
    enableField.setValue(ace.enabled);
    enableField.on('propertyChange:value', event => ace.setEnabled(event.newValue));

    let softTabsField = this.widget('SoftTabsField');
    softTabsField.setValue(ace.useSoftTabs);
    softTabsField.on('propertyChange:value', event => ace.setUseSoftTabs(event.newValue));

    let wrapModeField = this.widget('WrapModeField');
    wrapModeField.setValue(ace.useWrapMode);
    wrapModeField.on('propertyChange:value', event => ace.setUseWrapMode(event.newValue));

    let showPrintMarginField = this.widget('ShowPrintMarginField');
    showPrintMarginField.setValue(ace.showPrintMargin);
    showPrintMarginField.on('propertyChange:value', event => ace.setShowPrintMargin(event.newValue));

    let selectOnSetValueField = this.widget('SelectOnSetValueField');
    selectOnSetValueField.setValue(ace.selectOnSetValue);
    selectOnSetValueField.on('propertyChange:value', event => ace.setSelectOnSetValue(event.newValue));

    let highlightActiveLineField = this.widget('HighlightActiveLineField');
    highlightActiveLineField.setValue(ace.highlightActiveLine);
    highlightActiveLineField.on('propertyChange:value', event => ace.setHighlightActiveLine(event.newValue));

    let themeField = this.widget('ThemeField');
    themeField.setValue(ace.theme.id);
    themeField.on('propertyChange:value', event => ace.setTheme(AceThemes.getInstance().get(event.newValue)));

    let modeField = this.widget('ModeField');
    modeField.setValue(ace.aceMode.id);
    modeField.on('propertyChange:value', event => ace.setAceMode(AceModes.getInstance().get(event.newValue)));

    let setValueField = this.widget('SetValueField');
    let setValueButton = this.widget('SetValueButton');
    setValueButton.on('click', event => ace.setValue(setValueField.value));

    this.widget('EventsTab').setField(ace);
  }
}
