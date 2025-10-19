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

import org.eclipse.scout.rt.client.ModelContextProxy;
import org.eclipse.scout.rt.client.ui.form.fields.AbstractBasicField;
import org.eclipse.scout.rt.platform.BEANS;
import org.eclipse.scout.rt.platform.annotations.ConfigProperty;
import org.eclipse.scout.rt.platform.classid.ClassId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ClassId("a7c8e5d9-1f4b-4a2e-9c3d-7e8f6b1a5d4c")
public abstract class AbstractMonacoField extends AbstractBasicField<String> implements IMonacoField {
  private static final Logger LOG = LoggerFactory.getLogger(AbstractMonacoField.class);
  private IMonacoFieldUIFacade m_uiFacade;

  public AbstractMonacoField() {
    super(true);
  }

  @Override
  protected void initConfig() {
    m_uiFacade = BEANS.get(ModelContextProxy.class).newProxy(new P_UIFacade(), ModelContextProxy.ModelContext.copyCurrent());
    super.initConfig();
    setLanguage(getConfiguredLanguage());
    setTheme(getConfiguredTheme());
    setLineNumbers(getConfiguredLineNumbers());
    setMinimap(getConfiguredMinimap());
    setWordWrap(getConfiguredWordWrap());
    setFontSize(getConfiguredFontSize());
    setTabSize(getConfiguredTabSize());
    setInsertSpaces(getConfiguredInsertSpaces());
    setAutomaticLayout(getConfiguredAutomaticLayout());
    setFolding(getConfiguredFolding());
    setRenderWhitespace(getConfiguredRenderWhitespace());
    setScrollBeyondLastLine(getConfiguredScrollBeyondLastLine());
    setFormatOnPaste(getConfiguredFormatOnPaste());
    setFormatOnType(getConfiguredFormatOnType());
  }

  @Override
  @ConfigProperty(ConfigProperty.STRING)
  public void setLanguage(String language) {
    propertySupport.setPropertyString(PROP_LANGUAGE, language);
  }

  @Override
  public String getLanguage() {
    return propertySupport.getPropertyString(PROP_LANGUAGE);
  }

  @ConfigProperty(ConfigProperty.STRING)
  protected String getConfiguredLanguage() {
    return "plaintext";
  }

  @Override
  @ConfigProperty(ConfigProperty.STRING)
  public void setTheme(String theme) {
    propertySupport.setPropertyString(PROP_THEME, theme);
  }

  @Override
  public String getTheme() {
    return propertySupport.getPropertyString(PROP_THEME);
  }

