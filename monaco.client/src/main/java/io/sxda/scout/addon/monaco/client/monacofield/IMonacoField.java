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
package io.sxda.scout.addon.monaco.client.monacofield;

import org.eclipse.scout.rt.client.ui.form.fields.IBasicField;

public interface IMonacoField extends IBasicField<String> {
  String OBJECT_TYPE = "sxda.MonacoField";

  String PROP_LANGUAGE = "language";
  String PROP_THEME = "theme";
  String PROP_LINE_NUMBERS = "lineNumbers";
  String PROP_MINIMAP = "minimap";
  String PROP_WORD_WRAP = "wordWrap";
  String PROP_FONT_SIZE = "fontSize";
  String PROP_TAB_SIZE = "tabSize";
  String PROP_INSERT_SPACES = "insertSpaces";
  String PROP_AUTOMATIC_LAYOUT = "automaticLayout";
  String PROP_FOLDING = "folding";
  String PROP_RENDER_WHITESPACE = "renderWhitespace";
  String PROP_SCROLL_BEYOND_LAST_LINE = "scrollBeyondLastLine";
  String PROP_FORMAT_ON_PASTE = "formatOnPaste";
  String PROP_FORMAT_ON_TYPE = "formatOnType";

  void setLanguage(String language);

  String getLanguage();

  void setTheme(String theme);

  String getTheme();

  void setLineNumbers(boolean lineNumbers);

  boolean getLineNumbers();

  void setMinimap(boolean minimap);

  boolean getMinimap();

  void setWordWrap(boolean wordWrap);

  boolean getWordWrap();

  void setFontSize(int fontSize);

  int getFontSize();

  void setTabSize(int tabSize);

  int getTabSize();

  void setInsertSpaces(boolean insertSpaces);

  boolean getInsertSpaces();

  void setAutomaticLayout(boolean automaticLayout);

  boolean getAutomaticLayout();

  void setFolding(boolean folding);

  boolean getFolding();

  void setRenderWhitespace(String renderWhitespace);

  String getRenderWhitespace();

  void setScrollBeyondLastLine(boolean scrollBeyondLastLine);

  boolean getScrollBeyondLastLine();

  void setFormatOnPaste(boolean formatOnPaste);

  boolean getFormatOnPaste();

  void setFormatOnType(boolean formatOnType);

  boolean getFormatOnType();

  @Override
  IMonacoFieldUIFacade getUIFacade();
}
