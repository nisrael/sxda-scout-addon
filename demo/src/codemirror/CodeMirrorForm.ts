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
import {Form, FormModel, InitModelOf, models} from '@eclipse-scout/core';
import {CodeMirrorFormWidgetMap} from '../index';
import CodeMirrorFormModel from "./CodeMirrorFormModel";

export class CodeMirrorForm extends Form {
  declare widgetMap: CodeMirrorFormWidgetMap;

  constructor() {
    super();
  }

  protected override _jsonModel(): FormModel {
    return models.get(CodeMirrorFormModel);
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);

    let codeMirror = this.widget('CodeMirrorField');

    let enableField = this.widget('EnableField');
    enableField.setValue(codeMirror.enabled);
    enableField.on('propertyChange:value', event => codeMirror.setEnabled(event.newValue));

    let setValueField = this.widget('SetValueField');
    let setValueButton = this.widget('SetValueButton');
    setValueButton.on('click', event => codeMirror.setValue(setValueField.value));

    let highlightActiveLineField = this.widget('HighlightActiveLineField');
    highlightActiveLineField.setValue(codeMirror.getHighlightActiveLine());
    highlightActiveLineField.on('propertyChange:value', event => codeMirror.setHighlightActiveLine(event.newValue));

    let syntaxHighlightingField = this.widget('SyntaxHighlightingField');
    syntaxHighlightingField.setValue(codeMirror.getSyntaxHighlighting());
    syntaxHighlightingField.on('propertyChange:value', event => codeMirror.setSyntaxHighlighting(event.newValue));

    let languageField = this.widget('LanguageField');
    languageField.setValue(codeMirror.language);
    languageField.on('propertyChange:value', event => {
      if (event.newValue){
        codeMirror.setLanguage(event.newValue);
      }
    });

    let themeField = this.widget('ThemeField');
    themeField.setValue(codeMirror.theme);
    themeField.on('propertyChange:value', event => {
      if (event.newValue){
        codeMirror.setTheme(event.newValue);
      }
    });

    let tabSizeField = this.widget('TabSizeField');
    tabSizeField.setValue(codeMirror.getTabSize());
    tabSizeField.on('propertyChange:value', event => codeMirror.setTabSize(event.newValue));

    let lineNumbersField = this.widget('LineNumbersField');
    lineNumbersField.setValue(codeMirror.getLineNumbers());
    lineNumbersField.on('propertyChange:value', event => codeMirror.setLineNumbers(event.newValue));

    let highlightActiveLineGutterField = this.widget('HighlightActiveLineGutterField');
    highlightActiveLineGutterField.setValue(codeMirror.getHighlightActiveLineGutter());
    highlightActiveLineGutterField.on('propertyChange:value', event => codeMirror.setHighlightActiveLineGutter(event.newValue));

    let foldGutterField = this.widget('FoldGutterField');
    foldGutterField.setValue(codeMirror.getFoldGutter());
    foldGutterField.on('propertyChange:value', event => codeMirror.setFoldGutter(event.newValue));

    let dropCursorField = this.widget('DropCursorField');
    dropCursorField.setValue(codeMirror.getDropCursor());
    dropCursorField.on('propertyChange:value', event => codeMirror.setDropCursor(event.newValue));

    let allowMultipleSelectionsField = this.widget('AllowMultipleSelectionsField');
    allowMultipleSelectionsField.setValue(codeMirror.getAllowMultipleSelections());
    allowMultipleSelectionsField.on('propertyChange:value', event => codeMirror.setAllowMultipleSelections(event.newValue));

    let indentOnInputField = this.widget('IndentOnInputField');
    indentOnInputField.setValue(codeMirror.getIndentOnInput());
    indentOnInputField.on('propertyChange:value', event => codeMirror.setIndentOnInput(event.newValue));

    let bracketMatchingField = this.widget('BracketMatchingField');
    bracketMatchingField.setValue(codeMirror.getBracketMatching());
    bracketMatchingField.on('propertyChange:value', event => codeMirror.setBracketMatching(event.newValue));

    let closeBracketsField = this.widget('CloseBracketsField');
    closeBracketsField.setValue(codeMirror.getCloseBrackets());
    closeBracketsField.on('propertyChange:value', event => codeMirror.setCloseBrackets(event.newValue));

