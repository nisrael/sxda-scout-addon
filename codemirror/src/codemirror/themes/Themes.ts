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
import {ThemeDescription} from "./ThemeDescription";
import {
  amy,
  ayuLight,
  barf,
  bespin,
  birdsOfParadise,
  boysAndGirls,
  clouds,
  cobalt,
  coolGlow,
  dracula,
  espresso,
  noctisLilac,
  rosePineDawn,
  smoothy,
  solarizedLight,
  tomorrow
} from "thememirror";

import {auraTheme, auraHighlightStyle} from "@ddietr/codemirror-themes/aura";
import {draculaTheme, draculaHighlightStyle} from "@ddietr/codemirror-themes/dracula";
import {githubDarkTheme, githubDarkHighlightStyle} from "@ddietr/codemirror-themes/github-dark";
import {githubLightTheme, githubLightHighlightStyle} from "@ddietr/codemirror-themes/github-light";
import {materialDarkTheme, materialDarkHighlightStyle} from "@ddietr/codemirror-themes/material-dark";
import {materialLightTheme, materialLightHighlightStyle} from "@ddietr/codemirror-themes/material-light";
import {solarizedLightTheme, solarizedLightHighlightStyle} from "@ddietr/codemirror-themes/solarized-light";
import {solarizedDarkTheme, solarizedDarkHighlightStyle} from "@ddietr/codemirror-themes/solarized-dark";
import {tokyoNightTheme, tokyoNightHighlightStyle} from "@ddietr/codemirror-themes/tokyo-night";
import {tokyoNightStormTheme, tokyoNightStormHighlightStyle} from "@ddietr/codemirror-themes/tokyo-night-storm";
import {tokyoNightDayTheme, tokyoNightDayHighlightStyle} from "@ddietr/codemirror-themes/tokyo-night-day";
import {oneDarkTheme, oneDarkHighlightStyle} from "@codemirror/theme-one-dark";

export enum ThemeId{
  amy = 'amy',
  ayuLight = 'ayuLight',
  barf = 'barf',
  bespin = 'bespin',
  birdsOfParadise = 'birdsOfParadise',
  boysAndGirls = 'boysAndGirls',
  clouds = 'clouds',
  cobalt = 'cobalt',
  coolGlow = 'coolGlow',
  dracula = 'dracula',
  espresso = 'espresso',
  noctisLilac = 'noctisLilac',
  rosePineDawn = 'rosePineDawn',
  smoothy = 'smoothy',
  solarizedLight = 'solarizedLight',
  tomorrow = 'tomorrow',
  materialLight = 'materialLight',
  materialDark = 'materialDark',
  solarizedDark = 'solarizedDark',
  solarizedLight_ddietr = 'solarizedLight_ddietr',
  dracula_ddietr = 'dracula_ddietr',
  githubLight = 'githubLight',
  githubDark = 'githubDark',
  aura = 'aura',
  tokyoNight = 'tokyoNight',
  tokyoNightStorm = 'tokyoNightStorm',
  tokyoNightDay = 'tokyoNightDay',
  oneDark = 'oneDark',
}

