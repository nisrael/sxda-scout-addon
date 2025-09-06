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
import {BasicField, StringField, strings} from "@eclipse-scout/core";
import {CodeMirrorFieldModel} from "./CodeMirrorFieldModel";
import {CodeMirrorFieldEventMap} from "./CodeMirrorFieldEventMap";
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  KeyBinding,
  keymap,
  lineNumbers,
  ViewUpdate
} from '@codemirror/view';
import {Compartment, EditorSelection, EditorState} from '@codemirror/state';
import {defaultKeymap, history, historyKeymap, indentWithTab} from '@codemirror/commands'
import {CodeMirrorFieldBackspaceKeyStroke} from './CodeMirrorFieldBackspaceKeyStroke';
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  HighlightStyle,
  indentOnInput,
  indentUnit,
  syntaxHighlighting
} from '@codemirror/language';
import {languages} from '@codemirror/language-data';
import {autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap} from '@codemirror/autocomplete';
import {highlightSelectionMatches, searchKeymap} from '@codemirror/search';
import {lintKeymap} from '@codemirror/lint';
import {ThemeList} from "./themes/Themes";

export class CodeMirrorField extends BasicField<string> implements CodeMirrorFieldModel {
  declare model: CodeMirrorFieldModel;
  declare eventMap: CodeMirrorFieldEventMap;
  declare self: CodeMirrorField;

  protected _displayTextUpdateFromListener: boolean;

  protected _editorView: EditorView;
  protected _keymapCompartment: Compartment;
  protected _enabledCompartment: Compartment;
  protected _syntaxHighlightingCompartment: Compartment;
  protected _languageCompartment: Compartment;
  protected _highlightActiveLineCompartment: Compartment;
  protected _closeBracketsCompartment: Compartment;
  protected _lineNumbersCompartment: Compartment;
  protected _highlightActiveLineGutterCompartment: Compartment;
  protected _foldGutterCompartment: Compartment;
  protected _dropCursorCompartment: Compartment;
  protected _allowMultipleSelectionsCompartment: Compartment;
  protected _indentOnInputCompartment: Compartment;
  protected _bracketMatchingCompartment: Compartment;
  protected _autocompletionCompartment: Compartment;
  protected _rectangularSelectionCompartment: Compartment;
  protected _crosshairCursorCompartment: Compartment;
  protected _highlightSelectionMatchesCompartment: Compartment;
  protected _tabSizeCompartment: Compartment;
  protected _highlightSpecialCharsCompartment: Compartment;
  protected _historyCompartment: Compartment;
  protected _drawSelectionCompartment: Compartment;
  protected _lineWrappingCompartment: Compartment;
  protected _themeCompartment: Compartment;

  language: string;
  theme: string;
  highlightActiveLine: boolean;
  syntaxHighlighting: boolean;
  lineNumbers: boolean;
  highlightActiveLineGutter: boolean;
  foldGutter: boolean;
  dropCursor: boolean;
  allowMultipleSelections: boolean;
  indentOnInput: boolean;
  bracketMatching: boolean;
  closeBrackets: boolean;
  autocompletion: boolean;
  rectangularSelection: boolean;
  crosshairCursor: boolean;
  highlightSelectionMatches: boolean;
  tabSize: number;
  highlightSpecialChars: boolean;
  history: boolean;
  drawSelection: boolean;
  foldKeymap: boolean;
  searchKeymap: boolean;
  closeBracketsKeymap: boolean;
  completionKeymap: boolean;
  lintKeymap: boolean;
  defaultKeymap: boolean;
  historyKeymap: boolean;
  indentWithTabKeymap: boolean;
  lineWrapping: boolean;