    let autocompletionField = this.widget('AutocompletionField');
    autocompletionField.setValue(codeMirror.getAutocompletion());
    autocompletionField.on('propertyChange:value', event => codeMirror.setAutocompletion(event.newValue));

    let rectangularSelectionField = this.widget('RectangularSelectionField');
    rectangularSelectionField.setValue(codeMirror.getRectangularSelection());
    rectangularSelectionField.on('propertyChange:value', event => codeMirror.setRectangularSelection(event.newValue));

    let crosshairCursorField = this.widget('CrosshairCursorField');
    crosshairCursorField.setValue(codeMirror.getCrosshairCursor());
    crosshairCursorField.on('propertyChange:value', event => codeMirror.setCrosshairCursor(event.newValue));

    let highlightSelectionMatchesField = this.widget('HighlightSelectionMatchesField');
    highlightSelectionMatchesField.setValue(codeMirror.getHighlightSelectionMatches());
    highlightSelectionMatchesField.on('propertyChange:value', event => codeMirror.setHighlightSelectionMatches(event.newValue));

    let highlightSpecialCharsField = this.widget('HighlightSpecialCharsField');
    highlightSpecialCharsField.setValue(codeMirror.getHighlightSpecialChars());
    highlightSpecialCharsField.on('propertyChange:value', event => codeMirror.setHighlightSpecialChars(event.newValue));

    let historyField = this.widget('HistoryField');
    historyField.setValue(codeMirror.getHistory());
    historyField.on('propertyChange:value', event => codeMirror.setHistory(event.newValue));

    let drawSelectionField = this.widget('DrawSelectionField');
    drawSelectionField.setValue(codeMirror.getDrawSelection());
    drawSelectionField.on('propertyChange:value', event => codeMirror.setDrawSelection(event.newValue));

    let foldKeymapField = this.widget('FoldKeymapField');
    foldKeymapField.setValue(codeMirror.getFoldKeymap());
    foldKeymapField.on('propertyChange:value', event => codeMirror.setFoldKeymap(event.newValue));

    let searchKeymapField = this.widget('SearchKeymapField');
    searchKeymapField.setValue(codeMirror.getSearchKeymap());
    searchKeymapField.on('propertyChange:value', event => codeMirror.setSearchKeymap(event.newValue));

    let closeBracketsKeymapField = this.widget('CloseBracketsKeymapField');
    closeBracketsKeymapField.setValue(codeMirror.getCloseBracketsKeymap());
    closeBracketsKeymapField.on('propertyChange:value', event => codeMirror.setCloseBracketsKeymap(event.newValue));

    let completionKeymapField = this.widget('CompletionKeymapField');
    completionKeymapField.setValue(codeMirror.getCompletionKeymap());
    completionKeymapField.on('propertyChange:value', event => codeMirror.setCompletionKeymap(event.newValue));

    let lintKeymapField = this.widget('LintKeymapField');
    lintKeymapField.setValue(codeMirror.getLintKeymap());
    lintKeymapField.on('propertyChange:value', event => codeMirror.setLintKeymap(event.newValue));

    let defaultKeymapField = this.widget('DefaultKeymapField');
    defaultKeymapField.setValue(codeMirror.getDefaultKeymap());
    defaultKeymapField.on('propertyChange:value', event => codeMirror.setDefaultKeymap(event.newValue));

    let historyKeymapField = this.widget('HistoryKeymapField');
    historyKeymapField.setValue(codeMirror.getHistoryKeymap());
    historyKeymapField.on('propertyChange:value', event => codeMirror.setHistoryKeymap(event.newValue));

    let indentWithTabKeymapField = this.widget('IndentWithTabKeymapField');
    indentWithTabKeymapField.setValue(codeMirror.getIndentWithTabKeymap());
    indentWithTabKeymapField.on('propertyChange:value', event => codeMirror.setIndentWithTabKeymap(event.newValue));

    let lineWrappingField = this.widget('LineWrappingField');
    lineWrappingField.setValue(codeMirror.getLineWrapping());
    lineWrappingField.on('propertyChange:value', event => codeMirror.setLineWrapping(event.newValue));

    this.widget('EventsTab').setField(codeMirror);
  }
}
