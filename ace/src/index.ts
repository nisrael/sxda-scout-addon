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
import {ObjectFactory} from '@eclipse-scout/core';

export * from './ace/AceField';
export * from './ace/AceFieldAdapter';
export * from './ace/AceFieldModel';
export * from './ace/AceFieldEventMap';

import * as self from './index';

export default self;

ObjectFactory.get().registerNamespace('sxda', self);
