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
package io.sxda.scout.addon.ace.client.acefield;

import org.eclipse.scout.rt.client.ui.form.fields.IValueField;

public interface IAceField extends IValueField<String> {
  final String OBJECT_TYPE = "sxda.AceField";
  String PROP_THEME = "theme";
  String PROP_TAB_SIZE = "tabSize";
  String PROP_USE_SOFT_TABS = "useSoftTabs";
  String PROP_USE_WRAP_MODE = "useWrapMode";
  String PROP_SHOW_PRINT_MARGIN = "showPrintMargin";
  String PROP_READ_ONLY = "readOnly";
  String PROP_HIGHLIGHT_ACTIVE_LINE = "highlightActiveLine";

  void setTheme(String theme);

  String getTheme();

  void setTabSize(int tabSize);

  int getTabSize();

  void setUseSoftTabs(boolean useSoftTabs);
  boolean getUseSoftTabs();

  void setUseWrapMode(boolean useWrapMode);
  boolean getUseWrapMode();

  void setShowPrintMargin(boolean showPrintMargin);
  boolean getShowPrintMargin();

  void setReadOnly(boolean readOnly);
  boolean getReadOnly();

  void setHighlightActiveLine(boolean highlightActiveLine);
  boolean getHighlightActiveLine();
}
