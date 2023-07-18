/*
 * Copyright (c) 2023 BSI Business Systems Integration AG
 * Copyright (c) 2023 Nils Israel
 *
 * This program is based on work from the Eclipse Scout Project
 * https://www.eclipse.org/scout/ and provides an extension for it.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import {InitModelOf, ValueField} from '@eclipse-scout/core';
import {AceFieldModel} from "./AceFieldModel";
import {AceFieldEventMap} from "./AceFieldEventMap";
import * as ace from "ace-builds";
import 'ace-builds/esm-resolver';

export class AceField extends ValueField<string> implements AceFieldModel {
  declare model: AceFieldModel;
  declare eventMap: AceFieldEventMap;
  declare self: AceField;

  editor: ace.Ace.Editor;
  theme: string;
  tabSize: number;
  useSoftTabs: boolean;
  useWrapMode: boolean;
  showPrintMargin: boolean;
  readOnly: boolean;
  highlightActiveLine: boolean;


  constructor() {
    super();
    this.theme = 'textmate';
    this.tabSize = 2;
    this.useSoftTabs = true;
    this.useWrapMode = false;
    this.showPrintMargin = false;
    this.readOnly = false;
    this.highlightActiveLine = true;
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);
  }

  setTheme(theme: string) {
    this.setProperty('theme', theme);
  }

  _setTheme(theme: string) {
    this.theme = theme;
  }

  getTheme(): string {
    return this.theme;
  }

  _renderTheme() {
    this.editor.setTheme("ace/theme/" + this.theme);
  }

  setTabSize(tabSize: number) {
    this.setProperty('tabSize', tabSize);
  }

  _setTabSize(tabSize: number) {
    this.tabSize = tabSize;
  }

  getTabSize(): number {
    return this.tabSize;
  }

  _renderTabSize() {
    this.editor.session.setTabSize(this.tabSize);
  }

  setUseSoftTabs(useSoftTabs: boolean) {
    this.setProperty('useSoftTabs', useSoftTabs);
  }

  _setUseSoftTabs(useSoftTabs: boolean) {
    this.useSoftTabs = useSoftTabs;
  }

  getUseSoftTabs(): boolean {
    return this.useSoftTabs;
  }

  _renderUseSoftTabs() {
    this.editor.session.setUseSoftTabs(this.useSoftTabs);
  }

  setUseWrapMode(useWrapMode: boolean) {
    this.setProperty('useWrapMode', useWrapMode);
  }

  _setUseWrapMode(useWrapMode: boolean) {
    this.useWrapMode = useWrapMode;
  }

  getUseWrapMode(): boolean {
    return this.useWrapMode;
  }

  _renderUseWrapMode() {
    this.editor.session.setUseWrapMode(this.useWrapMode);
  }

  setShowPrintMargin(showPrintMargin: boolean) {
    this.setProperty('showPrintMargin', showPrintMargin);
  }

  _setShowPrintMargin(showPrintMargin: boolean) {
    this.showPrintMargin = showPrintMargin;
  }

  getShowPrintMargin(): boolean {
    return this.showPrintMargin;
  }

  _renderShowPrintMargin() {
    this.editor.setShowPrintMargin(this.showPrintMargin);
  }

  setHighlightActiveLine(highlightActiveLine: boolean) {
    this.setProperty('highlightActiveLine', highlightActiveLine);
  }

  _setHighlightActiveLine(highlightActiveLine: boolean) {
    this.highlightActiveLine = highlightActiveLine;
  }

  getHighlightActiveLine(): boolean {
    return this.highlightActiveLine;
  }

  _renderHighlightActiveLine() {
    this.editor.setHighlightActiveLine(this.highlightActiveLine);
  }

  setReadOnly(readOnly: boolean) {
      this.setProperty('readOnly', readOnly);
    }

    _setReadOnly(readOnly: boolean){
      this.readOnly = readOnly;
    }

    getReadOnly(): boolean{
      return this.readOnly;
    }

    _renderReadOnly(){
      this.editor.setReadOnly(this.readOnly);
    }

  override _renderDisplayText() {
    super._renderDisplayText();
  }


  override _render() {
    // Create the container
    this.addContainer(this.$parent, 'ace-field');

    // Add a label
    this.addLabel();

    let $field = this.$parent.appendDiv('ace');
    this.addField($field);


    this.editor = ace.edit($field.get()[0]);

    // Add other required form field elements
    this.addMandatoryIndicator();
    this.addStatus();
  }


  protected override _renderProperties() {
    super._renderProperties();
    this._renderTheme();
    this._renderReadOnly();
    this._renderHighlightActiveLine();
    this._renderTabSize();
    this._renderUseSoftTabs();
    this._renderUseWrapMode();
    this._renderShowPrintMargin();
  }
}
