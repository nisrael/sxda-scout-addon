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

package io.sxda.scout.addon.ace.client.acefield;

import org.eclipse.scout.rt.client.ui.form.fields.AbstractValueField;
import org.eclipse.scout.rt.platform.Order;
import org.eclipse.scout.rt.platform.annotations.ConfigProperty;
import org.eclipse.scout.rt.platform.classid.ClassId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ClassId("a35fe425-089f-4954-bdcd-cbea26e202bb")
public abstract class AbstractAceField extends AbstractValueField<String> implements IAceField {
  public final static String THEME_AMBIANCE="ambiance";
  public final static String THEME_CHAOS="chaos";
  public final static String THEME_CHROME="chrome";
  public final static String THEME_CLOUD9_DAY="cloud9_day";
  public final static String THEME_CLOUD9_NIGHT="cloud9_night";
  public final static String THEME_CLOUD9_NIGHT_LOW_COLOR="cloud9_night_low_color";
  public final static String THEME_CLOUDS="clouds";
  public final static String THEME_CLOUDS_MIDNIGHT="clouds_midnight";
  public final static String THEME_COBALT="cobalt";
  public final static String THEME_CRIMSON_EDITOR="crimson_editor";
  public final static String THEME_DAWN="dawn";
  public final static String THEME_DRACULA="dracula";
  public final static String THEME_DREAMWEAVER="dreamweaver";
  public final static String THEME_ECLIPSE="eclipse";
  public final static String THEME_GITHUB="github";
  public final static String THEME_GITHUB_DARK="github_dark";
  public final static String THEME_GOB="gob";
  public final static String THEME_GRUVBOX="gruvbox";
  public final static String THEME_GRUVBOX_DARK_HARD="gruvbox_dark_hard";
  public final static String THEME_GRUVBOX_LIGHT_HARD="gruvbox_light_hard";
  public final static String THEME_IDLE_FINGERS="idle_fingers";
  public final static String THEME_IPLASTIC="iplastic";
  public final static String THEME_KATZENMILCH="katzenmilch";
  public final static String THEME_KR_THEME="kr_theme";
  public final static String THEME_KUROIR="kuroir";
  public final static String THEME_MERBIVORE="merbivore";
  public final static String THEME_MERBIVORE_SOFT="merbivore_soft";
  public final static String THEME_MONO_INDUSTRIAL="mono_industrial";
  public final static String THEME_MONOKAI="monokai";
  public final static String THEME_NORD_DARK="nord_dark";
  public final static String THEME_ONE_DARK="one_dark";
  public final static String THEME_PASTEL_ON_DARK="pastel_on_dark";
  public final static String THEME_SOLARIZED_DARK="solarized_dark";
  public final static String THEME_SOLARIZED_LIGHT="solarized_light";
  public final static String THEME_SQLSERVER="sqlserver";
  public final static String THEME_TERMINAL="terminal";
  public final static String THEME_TEXTMATE="textmate";
  public final static String THEME_TOMORROW="tomorrow";
  public final static String THEME_TOMORROW_NIGHT="tomorrow_night";
  public final static String THEME_TOMORROW_NIGHT_BLUE="tomorrow_night_blue";
  public final static String THEME_TOMORROW_NIGHT_BRIGHT="tomorrow_night_bright";
  public final static String THEME_TOMORROW_NIGHT_EIGHTIES="tomorrow_night_eighties";
  public final static String THEME_TWILIGHT="twilight";
  public final static String THEME_VIBRANT_INK="vibrant_ink";
  public final static String THEME_XCODE="xcode";


  private static final Logger LOG = LoggerFactory.getLogger(AbstractAceField.class);

  public AbstractAceField() {
    super(true);
  }

  @Override
  protected void initConfig() {
    super.initConfig();
    setTheme(getConfiguredTheme());
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
    return THEME_XCODE;
  }

}
