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
import {ObjectFactory} from '@eclipse-scout/core';

export * from './ace/AceField';
export * from './ace/AceFieldAdapter';
export * from './ace/AceFieldModel';
export * from './ace/AceFieldEventMap';
export * from './ace/modes/AceMode';
export * from './ace/modes/AceModes';
export * from './ace/modes/AceModeLookupCall';
export * from './ace/themes/AceTheme';
export * from './ace/themes/AceThemes';
export * from './ace/themes/AceThemeLookupCall';

import * as self from './index';

export default self;

ObjectFactory.get().registerNamespace('sxda', self);
