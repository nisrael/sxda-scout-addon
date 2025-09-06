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

import java.util.Arrays;
import java.util.Optional;

public enum CodeMirrorTheme {
  AMY("amy", "Amy"),
  AYU_LIGHT("ayuLight", "Ayu Light"),
  BARF("barf", "Barf"),
  BESPIN("bespin", "Bespin"),
  BIRDS_OF_PARADISE("birdsOfParadise", "Birds Of Paradise"),
  BOYS_AND_GIRLS("boysAndGirls", "Boys And Girls"),
  CLOUDS("clouds", "Clouds"),
  COBALT("cobalt", "Cobalt"),
  COOL_GLOW("coolGlow", "Cool Glow"),
  DRACULA("dracula", "Dracula (thememirror)"),
  ESPRESSO("espresso", "Espresso"),
  NOCTIS_LILAC("noctisLilac", "Noctis Lilac"),
  ROSE_PINE_DAWN("rosePineDawn", "Rose Pine Dawn"),
  SMOOTHY("smoothy", "Smoothy"),
  SOLARIZED_LIGHT("solarizedLight", "Solarized Light (thememirror)"),
  TOMORROW("tomorrow", "Tomorrow"),
  MATERIAL_LIGHT("materialLight", "Material Light"),
  MATERIAL_DARK("materialDark", "Material Dark"),
  SOLARIZED_DARK("solarizedDark", "Solarized Dark"),
  SOLARIZED_LIGHT_DDIETR("solarizedLight_ddietr", "Solarized Light (ddietr)"),
  DRACULA_DDIETR("dracula_ddietr", "Dracula (ddietr)"),
  GITHUB_LIGHT("githubLight", "Github Light"),
  GITHUB_DARK("githubDark", "Github Dark"),
  AURA("aura", "Aura"),
  TOKYO_NIGHT("tokyoNight", "Tokyo Night"),
  TOKYO_NIGHT_STORM("tokyoNightStorm", "Tokyo Night Storm"),
  TOKYO_NIGHT_DAY("tokyoNightDay", "Tokyo Night Day"),
  ONE_DARK("oneDark", "One Dark");

  private final String configTerm;
  private final String displayName;

  public String getConfigTerm() {
    return configTerm;
  }

  public String getDisplayName() {
    return displayName;
  }

  CodeMirrorTheme(String configTerm, String displayName) {
    this.configTerm = configTerm;
    this.displayName = displayName;
  }

  private static Optional<CodeMirrorTheme> fromConfigTerm(String value) {
    return Arrays.stream(CodeMirrorTheme.values()).filter(codeMirrorTheme -> codeMirrorTheme.configTerm.equals(value)).findFirst();
  }


  }


