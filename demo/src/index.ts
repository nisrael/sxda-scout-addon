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
import {App, ObjectFactory, scout} from '@eclipse-scout/core';
import {Desktop} from './desktop/Desktop'

import * as self from './index';
import 'ace-code/esm-resolver'

// Monaco Editor environment is automatically configured by monaco-editor-webpack-plugin

export * from './desktop/Desktop'
export * from './desktop/DemoOutline'
export * from './common/EventsTab'
export * from './common/EventsTabModel'
export * from './ace/AceFormModel'
export * from './ace/AceForm'
export * from './codemirror/CodeMirrorFormModel'
export * from './codemirror/CodeMirrorForm'
export * from './monaco/MonacoFormModel'
export * from './monaco/MonacoForm'

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