  @ConfigProperty(ConfigProperty.STRING)
  protected String getConfiguredTheme() {
    return "vs";
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setLineNumbers(boolean lineNumbers) {
    propertySupport.setPropertyBool(PROP_LINE_NUMBERS, lineNumbers);
  }

  @Override
  public boolean getLineNumbers() {
    return propertySupport.getPropertyBool(PROP_LINE_NUMBERS);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredLineNumbers() {
    return true;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setMinimap(boolean minimap) {
    propertySupport.setPropertyBool(PROP_MINIMAP, minimap);
  }

  @Override
  public boolean getMinimap() {
    return propertySupport.getPropertyBool(PROP_MINIMAP);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredMinimap() {
    return true;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setWordWrap(boolean wordWrap) {
    propertySupport.setPropertyBool(PROP_WORD_WRAP, wordWrap);
  }

  @Override
  public boolean getWordWrap() {
    return propertySupport.getPropertyBool(PROP_WORD_WRAP);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredWordWrap() {
    return false;
  }

  @Override
  @ConfigProperty(ConfigProperty.INTEGER)
  public void setFontSize(int fontSize) {
    propertySupport.setPropertyInt(PROP_FONT_SIZE, fontSize);
  }

  @Override
  public int getFontSize() {
    return propertySupport.getPropertyInt(PROP_FONT_SIZE);
  }

  @ConfigProperty(ConfigProperty.INTEGER)
  protected int getConfiguredFontSize() {
    return 14;
  }

  @Override
  @ConfigProperty(ConfigProperty.INTEGER)
  public void setTabSize(int tabSize) {
    propertySupport.setPropertyInt(PROP_TAB_SIZE, tabSize);
  }

  @Override
  public int getTabSize() {
    return propertySupport.getPropertyInt(PROP_TAB_SIZE);
  }

  @ConfigProperty(ConfigProperty.INTEGER)
  protected int getConfiguredTabSize() {
    return 4;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setInsertSpaces(boolean insertSpaces) {
    propertySupport.setPropertyBool(PROP_INSERT_SPACES, insertSpaces);
  }

  @Override
  public boolean getInsertSpaces() {
    return propertySupport.getPropertyBool(PROP_INSERT_SPACES);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredInsertSpaces() {
    return true;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setAutomaticLayout(boolean automaticLayout) {
    propertySupport.setPropertyBool(PROP_AUTOMATIC_LAYOUT, automaticLayout);
  }

  @Override
  public boolean getAutomaticLayout() {
    return propertySupport.getPropertyBool(PROP_AUTOMATIC_LAYOUT);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredAutomaticLayout() {
    return true;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setFolding(boolean folding) {
    propertySupport.setPropertyBool(PROP_FOLDING, folding);
  }

  @Override
  public boolean getFolding() {
    return propertySupport.getPropertyBool(PROP_FOLDING);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredFolding() {
    return true;
  }

  @Override
  @ConfigProperty(ConfigProperty.STRING)
  public void setRenderWhitespace(String renderWhitespace) {
    propertySupport.setPropertyString(PROP_RENDER_WHITESPACE, renderWhitespace);
  }

  @Override
  public String getRenderWhitespace() {
    return propertySupport.getPropertyString(PROP_RENDER_WHITESPACE);
  }

  @ConfigProperty(ConfigProperty.STRING)
  protected String getConfiguredRenderWhitespace() {
    return "none";
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setScrollBeyondLastLine(boolean scrollBeyondLastLine) {
    propertySupport.setPropertyBool(PROP_SCROLL_BEYOND_LAST_LINE, scrollBeyondLastLine);
  }

  @Override
  public boolean getScrollBeyondLastLine() {
    return propertySupport.getPropertyBool(PROP_SCROLL_BEYOND_LAST_LINE);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredScrollBeyondLastLine() {
    return false;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setFormatOnPaste(boolean formatOnPaste) {
    propertySupport.setPropertyBool(PROP_FORMAT_ON_PASTE, formatOnPaste);
  }

  @Override
  public boolean getFormatOnPaste() {
    return propertySupport.getPropertyBool(PROP_FORMAT_ON_PASTE);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredFormatOnPaste() {
    return false;
  }

  @Override
  @ConfigProperty(ConfigProperty.BOOLEAN)
  public void setFormatOnType(boolean formatOnType) {
    propertySupport.setPropertyBool(PROP_FORMAT_ON_TYPE, formatOnType);
  }

  @Override
  public boolean getFormatOnType() {
    return propertySupport.getPropertyBool(PROP_FORMAT_ON_TYPE);
  }

  @ConfigProperty(ConfigProperty.BOOLEAN)
  protected boolean getConfiguredFormatOnType() {
    return false;
  }

  @Override
  public IMonacoFieldUIFacade getUIFacade() {
    return m_uiFacade;
  }

  protected class P_UIFacade implements IMonacoFieldUIFacade {
    @Override
    public void parseAndSetValueFromUI(String displayText) {
      if (!isEnabledIncludingParents() || !isVisibleIncludingParents()) {
        return;
      }
      setDisplayText(displayText);
      setValue(displayText);
    }

    @Override
    public void setDisplayTextFromUI(String displayText) {
      if (!isEnabledIncludingParents() || !isVisibleIncludingParents()) {
        return;
      }
      setDisplayText(displayText);
    }
  }
}
