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

import org.eclipse.scout.rt.client.ModelContextProxy;
import org.eclipse.scout.rt.client.ui.form.fields.AbstractBasicField;
import org.eclipse.scout.rt.platform.BEANS;
import org.eclipse.scout.rt.platform.annotations.ConfigProperty;
import org.eclipse.scout.rt.platform.classid.ClassId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ClassId("b45fe425-089f-4954-bdcd-cbea26e202bb")
public abstract class AbstractPdfField extends AbstractBasicField<String> implements IPdfField {
  private static final Logger LOG = LoggerFactory.getLogger(AbstractPdfField.class);
  private IPdfFieldUIFacade m_uiFacade;

  public AbstractPdfField() {
    super(true);
  }

  @Override
  protected void initConfig() {
    m_uiFacade = BEANS.get(ModelContextProxy.class).newProxy(new AbstractPdfField.P_UIFacade(), ModelContextProxy.ModelContext.copyCurrent());
    super.initConfig();
    setPdfSource(getConfiguredPdfSource());
    setZoomLevel(getConfiguredZoomLevel());
    setPageNumber(getConfiguredPageNumber());
    setShowToolbar(getConfiguredShowToolbar());
    setShowSidebar(getConfiguredShowSidebar());
    setEnablePrint(getConfiguredEnablePrint());
    setEnableDownload(getConfiguredEnableDownload());
  }

  @Override
  @ConfigProperty(ConfigProperty.STRING)
  public void setPdfSource(String pdfSource) {
    propertySupport.setPropertyString(PROP_PDF_SOURCE, pdfSource);
  }

  @Override
  @ConfigProperty(ConfigProperty.STRING)
  public String getPdfSource() {
    return propertySupport.getPropertyString(PROP_PDF_SOURCE);
  }

  @ConfigProperty(ConfigProperty.STRING)
  protected String getConfiguredPdfSource() {
    return null;
  }

  @Override
  @ConfigProperty(ConfigProperty.STRING)
  public void setZoomLevel(String zoomLevel) {
    propertySupport.setPropertyString(PROP_ZOOM_LEVEL, zoomLevel);
  }

  @Override
  @ConfigProperty(ConfigProperty.STRING)
  public String getZoomLevel() {
    return propertySupport.getPropertyString(PROP_ZOOM_LEVEL);
  }

  @ConfigProperty(ConfigProperty.STRING)
  protected String getConfiguredZoomLevel() {
    return "auto";
  }

  @Override
  @ConfigProperty(ConfigProperty.INTEGER)
  public void setPageNumber(int pageNumber) {
    propertySupport.setPropertyInt(PROP_PAGE_NUMBER, pageNumber);
  }

  @Override
  @ConfigProperty(ConfigProperty.INTEGER)
  public int getPageNumber() {
    return propertySupport.getPropertyInt(PROP_PAGE_NUMBER);
  }

  @ConfigProperty(ConfigProperty.INTEGER)
  protected int getConfiguredPageNumber() {
    return 1;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setShowToolbar(boolean showToolbar) {
    propertySupport.setPropertyBool(PROP_SHOW_TOOLBAR, showToolbar);
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public boolean getShowToolbar() {
    return propertySupport.getPropertyBool(PROP_SHOW_TOOLBAR);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredShowToolbar() {
    return true;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setShowSidebar(boolean showSidebar) {
    propertySupport.setPropertyBool(PROP_SHOW_SIDEBAR, showSidebar);
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public boolean getShowSidebar() {
    return propertySupport.getPropertyBool(PROP_SHOW_SIDEBAR);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredShowSidebar() {
    return false;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setEnablePrint(boolean enablePrint) {
    propertySupport.setPropertyBool(PROP_ENABLE_PRINT, enablePrint);
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public boolean getEnablePrint() {
    return propertySupport.getPropertyBool(PROP_ENABLE_PRINT);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredEnablePrint() {
    return true;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setEnableDownload(boolean enableDownload) {
    propertySupport.setPropertyBool(PROP_ENABLE_DOWNLOAD, enableDownload);
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public boolean getEnableDownload() {
    return propertySupport.getPropertyBool(PROP_ENABLE_DOWNLOAD);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredEnableDownload() {
    return true;
  }

  @Override
  protected String parseValueInternal(String text) {
    if (text != null && text.isEmpty()) {
      text = null;
    }
    return text;
  }

  @Override
  public IPdfFieldUIFacade getUIFacade() {
    return m_uiFacade;
  }

  protected class P_UIFacade extends AbstractBasicField.P_UIFacade implements IPdfFieldUIFacade {
  }
}
