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
import {BasicField} from '@eclipse-scout/core';
import {MonacoFieldModel} from './MonacoFieldModel';
import {MonacoFieldEventMap} from './MonacoFieldEventMap';
import * as monaco from 'monaco-editor';

export class MonacoField extends BasicField<string> implements MonacoFieldModel {
  declare model: MonacoFieldModel;
  declare eventMap: MonacoFieldEventMap;
  declare self: MonacoField;

  protected _editor: monaco.editor.IStandaloneCodeEditor;
  protected _isUpdatingEditorFromRenderer: boolean;

  language: string;
  theme: string;
  lineNumbers: boolean;
  minimap: boolean;
  wordWrap: boolean;
  fontSize: number;
  tabSize: number;
  insertSpaces: boolean;
  automaticLayout: boolean;
  folding: boolean;
  renderWhitespace: string;
  scrollBeyondLastLine: boolean;
  formatOnPaste: boolean;
  formatOnType: boolean;

  constructor() {
    super();
    this.language = 'plaintext';
    this.theme = 'vs';
    this.lineNumbers = true;
    this.minimap = true;
    this.wordWrap = false;
    this.fontSize = 14;
    this.tabSize = 4;
    this.insertSpaces = true;
    this.automaticLayout = true;
    this.folding = true;
    this.renderWhitespace = 'none';
    this.scrollBeyondLastLine = false;
    this.formatOnPaste = false;
    this.formatOnType = false;
    this._isUpdatingEditorFromRenderer = false;
  }

  protected override _render() {
    this.addContainer(this.$parent, 'monaco-field');
    this.addLabel();

    // Create the field container element and add it as the field
    let $field = this.$parent.appendDiv('monaco');
    this.addField($field);

    const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
      value: this.displayText || '',
      language: this.language,
      theme: this.theme,
      readOnly: !this.enabled,
      lineNumbers: this.lineNumbers ? 'on' : 'off',
      minimap: {enabled: this.minimap},
      wordWrap: this.wordWrap ? 'on' : 'off',
      fontSize: this.fontSize,
      tabSize: this.tabSize,
      insertSpaces: this.insertSpaces,
      automaticLayout: this.automaticLayout,
      folding: this.folding,
      renderWhitespace: this.renderWhitespace as any,
      scrollBeyondLastLine: this.scrollBeyondLastLine,
      formatOnPaste: this.formatOnPaste,
      formatOnType: this.formatOnType
    };

    // Create Monaco editor in the field element
    this._editor = monaco.editor.create($field[0], editorOptions);

    // Listen to content changes
    this._editor.onDidChangeModelContent(() => this._onEditorValueChange());

    // Trigger layout after creation to ensure proper rendering
    this._editor.layout();

    this.addMandatoryIndicator();
    this.addStatus();
  }

  protected override _renderDisplayText() {
    if (!this._editor || this._isUpdatingEditorFromRenderer) {
      return;
    }
    this._isUpdatingEditorFromRenderer = true;
    try {
      const currentValue = this._editor.getValue();
      if (currentValue !== this.displayText) {
        this._editor.setValue(this.displayText || '');
      }
    } finally {
      this._isUpdatingEditorFromRenderer = false;
    }
  }

  protected override _readDisplayText(): string {
    return this._editor ? this._editor.getValue() : '';
  }

  _onEditorValueChange() {
    // Don't handle changes that we triggered ourselves
    if (this._isUpdatingEditorFromRenderer) {
      return;
    }

    // Update has-text indicator
    this._updateHasText();

    // Use Scout's built-in method for while-typing updates
    if (this.updateDisplayTextOnModify) {
      this._onDisplayTextModified();
    }
  }

  protected override _renderEnabled() {
    super._renderEnabled();
    if (this._editor) {
      this._editor.updateOptions({readOnly: !this.enabled});
    }
  }

  protected _renderLanguage() {
    if (this._editor) {
      const model = this._editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, this.language);
      }
    }
  }

  protected _renderTheme() {
    if (this._editor) {
      monaco.editor.setTheme(this.theme);
    }
  }

  protected _renderLineNumbers() {
    if (this._editor) {
      this._editor.updateOptions({lineNumbers: this.lineNumbers ? 'on' : 'off'});
    }
  }

  protected _renderMinimap() {
    if (this._editor) {
      this._editor.updateOptions({minimap: {enabled: this.minimap}});
    }
  }

  protected _renderWordWrap() {
    if (this._editor) {
      this._editor.updateOptions({wordWrap: this.wordWrap ? 'on' : 'off'});
    }
  }

  protected _renderFontSize() {
    if (this._editor) {
      this._editor.updateOptions({fontSize: this.fontSize});
    }
  }

  protected _renderTabSize() {
    if (this._editor) {
      this._editor.updateOptions({tabSize: this.tabSize});
    }
  }

  protected _renderInsertSpaces() {
    if (this._editor) {
      this._editor.updateOptions({insertSpaces: this.insertSpaces});
    }
  }

  protected _renderFolding() {
    if (this._editor) {
      this._editor.updateOptions({folding: this.folding});
    }
  }

  protected _renderRenderWhitespace() {
    if (this._editor) {
      this._editor.updateOptions({renderWhitespace: this.renderWhitespace as any});
    }
  }

  protected _renderScrollBeyondLastLine() {
    if (this._editor) {
      this._editor.updateOptions({scrollBeyondLastLine: this.scrollBeyondLastLine});
    }
  }

  protected _renderFormatOnPaste() {
    if (this._editor) {
      this._editor.updateOptions({formatOnPaste: this.formatOnPaste});
    }
  }

  protected _renderFormatOnType() {
    if (this._editor) {
      this._editor.updateOptions({formatOnType: this.formatOnType});
    }
  }

  protected override _remove() {
    if (this._editor) {
      this._editor.dispose();
      this._editor = null;
    }
    super._remove();
  }

  get editor(): monaco.editor.IStandaloneCodeEditor {
    return this._editor;
  }
}
