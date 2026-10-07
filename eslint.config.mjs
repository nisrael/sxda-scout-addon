/*
 * Copyright (c) 2010-2026 BSI Business Systems Integration AG
 * Copyright (c) 2023-2026 Nils Israel
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
import {defineConfig, globalIgnores} from 'eslint/config';
import scoutConfig from '@eclipse-scout/eslint-config';

export default defineConfig([
  scoutConfig,
  {
    rules: {
      '@stylistic/linebreak-style': 'off'
    }
  },
  globalIgnores([
    '.git',
    '.idea',
'**/dist/',
    '**/target/',
    '*/src/main/resources',
    '*/src/test/resources',
    '*/src/main/java',
    '*/src/test/java'
  ])
]);
