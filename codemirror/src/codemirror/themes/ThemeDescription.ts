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
import {Extension} from "@codemirror/state";
import {defaultHighlightStyle, HighlightStyle} from "@codemirror/language";

export class ThemeDescription {
  readonly id: string;
  readonly name: string;
  readonly dark: boolean;
  extension: Extension | undefined;
  syntaxHighlightStyle: HighlightStyle | undefined;
  loadFunc: (() => Promise<Extension>) | undefined;
  private loading;


  constructor(id: string, name: string, dark: boolean, load: (() => Promise<Extension>), syntaxHighlightStyle?: HighlightStyle) {
    this.id = id;
    this.name = name;
    this.dark = dark;
    this.loadFunc = load;
    this.syntaxHighlightStyle = syntaxHighlightStyle;
    this.loading = null;
  }

  load(): Promise<Extension> {
    return this.loading || (this.loading = this.loadFunc().then(extension => this.extension = extension, err => {
      this.loading = null;
      throw err;
    }));
  }

  static of(spec: {
    id: string;
    name?: string;
    dark: boolean;
    load?: () => Promise<Extension>;
    extension?: Extension;
    syntaxHighlightStyle?: HighlightStyle
  }) {
    let {load, extension} = spec;
    if (!load) {
      if (!extension)
        throw new RangeError("Must pass either 'load' or 'extension' to ThemeDescription.of");
      load = () => Promise.resolve(extension);
    }
    let name = spec.name ? spec.name : spec.id;
    let syntaxHighlightStyle = spec.syntaxHighlightStyle ? spec.syntaxHighlightStyle : defaultHighlightStyle;
    return new ThemeDescription(spec.id.toString(), name, spec.dark, load, syntaxHighlightStyle);
  }

}
