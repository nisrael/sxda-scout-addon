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
import {BasicField, InitModelOf, InputFieldKeyStrokeContext, StringField, strings} from '@eclipse-scout/core';
import {AceFieldModel} from "./AceFieldModel";
import {AceFieldEventMap} from "./AceFieldEventMap";
import * as ace from "ace-code";
import {Range} from "ace-code";
import {AceThemes} from "./themes/AceThemes";
import {AceModes} from "./modes/AceModes";
import {AceFieldEnterKeyStroke} from "./AceFieldEnterKeyStroke";

export class AceField extends BasicField<string> implements AceFieldModel {
  declare model: AceFieldModel;
  declare eventMap: AceFieldEventMap;
  declare self: AceField;

  editor: ace.Ace.Editor;
  theme: string;
  aceMode: string;
  tabSize: number;
  useSoftTabs: boolean;
  useWrapMode: boolean;
  showPrintMargin: boolean;
  highlightActiveLine: boolean;
  selectOnSetValue: boolean;

  protected _editorUpdateFromRenderDisplayText: boolean;

  constructor() {
    super();
    this.theme = 'textmate';
    this.aceMode = 'text';
    this.tabSize = 2;
    this.useSoftTabs = true;
    this.useWrapMode = false;
    this.showPrintMargin = false;
    this.highlightActiveLine = true;
    this.selectOnSetValue = false;
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);
  }

  protected override _initKeyStrokeContext() {
    super._initKeyStrokeContext();

    this.keyStrokeContext.registerKeyStrokes([
      new AceFieldEnterKeyStroke(this)
    ]);
  }

  protected override _createKeyStrokeContext(): InputFieldKeyStrokeContext {
    return new InputFieldKeyStrokeContext(true);
  }

  setTheme(theme: string) {
    this.setProperty('theme', theme);
  }

  _renderTheme() {
    this.editor.setTheme(AceThemes.getInstance().get(this.theme).path);
  }

  setAceMode(mode: string) {
    this.setProperty('aceMode', mode);
  }

  _renderAceMode() {
    this.editor.setOption("mode", AceModes.getInstance().get(this.aceMode).path);
  }

  setTabSize(tabSize: number) {
    this.setProperty('tabSize', tabSize);
  }

  _renderTabSize() {
    this.editor.session.setTabSize(this.tabSize);
  }

  setUseSoftTabs(useSoftTabs: boolean) {
    this.setProperty('useSoftTabs', useSoftTabs);
  }

  _renderUseSoftTabs() {
    this.editor.session.setUseSoftTabs(this.useSoftTabs);
  }

  setUseWrapMode(useWrapMode: boolean) {
    this.setProperty('useWrapMode', useWrapMode);
  }

  _renderUseWrapMode() {
    this.editor.session.setUseWrapMode(this.useWrapMode);
  }

  setShowPrintMargin(showPrintMargin: boolean) {
    this.setProperty('showPrintMargin', showPrintMargin);
  }

  _renderShowPrintMargin() {
    this.editor.setShowPrintMargin(this.showPrintMargin);
  }

  setHighlightActiveLine(highlightActiveLine: boolean) {
    this.setProperty('highlightActiveLine', highlightActiveLine);
  }

  _renderHighlightActiveLine() {
    this.editor.setHighlightActiveLine(this.highlightActiveLine);
  }

  protected override _renderEnabled() {
    super._renderEnabled();
    this.editor.setReadOnly(!this.enabled);
  }

  setSelectOnSetValue(selectOnSetValue: boolean) {
    this.setProperty('selectOnSetValue', selectOnSetValue);
  }

  override _readDisplayText(): string {
    return this.editor.getValue();
  }

  override _render() {
    // Create the container
    this.addContainer(this.$parent, 'ace-field');

    // Add a label
    this.addLabel();

    let $field = this.$parent.appendDiv('ace');
    this.addField($field);

    this.editor = ace.edit($field.get()[0]);

    // value was set before editor was created
    this.editor.setValue(this.displayText);

    // Add other required form field elements
    this.addMandatoryIndicator();
    this.addStatus();
  }

  protected override _renderDisplayText() {
    let displayText = strings.nvl(this.displayText);
    let oldDisplayText = strings.nvl(this.editor.getValue());
    if (this.editor && displayText !== oldDisplayText) {
      this._editorUpdateFromRenderDisplayText = true;
      let oldSelectionRange = this.editor.getSelectionRange();
      this.editor.setValue(displayText,this.selectOnSetValue ? 0 : 1);
      this._updateHasText();
      // Try to keep the current selection for cases where the old and new display
      // text only differ because of the automatic trimming.
      if (oldDisplayText !== displayText) {
        let matches = oldDisplayText.match(StringField.TRIM_REGEXP);
        if (!this.selectOnSetValue && matches && matches[2] === displayText) {
          let oldSelectionStart = this.editor.session.doc.positionToIndex(oldSelectionRange.start, 0);
          let oldSelectionEnd = this.editor.session.doc.positionToIndex(oldSelectionRange.end, 0);
          this.editor.selection.setRange(Range.fromPoints(
            this.editor.session.doc.indexToPosition(Math.max(oldSelectionStart - matches[1].length, 0), 0),
            this.editor.session.doc.indexToPosition(Math.min(oldSelectionEnd - matches[1].length, displayText.length), 0)
          ));
        }
        this._editorUpdateFromRenderDisplayText = false;
      }
    }
  }

  protected selectAll() {
    this.editor.selectAll();
  }

  selectLine(line: number) {
    this.editor.selection.setRange(new ace.Range(line, 0, line, this.editor.session.getLine(line).length));
    return this.editor.getSelectedText();

  }

  selectRange(startRow: number, startCol: number, endRow: number, endCol: number) {
    this.editor.selection.setRange(new ace.Range(startRow, startCol, endRow, endCol));
  }

  clearSelection(): void {
    this.editor.clearSelection();
  }

  getSelectedText(): string {
    return this.editor.getSelectedText();
  }

  protected override _renderProperties() {
    super._renderProperties();
    this._renderTheme();
    this._renderAceMode();
    this._renderHighlightActiveLine();
    this._renderTabSize();
    this._renderUseSoftTabs();
    this._renderUseWrapMode();
    this._renderShowPrintMargin();
  }
}


