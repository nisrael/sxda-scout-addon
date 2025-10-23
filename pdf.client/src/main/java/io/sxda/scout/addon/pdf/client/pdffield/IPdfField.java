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
package io.sxda.scout.addon.pdf.client.pdffield;

import org.eclipse.scout.rt.client.ui.form.fields.IBasicField;

public interface IPdfField extends IBasicField<String> {
  final String OBJECT_TYPE = "sxda.PdfField";
  String PROP_PDF_SOURCE = "pdfSource";
  String PROP_ZOOM_LEVEL = "zoomLevel";
  String PROP_PAGE_NUMBER = "pageNumber";
  String PROP_SHOW_TOOLBAR = "showToolbar";
  String PROP_SHOW_SIDEBAR = "showSidebar";
  String PROP_ENABLE_PRINT = "enablePrint";
  String PROP_ENABLE_DOWNLOAD = "enableDownload";

  void setPdfSource(String pdfSource);

  String getPdfSource();

  void setZoomLevel(String zoomLevel);

  String getZoomLevel();

  void setPageNumber(int pageNumber);

  int getPageNumber();

  void setShowToolbar(boolean showToolbar);

  boolean getShowToolbar();

  void setShowSidebar(boolean showSidebar);

  boolean getShowSidebar();

  void setEnablePrint(boolean enablePrint);

  boolean getEnablePrint();

  void setEnableDownload(boolean enableDownload);

  boolean getEnableDownload();

  @Override
  IPdfFieldUIFacade getUIFacade();
}
