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
package io.sxda.scout.addon.ace.client.acefield;

import org.eclipse.scout.rt.client.ui.form.fields.AbstractValueField;
import org.eclipse.scout.rt.platform.annotations.ConfigProperty;
import org.eclipse.scout.rt.platform.classid.ClassId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ClassId("a35fe425-089f-4954-bdcd-cbea26e202bb")
public abstract class AbstractAceField extends AbstractValueField<String> implements IAceField {
  private static final Logger LOG = LoggerFactory.getLogger(AbstractAceField.class);

  public AbstractAceField() {
    super(true);
  }

  @Override
  protected void initConfig() {
    super.initConfig();
    setTheme(getConfiguredTheme());
    setAceMode(getConfiguredAceMode());
    setTabSize(getConfiguredTabSize());
    setUseSoftTabs(getConfiguredUseSoftTabs());
    setShowPrintMargin(getConfiguredShowPrintMargin());
    setUseWrapMode(getConfiguredUseWrapMode());
    setHighlightActiveLine(getConfiguredHighlightActiveLine());
    setSelectOnSetValue(getConfiguredSelectOnSetValue());
  }

  @Override
  @ConfigProperty(ConfigProperty.STRING)
  public void setTheme(String theme) {
    propertySupport.setPropertyString(PROP_THEME, theme);
  }

  @Override
  @ConfigProperty(ConfigProperty.STRING)
  public String getTheme() {
    return propertySupport.getPropertyString(PROP_THEME);
  }

  @ConfigProperty(ConfigProperty.STRING)
  protected String getConfiguredTheme() {
    return AceTheme.TEXTMATE.getConfigTerm();
  }

  @Override
  @ConfigProperty(ConfigProperty.STRING)
  public void setAceMode(String aceMode) {
    propertySupport.setPropertyString(PROP_ACE_MODE, aceMode);
  }

  @Override
  @ConfigProperty(ConfigProperty.STRING)
  public String getAceMode() {
    return propertySupport.getPropertyString(PROP_ACE_MODE);
  }

  @ConfigProperty(ConfigProperty.STRING)
  protected String getConfiguredAceMode() {
    return AceMode.TEXT.getConfigTerm();
  }
  @Override
  @ConfigProperty(ConfigProperty.INTEGER)
  public void setTabSize(int tabSize) {
    propertySupport.setPropertyInt(PROP_TAB_SIZE, tabSize);
  }

  @Override
  @ConfigProperty(ConfigProperty.INTEGER)
  public int getTabSize() {
    return propertySupport.getPropertyInt(PROP_TAB_SIZE);
  }

  @ConfigProperty(ConfigProperty.INTEGER)
  protected int getConfiguredTabSize() {
    return 2;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setUseSoftTabs(boolean useSoftTabs) {
    propertySupport.setPropertyBool(PROP_USE_SOFT_TABS, useSoftTabs);
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public boolean getUseSoftTabs() {
    return propertySupport.getPropertyBool(PROP_USE_SOFT_TABS);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredUseSoftTabs() {
    return true;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setUseWrapMode(boolean useWrapMode) {
    propertySupport.setPropertyBool(PROP_USE_WRAP_MODE, useWrapMode);
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public boolean getUseWrapMode() {
    return propertySupport.getPropertyBool(PROP_USE_WRAP_MODE);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredUseWrapMode() {
    return true;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setShowPrintMargin(boolean showPrintMargin) {
    propertySupport.setPropertyBool(PROP_SHOW_PRINT_MARGIN, showPrintMargin);
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public boolean getShowPrintMargin() {
    return propertySupport.getPropertyBool(PROP_SHOW_PRINT_MARGIN);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredShowPrintMargin() {
    return false;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setHighlightActiveLine(boolean highlightActiveLine) {
    propertySupport.setPropertyBool(PROP_HIGHLIGHT_ACTIVE_LINE, highlightActiveLine);
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public boolean getHighlightActiveLine() {
    return propertySupport.getPropertyBool(PROP_HIGHLIGHT_ACTIVE_LINE);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredHighlightActiveLine() {
    return true;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setSelectOnSetValue(boolean selectOnSetValue) {
    propertySupport.setPropertyBool(PROP_SELECT_ON_SET_VALUE, selectOnSetValue);
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public boolean getSelectOnSetValue() {
    return propertySupport.getPropertyBool(PROP_SELECT_ON_SET_VALUE);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredSelectOnSetValue() {
    return false;
  }
}