  constructor() {
    super();
    this.language = 'None';
    this.tabSize = 2;
    this.highlightActiveLine = true;
    this.syntaxHighlighting = true;
    this.indentWithTabKeymap = true;
    this.lineNumbers = true;
    this.highlightActiveLineGutter = true;
    this.foldGutter = true;
    this.dropCursor = true;
    this.allowMultipleSelections = true;
    this.indentOnInput = true;
    this.bracketMatching = true;
    this.closeBrackets = true;
    this.autocompletion = true;
    this.rectangularSelection = true;
    this.crosshairCursor = true;
    this.highlightSelectionMatches = true;
    this.highlightSpecialChars = true;
    this.history = true;
    this.drawSelection = true;
    this.foldKeymap = true;
    this.searchKeymap = true;
    this.closeBracketsKeymap = true;
    this.completionKeymap = true;
    this.lintKeymap = true;
    this.defaultKeymap = true;
    this.historyKeymap = true;
    this.lineWrapping = false;
    this.theme = 'None'

    this._enabledCompartment = new Compartment();
    this._syntaxHighlightingCompartment = new Compartment();
    this._languageCompartment = new Compartment();
    this._highlightActiveLineCompartment = new Compartment();
    this._lineNumbersCompartment = new Compartment();
    this._highlightActiveLineGutterCompartment = new Compartment();
    this._foldGutterCompartment = new Compartment();
    this._dropCursorCompartment = new Compartment();
    this._allowMultipleSelectionsCompartment = new Compartment();
    this._indentOnInputCompartment = new Compartment();
    this._bracketMatchingCompartment = new Compartment();
    this._closeBracketsCompartment = new Compartment();
    this._autocompletionCompartment = new Compartment();
    this._rectangularSelectionCompartment = new Compartment();
    this._crosshairCursorCompartment = new Compartment();
    this._highlightSelectionMatchesCompartment = new Compartment();
    this._tabSizeCompartment = new Compartment();
    this._highlightSpecialCharsCompartment = new Compartment();
    this._historyCompartment = new Compartment();
    this._drawSelectionCompartment = new Compartment();
    this._keymapCompartment = new Compartment();
    this._lineWrappingCompartment = new Compartment();
    this._themeCompartment = new Compartment();
  }

  protected override _initKeyStrokeContext() {
    super._initKeyStrokeContext();

    this.keyStrokeContext.registerKeyStrokes([
      new CodeMirrorFieldBackspaceKeyStroke(this)
    ]);
  }

  override _render() {
    this.addContainer(this.$parent, 'codemirror-field');

    this.addLabel();

    let $field = this.$parent.appendDiv('codemirror');
    this.addField($field);

    let initialEditorState = EditorState.create({
      doc: this.displayText,
      extensions: [
        EditorView.updateListener.of(this.handleViewUpdate),
        this._enabledCompartment.of([]),
        this._keymapCompartment.of([]),
        this._syntaxHighlightingCompartment.of([]),
        this._languageCompartment.of([]),
        this._highlightActiveLineCompartment.of([]),
        this._closeBracketsCompartment.of([]),
        this._lineNumbersCompartment.of([]),
        this._highlightActiveLineGutterCompartment.of([]),
        this._foldGutterCompartment.of([]),
        this._dropCursorCompartment.of([]),
        this._allowMultipleSelectionsCompartment.of([]),
        this._indentOnInputCompartment.of([]),
        this._bracketMatchingCompartment.of([]),
        this._autocompletionCompartment.of([]),
        this._rectangularSelectionCompartment.of([]),
        this._crosshairCursorCompartment.of([]),
        this._highlightSelectionMatchesCompartment.of([]),
        this._tabSizeCompartment.of([]),
        this._highlightSpecialCharsCompartment.of([]),
        this._historyCompartment.of([]),
        this._drawSelectionCompartment.of([]),
        this._lineWrappingCompartment.of([]),
        this._themeCompartment.of([])
      ]
    });

    this._editorView = new EditorView({
      parent: $field.get()[0],
      state: initialEditorState,
    });

    this.addMandatoryIndicator();
    this.addStatus();
  }

  protected handleViewUpdate = (viewUpdate: ViewUpdate) => {
    if (viewUpdate.docChanged) {
      this._displayTextUpdateFromListener = true;
      this.setDisplayText(viewUpdate.state.doc.toString());
      this._displayTextUpdateFromListener = false;
    }
  }

