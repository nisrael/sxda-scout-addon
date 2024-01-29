/*
 *  Copyright (c) 2010-20240129-202419 BSI Business Systems Integration AG
 *  Copyright (c) 2023-20240129-202419 Nils Israel
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
  AMBIANCE("ambiance", "Ambiance"),
  CHAOS("chaos", "Chaos"),
  CHROME("chrome", "Chrome"),
  CLOUD9_DAY("cloud9_day", "Cloud9 Day"),
  CLOUD9_NIGHT("cloud9_night", "Cloud9 Night"),
  CLOUD9_NIGHT_LOW_COLOR("cloud9_night_low_color", "Cloud9 Night Low Color"),
  CLOUD_EDITOR("cloud_editor", "Cloud Editor"),
  CLOUD_EDITOR_DARK("cloud_editor_dark", "Cloud Editor Dark"),
  CLOUDS("clouds", "Clouds"),
  CLOUDS_MIDNIGHT("clouds_midnight", "Clouds Midnight"),
  COBALT("cobalt", "Cobalt"),
  CRIMSON_EDITOR("crimson_editor", "Crimson Editor"),
  DAWN("dawn", "Dawn"),
  DRACULA("dracula", "Dracula"),
  DREAMWEAVER("dreamweaver", "Dreamweaver"),
  ECLIPSE("eclipse", "Eclipse"),
  GITHUB("github", "GitHub"),
  GITHUB_DARK("github_dark", "GitHub dark"),
  GOB("gob", "Gob"),
  GRUVBOX("gruvbox", "Gruvbox"),
  GRUVBOX_DARK_HARD("gruvbox_dark_hard", "Gruvbox Dark Hard"),
  GRUVBOX_LIGHT_HARD("gruvbox_light_hard", "Gruvbox Light Hard"),
  IDLE_FINGERS("idle_fingers", "Idle Fingers"),
  IPLASTIC("iplastic", "IPlastic"),
  KATZENMILCH("katzenmilch", "Katzenmilch"),
  KR_THEME("kr_theme", "krTheme"),
  KUROIR("kuroir", "Kuroir"),
  MERBIVORE("merbivore", "Merbivore"),
  MERBIVORE_SOFT("merbivore_soft", "Merbivore soft"),
  MONO_INDUSTRIAL("mono_industrial", "Mono Industrial"),
  MONOKAI("monokai", "Monokai"),
  NORD_DARK("nord_dark", "Nord dark"),
  ONE_DARK("one_dark", "One Dark"),
  PASTEL_ON_DARK("pastel_on_dark", "Pastel On Dark"),
  SOLARIZED_DARK("solarized_dark", "Solarized Dark"),
  SOLARIZED_LIGHT("solarized_light", "Solarized Light"),
  SQLSERVER("sqlserver", "SQL Server"),
  TERMINAL("terminal", "Terminal"),
  TEXTMATE("textmate", "Textmate"),
  TOMORROW("tomorrow", "Tomorrow"),
  TOMORROW_NIGHT("tomorrow_night", "Tomorrow Night"),
  TOMORROW_NIGHT_BLUE("tomorrow_night_blue", "Tomorrow Night Blue"),
  TOMORROW_NIGHT_BRIGHT("tomorrow_night_bright", "Tomorrow Night Bright"),
  TOMORROW_NIGHT_EIGHTIES("tomorrow_night_eighties", "Tomorrow Night Eighties"),
  TWILIGHT("twilight", "Twilight"),
  VIBRANT_INK("vibrant_ink", "Vibrant Ink"),
  XCODE("xcode", "XCode");

  private final String configTerm;
  private final String displayName;

  public String getConfigTerm() {
    return configTerm;
  }

  public String getDisplayName() {
    return displayName;
  }

  AceTheme(String configTerm, String displayName) {
    this.configTerm = configTerm;
    this.displayName = displayName;
  }

  private static Optional<AceTheme> fromConfigTerm(String value) {
    return Arrays.stream(AceTheme.values()).filter(aceTheme -> aceTheme.configTerm.equals(value)).findFirst();
  }


  }


