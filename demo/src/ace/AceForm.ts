/*
 *  Copyright (c) 2010-2024 BSI Business Systems Integration AG
 *  Copyright (c) 2023-2024 Nils Israel
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
import {Form, FormModel, InitModelOf, models} from '@eclipse-scout/core';
import AceFormModel from './AceFormModel';
import {AceFormWidgetMap} from '../index';

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

    let themeField = this.widget('ThemeField');
    themeField.setValue(ace.theme);
    themeField.on('propertyChange:value', event => ace.setTheme(event.newValue));

    let modeField = this.widget('ModeField');
    modeField.setValue(ace.aceMode);
    modeField.on('propertyChange:value', event => ace.setAceMode(event.newValue));

    this.widget('EventsTab').setField(ace);
  }
}
