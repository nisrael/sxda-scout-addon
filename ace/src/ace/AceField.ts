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
import {InitModelOf, InputFieldKeyStrokeContext, ValueField} from '@eclipse-scout/core';
import {AceFieldModel} from "./AceFieldModel";
import {AceFieldEventMap} from "./AceFieldEventMap";
import * as ace from "ace-code";
import {AceThemes} from "./themes/AceThemes";
import {AceModes} from "./modes/AceModes";
import {AceFieldEnterKeyStroke} from "./AceFieldEnterKeyStroke";

export class AceField extends ValueField<string> implements AceFieldModel {
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

  protected _editorUpdateFromSetValue: boolean;

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
    super._readDisplayText();
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
    this.editor.setValue(this.value)

    let self = this;

    this.editor.session.on("change", function () {
      if (!self._editorUpdateFromSetValue) {
        self.setValue(self.editor.getValue());
      }
    });

    // Add other required form field elements
    this.addMandatoryIndicator();
    this.addStatus();
  }

  protected override _setValue(value: string) {
    super._setValue(value);
    if (this.editor && this.editor.getValue() !== value) {
      this._editorUpdateFromSetValue = true;
      this.editor.setValue(value, this.selectOnSetValue ? 0 : 1);
      this._editorUpdateFromSetValue = false;
    }
  }

  protected selectAll() {
    this.editor.selectAll();
  }

  selectLine(line: number) {
    this.editor.selection.selectLine()
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