  protected override _renderEnabled() {
    super._renderEnabled();
    this._editorView.dispatch({effects: this._enabledCompartment.reconfigure(EditorState.readOnly.of(!this.enabled))});
  }

  protected override _renderProperties() {
    super._renderProperties();
    this._renderLanguage();
    this._renderTheme();
    this._renderSyntaxHighlighting()
    this._renderHighlightActiveLine();
    this._renderLineNumbers();
    this._renderHighlightActiveLineGutter();
    this._renderFoldGutter();
    this._renderDropCursor();
    this._renderAllowMultipleSelections();
    this._renderIndentOnInput();
    this._renderBracketMatching();
    this._renderCloseBrackets();
    this._renderAutocompletion();
    this._renderRectangularSelection();
    this._renderCrosshairCursor();
    this._renderHighlightSelectionMatches();
    this._renderTabSize();
    this._renderHighlightSpecialChars();
    this._renderHistory();
    this._renderDrawSelection();
    this._renderKeymaps();
    this._renderLineWrapping();
  }

  setSyntaxHighlighting(syntaxHighlighting: boolean) {
    this.setProperty('syntaxHighlighting', syntaxHighlighting);
  }

  getSyntaxHighlighting(): boolean {
    return this.getProperty('syntaxHighlighting');
  }

  protected _renderSyntaxHighlighting() {
    this._editorView.dispatch({effects: this._syntaxHighlightingCompartment.reconfigure(this.syntaxHighlighting ? [syntaxHighlighting(this.getSyntaxHighlightStyle())] : [])});
  }

  setLanguage(language: string) {
    this.setProperty('language', language);
  }

  getLanguage(): string {
    return this.getProperty('language');
  }

  protected async getLanguageExtension(): Promise<any> {
    const languageDescription = languages.find(l => l.name === this.language);
    const extension = languageDescription ? languageDescription.support ? languageDescription.support : await languageDescription.load() : [];
    return Promise.resolve(extension);
  }

  protected async _renderLanguage() {
    this._editorView.dispatch({effects: this._languageCompartment.reconfigure(await this.getLanguageExtension())});
  }

  setTheme(theme: string) {
    this.setProperty('theme', theme);
  }

  getTheme(): string {
    return this.getProperty('theme');
  }

  protected async _renderTheme() {
    this._editorView.dispatch({
        effects: [
          this._themeCompartment.reconfigure(await this.getThemeExtension()),
          this._syntaxHighlightingCompartment.reconfigure(this.syntaxHighlighting ? [syntaxHighlighting(this.getSyntaxHighlightStyle())] : [])
        ]
      }
    );
  }

  protected async getThemeExtension(): Promise<any> {
    const themeDescription = ThemeList.find(l => l.id === this.theme);
    const extension = themeDescription ? themeDescription.extension ? themeDescription.extension : await themeDescription.load() : [];
    return Promise.resolve(extension);
  }

  protected getSyntaxHighlightStyle(): HighlightStyle {
    const themeDescription = ThemeList.find(l => l.id === this.theme);
    return themeDescription && themeDescription.syntaxHighlightStyle ? themeDescription.syntaxHighlightStyle : defaultHighlightStyle;
  }

  protected override _renderDisplayText() {
    if (this.$disabledCopyOverlay) {
      // Changing the value might change the visibility of the scrollbars -> overlay size needs to be adjusted
      this.invalidateLayoutTree(false);
    }
    if (this._displayTextUpdateFromListener) {
      return;
    }
    let displayText = strings.nvl(this.displayText);
    let oldDisplayText = strings.nvl(this._editorView.state.doc.toString());
    if (this._editorView && displayText !== oldDisplayText) {
      let oldSelectionRanges = this._editorView.state.selection.ranges;
      this._editorView.dispatch({
        changes: {
          from: 0,
          to: this._editorView.state.doc.length,
          insert: displayText
        }
      });
      this._updateHasText();
      let matches = oldDisplayText.match(StringField.TRIM_REGEXP);
      if (matches && matches[2] === displayText && oldSelectionRanges.length == 1) {
        let oldSelectionStart = oldSelectionRanges[0].from;
        let oldSelectionEnd = oldSelectionRanges[0].to;
        let newSelectionStart = Math.max(oldSelectionStart - matches[1].length, 0);
        let newSelectionEnd = Math.min(oldSelectionEnd - matches[1].length, displayText.length);
        this._editorView.dispatch({
          selection: EditorSelection.range(newSelectionStart, newSelectionEnd)
        });
      }
    }
  }