export const ThemeList: ThemeDescription[] = [
  ThemeDescription.of({
    id: ThemeId.amy,
    name: 'Amy',
    dark: true,
    extension: amy
  }),
  ThemeDescription.of({
    id: ThemeId.ayuLight,
    name: 'Ayu Light',
    dark: false,
    extension: ayuLight,
  }),
  ThemeDescription.of({
    id: ThemeId.barf,
    name: 'Barf',
    dark: true,
    extension: barf,
  }),
  ThemeDescription.of({
    id: ThemeId.bespin,
    name: 'Bespin',
    dark: true,
    extension: bespin,
  }),
  ThemeDescription.of({
    id: ThemeId.birdsOfParadise,
    name: 'Birds Of Paradise',
    dark: true,
    extension: birdsOfParadise,
  }),
  ThemeDescription.of({
    id: ThemeId.boysAndGirls,
    name: 'Boys And Girls',
    dark: true,
    extension: boysAndGirls,
  }),
  ThemeDescription.of({
    id: ThemeId.clouds,
    name: 'Clouds',
    dark: false,
    extension: clouds,
  }),
  ThemeDescription.of({
    id: ThemeId.cobalt,
    name: 'Cobalt',
    dark: true,
    extension: cobalt,
  }),
  ThemeDescription.of({
    id: ThemeId.coolGlow,
    name: 'Cool Glow',
    dark: true,
    extension: coolGlow,
  }),
  ThemeDescription.of({
    id: ThemeId.dracula,
    name: 'Dracula (thememirror)',
    dark: true,
    extension: dracula,
  }),
  ThemeDescription.of({
    id: ThemeId.espresso,
    name: 'Espresso',
    dark: false,
    extension: espresso,
  }),
  ThemeDescription.of({
    id: ThemeId.noctisLilac,
    name: 'Noctis Lilac',
    dark: false,
    extension: noctisLilac,
  }),
  ThemeDescription.of({
    id: ThemeId.rosePineDawn,
    name: 'Rose Pine Dawn',
    dark: false,
    extension: rosePineDawn,
  }),
  ThemeDescription.of({
    id: ThemeId.smoothy,
    name: 'Smoothy',
    dark: false,
    extension: smoothy,
  }),
  ThemeDescription.of({
    id: ThemeId.solarizedLight,
    name: 'Solarized Light (thememirror)',
    dark: false,
    extension: solarizedLight,
  }),
  ThemeDescription.of({
    id: ThemeId.tomorrow,
    name: 'Tomorrow',
    dark: false,
    extension: tomorrow,
  }),
  ThemeDescription.of({
    id: ThemeId.materialLight,
    name: 'Material Light',
    dark: false,
    extension: materialLightTheme,
    syntaxHighlightStyle: materialLightHighlightStyle,
  }),
  ThemeDescription.of({
    id: ThemeId.materialDark,
    name: 'Material Dark',
    dark: true,
    extension: materialDarkTheme,
    syntaxHighlightStyle: materialDarkHighlightStyle,
  }),
  ThemeDescription.of({
    id: ThemeId.solarizedDark,
    name: 'Solarized Dark',
    dark: true,
    extension: solarizedDarkTheme,
    syntaxHighlightStyle: solarizedDarkHighlightStyle,
  }),
  ThemeDescription.of({
    id: ThemeId.solarizedLight_ddietr,
    name: 'Solarized Light (ddietr)',
    dark: true,
    extension: solarizedLightTheme,
    syntaxHighlightStyle: solarizedLightHighlightStyle,
  }),
  ThemeDescription.of({
    id: ThemeId.dracula_ddietr,
    name: 'Dracula (ddietr)',
    dark: true,
    extension: draculaTheme,
    syntaxHighlightStyle: draculaHighlightStyle,
  }),
  ThemeDescription.of({
    id: ThemeId.githubLight,
    name: 'Github Light',
    dark: false,
    extension: githubLightTheme,
    syntaxHighlightStyle: githubLightHighlightStyle,
  }),
  ThemeDescription.of({
    id: ThemeId.githubDark,
    name: 'Github Dark',
    dark: true,
    extension: githubDarkTheme,
    syntaxHighlightStyle: githubDarkHighlightStyle,
  }),
  ThemeDescription.of({
    id: ThemeId.aura,
    name: 'Aura',
    dark: false,
    extension: auraTheme,
    syntaxHighlightStyle: auraHighlightStyle,
  }),
  ThemeDescription.of({
    id: ThemeId.tokyoNight,
    name: 'Tokyo Night',
    dark: true,
    extension: tokyoNightTheme,
    syntaxHighlightStyle: tokyoNightHighlightStyle,
  }),
  ThemeDescription.of({
    id: ThemeId.tokyoNightStorm,
    name: 'Tokyo Night Storm',
    dark: true,
    extension: tokyoNightStormTheme,
    syntaxHighlightStyle: tokyoNightStormHighlightStyle,
  }),
  ThemeDescription.of({
    id: ThemeId.tokyoNightDay,
    name: 'Tokyo Night Day',
    dark: true,
    extension: tokyoNightDayTheme,
    syntaxHighlightStyle: tokyoNightDayHighlightStyle,
  }),
  ThemeDescription.of({
    id: ThemeId.oneDark,
    name: 'One Dark',
    dark: true,
    extension: oneDarkTheme,
    syntaxHighlightStyle: oneDarkHighlightStyle,
  }),
]



