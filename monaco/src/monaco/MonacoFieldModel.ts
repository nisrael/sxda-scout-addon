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
import {BasicFieldModel} from '@eclipse-scout/core';

export interface MonacoFieldModel extends BasicFieldModel<string> {
  language?: string;
  theme?: string;
  readOnly?: boolean;
  lineNumbers?: boolean;
  minimap?: boolean;
  wordWrap?: boolean;
  fontSize?: number;
  tabSize?: number;
  insertSpaces?: boolean;
  automaticLayout?: boolean;
  folding?: boolean;
  renderWhitespace?: string;
  scrollBeyondLastLine?: boolean;
  formatOnPaste?: boolean;
  formatOnType?: boolean;
}