  override _readDisplayText(): string {
    return this._editorView.state.doc.toString();
  }

  setHighlightActiveLine(highlightActiveLine: boolean) {
    this.setProperty('highlightActiveLine', highlightActiveLine);
  }

  getHighlightActiveLine(): boolean {
    return this.getProperty('highlightActiveLine');
  }

  protected _renderHighlightActiveLine() {
    this._editorView.dispatch({effects: this._highlightActiveLineCompartment.reconfigure(this.getHighlightActiveLine() ? [highlightActiveLine()] : [])});
  }

  protected buildKeymaps(): KeyBinding[] {
    let keymaps: KeyBinding[] = [];
    if (this.indentWithTabKeymap !== false) {
      keymaps = keymaps.concat(indentWithTab);
    }
    if (this.closeBracketsKeymap !== false) {
      keymaps = keymaps.concat(closeBracketsKeymap);
    }
    if (this.defaultKeymap !== false) {
      keymaps = keymaps.concat(defaultKeymap);
    }
    if (this.searchKeymap !== false) {
      keymaps = keymaps.concat(searchKeymap);
    }
    if (this.historyKeymap !== false) {
      keymaps = keymaps.concat(historyKeymap);
    }
    if (this.foldKeymap !== false) {
      keymaps = keymaps.concat(foldKeymap);
    }
    if (this.completionKeymap !== false) {
      keymaps = keymaps.concat(completionKeymap);
    }
    if (this.lintKeymap !== false) {
      keymaps = keymaps.concat(lintKeymap);
    }
    return keymaps;
  }

  protected _renderKeymaps() {
    this._editorView.dispatch({effects: this._keymapCompartment.reconfigure(keymap.of(this.buildKeymaps()))});
  }

  setIndentWithTabKeymap(indentWithTabKeymap: boolean) {
    this.setProperty('indentWithTabKeymap', indentWithTabKeymap);
  }

  getIndentWithTabKeymap(): boolean {
    return this.getProperty('indentWithTabKeymap');
  }

  _renderIndentWithTabKeymap() {
    this._renderKeymaps();
  }

  setFoldKeymap(foldKeymap: boolean) {
    this.setProperty('foldKeymap', foldKeymap);
  }

  getFoldKeymap(): boolean {
    return this.getProperty('foldKeymap');
  }

  _renderFoldKeymap() {
    this._renderKeymaps();
  }

  setSearchKeymap(searchKeymap: boolean) {
    this.setProperty('searchKeymap', searchKeymap);
  }

  getSearchKeymap(): boolean {
    return this.getProperty('searchKeymap');
  }

  _renderSearchKeymap() {
    this._renderKeymaps();
  }

  setCloseBracketsKeymap(closeBracketsKeymap: boolean) {
    this.setProperty('closeBracketsKeymap', closeBracketsKeymap);
  }

  getCloseBracketsKeymap(): boolean {
    return this.getProperty('closeBracketsKeymap');
  }

  _renderCloseBracketsKeymap() {
    this._renderKeymaps();
  }

  setCompletionKeymap(completionKeymap: boolean) {
    this.setProperty('completionKeymap', completionKeymap);
  }

  getCompletionKeymap(): boolean {
    return this.getProperty('completionKeymap');
  }

  _renderCompletionKeymap() {
    this._renderKeymaps();
  }

