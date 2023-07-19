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

import {PropertyChangeEvent, ValueFieldEventMap} from '@eclipse-scout/core';

export interface AceFieldEventMap extends ValueFieldEventMap<string> {
  'propertyChange:theme': PropertyChangeEvent<string>;
  'propertyChange:tabSize': PropertyChangeEvent<number>;
  'propertyChange:useSoftTabs': PropertyChangeEvent<boolean>;
  'propertyChange:useWrapMode': PropertyChangeEvent<boolean>;
  'propertyChange:showPrintMargin': PropertyChangeEvent<boolean>;
  'propertyChange:readOnly': PropertyChangeEvent<boolean>;
  'propertyChange:highlightActiveLine': PropertyChangeEvent<boolean>;
}
