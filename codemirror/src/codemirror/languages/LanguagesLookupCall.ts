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
import {StaticLookupCall} from '@eclipse-scout/core';
import {languages} from "@codemirror/language-data";

export class LanguagesLookupCall extends StaticLookupCall<string> {
  protected override _data(): any[] {
    return [['None', 'None']]
      .concat(
        languages
          .map(languageDescription => ([
            languageDescription.name,
            languageDescription.name
          ]))
          .sort((a, b) => a[1].localeCompare(b[1]))
      );
  }
}