  setLintKeymap(lintKeymap: boolean) {
    this.setProperty('lintKeymap', lintKeymap);
  }

  getLintKeymap(): boolean {
    return this.getProperty('lintKeymap');
  }

  _renderLintKeymap() {
    this._renderKeymaps();
  }

  setDefaultKeymap(defaultKeymap: boolean) {
    this.setProperty('defaultKeymap', defaultKeymap);
  }

  getDefaultKeymap(): boolean {
    return this.getProperty('defaultKeymap');
  }

  _renderDefaultKeymap() {
    this._renderKeymaps();
  }

  setHistoryKeymap(historyKeymap: boolean) {
    this.setProperty('historyKeymap', historyKeymap);
  }

  getHistoryKeymap(): boolean {
    return this.getProperty('historyKeymap');
  }

  _renderHistoryKeymap() {
    this._renderKeymaps();
  }

  setCloseBrackets(closeBrackets: boolean) {
    this.setProperty('closeBrackets', closeBrackets);
  }

  getCloseBrackets(): boolean {
    return this.getProperty('closeBrackets');
  }

  _renderCloseBrackets() {
    this._editorView.dispatch({effects: this._closeBracketsCompartment.reconfigure(this.closeBrackets ? [closeBrackets()] : [])});
  }

  setTabSize(tabSize: number) {
    this.setProperty('tabSize', tabSize);
  }

  getTabSize(): number {
    return this.getProperty('tabSize');
  }

  _renderTabSize() {
    this._editorView.dispatch({effects: this._tabSizeCompartment.reconfigure(indentUnit.of(' '.repeat(this.tabSize)))});
  }

  setHighlightSpecialChars(highlightSpecialChars: boolean) {
    this.setProperty('highlightSpecialChars', highlightSpecialChars);
  }

  getHighlightSpecialChars(): boolean {
    return this.getProperty('highlightSpecialChars');
  }

  _renderHighlightSpecialChars() {
    this._editorView.dispatch({effects: this._highlightSpecialCharsCompartment.reconfigure(this.highlightSpecialChars ? [highlightSpecialChars()] : [])});
  }

  setHistory(history: boolean) {
    this.setProperty('history', history);
  }

  getHistory(): boolean {
    return this.getProperty('history');
  }

  _renderHistory() {
    this._editorView.dispatch({effects: this._historyCompartment.reconfigure(this.history ? [history()] : [])});
  }

  setDrawSelection(drawSelection: boolean) {
    this.setProperty('drawSelection', drawSelection);
  }

  getDrawSelection(): boolean {
    return this.getProperty('drawSelection');
  }

  _renderDrawSelection() {
    this._editorView.dispatch({effects: this._drawSelectionCompartment.reconfigure(this.drawSelection ? [drawSelection()] : [])});
  }

  setHighlightSelectionMatches(highlightSelectionMatches: boolean) {
    this.setProperty('highlightSelectionMatches', highlightSelectionMatches);
  }

  getHighlightSelectionMatches(): boolean {
    return this.getProperty('highlightSelectionMatches');
  }

  _renderHighlightSelectionMatches() {
    this._editorView.dispatch({effects: this._highlightSelectionMatchesCompartment.reconfigure(this.highlightSelectionMatches ? [highlightSelectionMatches()] : [])});
  }

  setCrosshairCursor(crosshairCursor: boolean) {
    this.setProperty('crosshairCursor', crosshairCursor);
  }

  getCrosshairCursor(): boolean {
    return this.getProperty('crosshairCursor');
  }

  _renderCrosshairCursor() {
    this._editorView.dispatch({effects: this._crosshairCursorCompartment.reconfigure(this.crosshairCursor ? [crosshairCursor()] : [])});
  }

  setRectangularSelection(rectangularSelection: boolean) {
    this.setProperty('rectangularSelection', rectangularSelection);
  }

  getRectangularSelection(): boolean {
    return this.getProperty('rectangularSelection');
  }

