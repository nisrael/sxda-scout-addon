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
import {ValueFieldModel} from '@eclipse-scout/core';
import {AceTheme} from "./themes/AceTheme";
import {AceMode} from "./modes/AceMode";

export interface AceFieldModel extends ValueFieldModel<string> {
  theme?: string;
  aceMode?: string;
  tabSize?: number;
  useSoftTabs?: boolean;
  useWrapMode?: boolean;
  showPrintMargin?: boolean;
  highlightActiveLine?: boolean;
  selectOnSetValue?: boolean;
}
