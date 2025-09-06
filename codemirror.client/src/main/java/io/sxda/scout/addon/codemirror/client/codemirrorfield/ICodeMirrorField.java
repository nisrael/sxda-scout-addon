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
package io.sxda.scout.addon.codemirror.client.codemirrorfield;

import org.eclipse.scout.rt.client.ui.form.fields.IBasicField;

public interface ICodeMirrorField extends IBasicField<String> {
  String OBJECT_TYPE = "sxda.CodeMirrorField";

  String PROP_LANGUAGE="language";
  String PROP_THEME="theme";
  String PROP_TAB_SIZE="tabSize";
  String PROP_HIGHLIGHT_ACTIVE_LINE="highlightActiveLine";
  String PROP_SYNTAX_HIGHLIGHTING="syntaxHighlighting";
  String PROP_LINE_NUMBERS="lineNumbers";
  String PROP_HIGHLIGHT_ACTIVE_LINE_GUTTER="highlightActiveLineGutter";
  String PROP_FOLD_GUTTER="foldGutter";
  String PROP_DROP_CURSOR="dropCursor";
  String PROP_ALLOW_MULTIPLE_SELECTIONS="allowMultipleSelections";
  String PROP_INDENT_ON_INPUT="indentOnInput";
  String PROP_BRACKET_MATCHING="bracketMatching";
  String PROP_CLOSE_BRACKETS="closeBrackets";
  String PROP_AUTO_COMPLETION="autocompletion";
  String PROP_RECTANGULAR_SELECTION="rectangularSelection";
  String PROP_CROSSHAIR_CURSOR="crosshairCursor";
  String PROP_HIGHLIGHT_SELECTION_MATCHES="highlightSelectionMatches";
  String PROP_CLOSE_BRACKETS_KEYMAP="closeBracketsKeymap";
  String PROP_SEARCH_KEYMAP="searchKeymap";
  String PROP_FOLD_KEYMAP="foldKeymap";
  String PROP_COMPLETION_KEYMAP="completionKeymap";
  String PROP_LINT_KEYMAP="lintKeymap";
  String PROP_HIGHLIGHT_SPECIAL_CHARS="highlightSpecialChars";
  String PROP_HISTORY="history";
  String PROP_DRAW_SELECTION="drawSelection";
  String PROP_DEFAULT_KEYMAP="defaultKeymap";
  String PROP_HISTORY_KEYMAP="historyKeymap";
  String PROP_INDENT_WITH_TAB_KEYMAP="indentWithTabKeymap";
  String PROP_LINE_WRAPPING="lineWrapping";


  void setLanguage(String language);

  String getLanguage();

  void setTheme(String theme);

  String getTheme();

  void setTabSize(int tabSize);

  int getTabSize();

  void setHighlightActiveLine(boolean highlightActiveLine);

  boolean getHighlightActiveLine();

  void setSyntaxHighlighting(boolean syntaxHighlighting);

  boolean getSyntaxHighlighting();

  void setLineNumbers(boolean lineNumbers);

  boolean getLineNumbers();

  void setHighlightActiveLineGutter(boolean highlightActiveLineGutter);

  boolean getHighlightActiveLineGutter();

  void setFoldGutter(boolean foldGutter);

  boolean getFoldGutter();

  void setDropCursor(boolean dropCursor);

  boolean getDropCursor();

  void setAllowMultipleSelections(boolean allowMultipleSelections);

  boolean getAllowMultipleSelections();

  void setIndentOnInput(boolean indentOnInput);

  boolean getIndentOnInput();

  void setBracketMatching(boolean bracketMatching);

  boolean getBracketMatching();

  void setCloseBrackets(boolean closeBrackets);

  boolean getCloseBrackets();

  void setAutocompletion(boolean autocompletion);

  boolean getAutocompletion();

  void setRectangularSelection(boolean rectangularSelection);

  boolean getRectangularSelection();

  void setCrosshairCursor(boolean crosshairCursor);

  boolean getCrosshairCursor();

  void setHighlightSelectionMatches(boolean highlightSelectionMatches);

  boolean getHighlightSelectionMatches();

  void setCloseBracketsKeymap(boolean closeBracketsKeymap);

  boolean getCloseBracketsKeymap();

  void setSearchKeymap(boolean searchKeymap);

  boolean getSearchKeymap();

  void setFoldKeymap(boolean foldKeymap);

  boolean getFoldKeymap();

  void setCompletionKeymap(boolean completionKeymap);

  boolean getCompletionKeymap();

  void setLintKeymap(boolean lintKeymap);

  boolean getLintKeymap();

  void setHighlightSpecialChars(boolean highlightSpecialChars);

  boolean getHighlightSpecialChars();

  void setHistory(boolean history);

  boolean getHistory();

  void setDrawSelection(boolean drawSelection);

  boolean getDrawSelection();

  void setDefaultKeymap(boolean defaultKeymap);

  boolean getDefaultKeymap();

  void setHistoryKeymap(boolean historyKeymap);

  boolean getHistoryKeymap();

  void setIndentWithTabKeymap(boolean indentWithTabKeymap);

  boolean getIndentWithTabKeymap();

  void setLineWrapping(boolean lineWrapping);

  boolean getLineWrapping();

  @Override
  ICodeMirrorFieldUIFacade getUIFacade();
}