  _renderRectangularSelection() {
    this._editorView.dispatch({effects: this._rectangularSelectionCompartment.reconfigure(this.rectangularSelection ? [EditorState.allowMultipleSelections.of(true)] : [])});
  }

  setAutocompletion(autocompletion: boolean) {
    this.setProperty('autocompletion', autocompletion);
  }

  getAutocompletion(): boolean {
    return this.getProperty('autocompletion');
  }

  _renderAutocompletion() {
    this._editorView.dispatch({effects: this._autocompletionCompartment.reconfigure(this.autocompletion ? [autocompletion()] : [])});
  }

  setBracketMatching(bracketMatching: boolean) {
    this.setProperty('bracketMatching', bracketMatching);
  }

  getBracketMatching(): boolean {
    return this.getProperty('bracketMatching');
  }

  _renderBracketMatching() {
    this._editorView.dispatch({effects: this._bracketMatchingCompartment.reconfigure(this.bracketMatching ? [bracketMatching()] : [])});
  }

  setIndentOnInput(indentOnInput: boolean) {
    this.setProperty('indentOnInput', indentOnInput);
  }

  getIndentOnInput(): boolean {
    return this.getProperty('indentOnInput');
  }

  _renderIndentOnInput() {
    this._editorView.dispatch({effects: this._indentOnInputCompartment.reconfigure(this.indentOnInput ? [indentOnInput()] : [])});
  }

  setAllowMultipleSelections(allowMultipleSelections: boolean) {
    this.setProperty('allowMultipleSelections', allowMultipleSelections);
  }

  getAllowMultipleSelections(): boolean {
    return this.getProperty('allowMultipleSelections');
  }

  protected _renderAllowMultipleSelections() {
    this._editorView.dispatch({effects: this._allowMultipleSelectionsCompartment.reconfigure(this.allowMultipleSelections ? [EditorState.allowMultipleSelections.of(true)] : [])});
  }

  setDropCursor(dropCursor: boolean) {
    this.setProperty('dropCursor', dropCursor);
  }

  getDropCursor(): boolean {
    return this.getProperty('dropCursor');
  }

  protected _renderDropCursor() {
    this._editorView.dispatch({effects: this._dropCursorCompartment.reconfigure(this.dropCursor ? [dropCursor()] : [])});
  }

  setFoldGutter(foldGutter: boolean) {
    this.setProperty('foldGutter', foldGutter);
  }

  getFoldGutter(): boolean {
    return this.getProperty('foldGutter');
  }

  protected _renderFoldGutter() {
    this._editorView.dispatch({effects: this._foldGutterCompartment.reconfigure(this.foldGutter ? [foldGutter()] : [])});
  }

  setHighlightActiveLineGutter(highlightActiveLineGutter: boolean) {
    this.setProperty('highlightActiveLineGutter', highlightActiveLineGutter);
  }

  getHighlightActiveLineGutter(): boolean {
    return this.getProperty('highlightActiveLineGutter');
  }

  protected _renderHighlightActiveLineGutter() {
    this._editorView.dispatch({effects: this._highlightActiveLineGutterCompartment.reconfigure(this.highlightActiveLineGutter ? [highlightActiveLineGutter()] : [])});
  }

  setLineNumbers(lineNumbers: boolean) {
    this.setProperty('lineNumbers', lineNumbers);
  }

  getLineNumbers(): boolean {
    return this.getProperty('lineNumbers');
  }

  protected _renderLineNumbers() {
    this._editorView.dispatch({effects: this._lineNumbersCompartment.reconfigure(this.lineNumbers ? [lineNumbers()] : [])});
  }

  setLineWrapping(lineWrapping: boolean) {
    this.setProperty('lineWrapping', lineWrapping);
  }

  getLineWrapping(): boolean {
    return this.getProperty('lineWrapping');
  }

  protected _renderLineWrapping() {
    this._editorView.dispatch({effects: this._lineWrappingCompartment.reconfigure(this.lineWrapping ? [EditorView.lineWrapping] : [])});
  }
}
