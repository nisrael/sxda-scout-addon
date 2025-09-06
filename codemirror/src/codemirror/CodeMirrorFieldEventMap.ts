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
import {BasicFieldEventMap, PropertyChangeEvent} from '@eclipse-scout/core';

export interface CodeMirrorFieldEventMap extends BasicFieldEventMap<string> {
  'propertyChange:language': PropertyChangeEvent<string>;
  'propertyChange:theme': PropertyChangeEvent<string>;
  'propertyChange:highlightActiveLine': PropertyChangeEvent<boolean>;
  'propertyChange:syntaxHighlighting': PropertyChangeEvent<boolean>;
  'propertyChange:lineNumbers': PropertyChangeEvent<boolean>;
  'propertyChange:highlightActiveLineGutter': PropertyChangeEvent<boolean>;
  'propertyChange:foldGutter': PropertyChangeEvent<boolean>;
  'propertyChange:dropCursor': PropertyChangeEvent<boolean>;
  'propertyChange:allowMultipleSelections': PropertyChangeEvent<boolean>;
  'propertyChange:indentOnInput': PropertyChangeEvent<boolean>;
  'propertyChange:bracketMatching': PropertyChangeEvent<boolean>;
  'propertyChange:closeBrackets': PropertyChangeEvent<boolean>;
  'propertyChange:autocompletion': PropertyChangeEvent<boolean>;
  'propertyChange:rectangularSelection': PropertyChangeEvent<boolean>;
  'propertyChange:crosshairCursor': PropertyChangeEvent<boolean>;
  'propertyChange:highlightSelectionMatches': PropertyChangeEvent<boolean>;
  'propertyChange:tabSize': PropertyChangeEvent<number>;
  'propertyChange:highlightSpecialChars': PropertyChangeEvent<boolean>;
  'propertyChange:history': PropertyChangeEvent<boolean>;
  'propertyChange:drawSelection': PropertyChangeEvent<boolean>;
  'propertyChange:foldKeymap': PropertyChangeEvent<boolean>;
  'propertyChange:searchKeymap': PropertyChangeEvent<boolean>;
  'propertyChange:closeBracketsKeymap': PropertyChangeEvent<boolean>;
  'propertyChange:completionKeymap': PropertyChangeEvent<boolean>;
  'propertyChange:lintKeymap': PropertyChangeEvent<boolean>;
  'propertyChange:defaultKeymap': PropertyChangeEvent<boolean>;
  'propertyChange:historyKeymap': PropertyChangeEvent<boolean>;
  'propertyChange:indentWithTabKeymap': PropertyChangeEvent<boolean>;
  'propertyChange:lineWrapping': PropertyChangeEvent<boolean>;
}
