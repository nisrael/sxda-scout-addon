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
import {scout, App, ObjectFactory} from '@eclipse-scout/core';
import {Desktop} from './desktop/Desktop'
import '@sxda/scout-addon-ace';
require('ace-code/esm-resolver');
import * as self from './index';
import {require} from "ace-code";

export * from './desktop/Desktop'
export * from './desktop/DemoOutline'
export * from './common/EventsTab'
export * from './common/EventsTabModel'
export * from './ace/AceFormModel'
export * from './ace/AceForm'

scout.addObjectFactories({
  'Desktop': function () {
    return new Desktop();
  }
});

ObjectFactory.get().registerNamespace('sxda', self);

new App().init({
  bootstrap: {
    textsUrl: 'texts.json',
    localesUrl: 'locales.json'
  }
});


