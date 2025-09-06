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

export interface CodeMirrorFieldModel extends BasicFieldModel<string> {
  language?: string;
  theme?: string;
  tabSize?: number;
  highlightActiveLine?: boolean;
  syntaxHighlighting?: boolean;
  lineNumbers?: boolean;
  highlightActiveLineGutter?: boolean;
  foldGutter?: boolean;
  dropCursor?: boolean;
  allowMultipleSelections?: boolean;
  indentOnInput?: boolean;
  bracketMatching?: boolean;
  closeBrackets?: boolean;
  autocompletion?: boolean;
  rectangularSelection?: boolean;
  crosshairCursor?: boolean;
  highlightSelectionMatches?: boolean;
  closeBracketsKeymap?: boolean;
  searchKeymap?: boolean;
  foldKeymap?: boolean;
  completionKeymap?: boolean;
  lintKeymap?: boolean;
  highlightSpecialChars?: boolean;
  history?: boolean;
  drawSelection?: boolean;
  defaultKeymap?: boolean;
  historyKeymap?: boolean;
  indentWithTabKeymap?: boolean;
  lineWrapping?: boolean;
}
