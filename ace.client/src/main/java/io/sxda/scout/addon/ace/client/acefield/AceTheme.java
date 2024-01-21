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

import java.util.Arrays;
import java.util.Optional;

public enum AceTheme {
  AMBIANCE("ambiance"),
  CHAOS("chaos"),
  CHROME("chrome"),
  CLOUD9_DAY("cloud9_day"),
  CLOUD9_NIGHT("cloud9_night"),
  CLOUD9_NIGHT_LOW_COLOR("cloud9_night_low_color"),
  CLOUDS("clouds"),
  CLOUDS_MIDNIGHT("clouds_midnight"),
  COBALT("cobalt"),
  CRIMSON_EDITOR("crimson_editor"),
  DAWN("dawn"),
  DRACULA("dracula"),
  DREAMWEAVER("dreamweaver"),
  ECLIPSE("eclipse"),
  GITHUB("github"),
  GITHUB_DARK("github_dark"),
  GOB("gob"),
  GRUVBOX("gruvbox"),
  GRUVBOX_DARK_HARD("gruvbox_dark_hard"),
  GRUVBOX_LIGHT_HARD("gruvbox_light_hard"),
  IDLE_FINGERS("idle_fingers"),
  IPLASTIC("iplastic"),
  KATZENMILCH("katzenmilch"),
  KR_THEME("kr_theme"),
  KUROIR("kuroir"),
  MERBIVORE("merbivore"),
  MERBIVORE_SOFT("merbivore_soft"),
  MONO_INDUSTRIAL("mono_industrial"),
  MONOKAI("monokai"),
  NORD_DARK("nord_dark"),
  ONE_DARK("one_dark"),
  PASTEL_ON_DARK("pastel_on_dark"),
  SOLARIZED_DARK("solarized_dark"),
  SOLARIZED_LIGHT("solarized_light"),
  SQLSERVER("sqlserver"),
  TERMINAL("terminal"),
  TEXTMATE("textmate"),
  TOMORROW("tomorrow"),
  TOMORROW_NIGHT("tomorrow_night"),
  TOMORROW_NIGHT_BLUE("tomorrow_night_blue"),
  TOMORROW_NIGHT_BRIGHT("tomorrow_night_bright"),
  TOMORROW_NIGHT_EIGHTIES("tomorrow_night_eighties"),
  TWILIGHT("twilight"),
  VIBRANT_INK("vibrant_ink"),
  XCODE("xcode");

  private final String configTerm;

  public String getConfigTerm(){
    return configTerm;
  }

  AceTheme(String configTerm) {
    this.configTerm = configTerm;
  }

  private static Optional<AceTheme> fromConfigTerm(String value){
    return Arrays.stream(AceTheme.values()).filter(aceTheme -> aceTheme.configTerm.equals(value)).findFirst();
  }


}


