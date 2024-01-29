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
import {AceTheme} from "./AceTheme";

export class AceThemes{
  private static instance: AceThemes;
  private _register: Map<string, AceTheme> = new Map();

  private constructor() {
    this.registerThemes();
  }

  public static getInstance(): AceThemes {
    if (!AceThemes.instance) {
      AceThemes.instance = new AceThemes();
    }
    return AceThemes.instance;
  }

  register(theme: AceTheme) {
    this._register.set(theme.id, theme);
  }

  get(id: string): AceTheme {
    return this._register.get(id);
  }

  all(): AceTheme[] {
    return Array.from(this._register.values());
  }

  registerThemes() {
    this.register(new AceTheme('ambiance', 'Ambiance', 'ace/theme/ambiance'));
    this.register(new AceTheme('chaos', 'Chaos', 'ace/theme/chaos'));
    this.register(new AceTheme('chrome', 'Chrome', 'ace/theme/chrome'));
    this.register(new AceTheme('cloud9_day', 'Cloud9 Day', 'ace/theme/cloud9_day'));
    this.register(new AceTheme('cloud9_night', 'Cloud9 Night', 'ace/theme/cloud9_night'));
    this.register(new AceTheme('cloud9_night_low_color', 'Cloud9 Night Low Color', 'ace/theme/cloud9_night_low_color'));
    this.register(new AceTheme('cloud_editor', 'Cloud Editor', 'ace/theme/cloud_editor'));
    this.register(new AceTheme('cloud_editor_dark', 'Cloud Editor Dark', 'ace/theme/cloud_editor_dark'));
    this.register(new AceTheme('clouds', 'Clouds', 'ace/theme/clouds'));
    this.register(new AceTheme('clouds_midnight', 'Clouds Midnight', 'ace/theme/clouds_midnight'));
    this.register(new AceTheme('cobalt', 'Cobalt', 'ace/theme/cobalt'));
    this.register(new AceTheme('crimson_editor', 'Crimson Editor', 'ace/theme/crimson_editor'));
    this.register(new AceTheme('dawn', 'Dawn', 'ace/theme/dawn'));
    this.register(new AceTheme('dracula', 'Dracula', 'ace/theme/dracula'));
    this.register(new AceTheme('dreamweaver', 'Dreamweaver', 'ace/theme/dreamweaver'));
    this.register(new AceTheme('eclipse', 'Eclipse', 'ace/theme/eclipse'));
    this.register(new AceTheme('github', 'GitHub', 'ace/theme/github'));
    this.register(new AceTheme('github_dark', 'GitHub dark', 'ace/theme/github_dark'));
    this.register(new AceTheme('gob', 'Gob', 'ace/theme/gob'));
    this.register(new AceTheme('gruvbox', 'Gruvbox', 'ace/theme/gruvbox'));
    this.register(new AceTheme('gruvbox_dark_hard', 'Gruvbox Dark Hard', 'ace/theme/gruvbox_dark_hard'));
    this.register(new AceTheme('gruvbox_light_hard', 'Gruvbox Light Hard', 'ace/theme/gruvbox_light_hard'));
    this.register(new AceTheme('idle_fingers', 'Idle Fingers', 'ace/theme/idle_fingers'));
    this.register(new AceTheme('iplastic', 'IPlastic', 'ace/theme/iplastic'));
    this.register(new AceTheme('katzenmilch', 'Katzenmilch', 'ace/theme/katzenmilch'));
    this.register(new AceTheme('kr_theme', 'krTheme', 'ace/theme/kr_theme'));
    this.register(new AceTheme('kuroir', 'Kuroir', 'ace/theme/kuroir'));
    this.register(new AceTheme('merbivore', 'Merbivore', 'ace/theme/merbivore'));
    this.register(new AceTheme('merbivore_soft', 'Merbivore soft', 'ace/theme/merbivore_soft'));
    this.register(new AceTheme('mono_industrial', 'Mono Industrial', 'ace/theme/mono_industrial'));
    this.register(new AceTheme('monokai', 'Monokai', 'ace/theme/monokai'));
    this.register(new AceTheme('nord_dark', 'Nord dark', 'ace/theme/nord_dark'));
    this.register(new AceTheme('one_dark', 'One Dark', 'ace/theme/one_dark'));
    this.register(new AceTheme('pastel_on_dark', 'Pastel On Dark', 'ace/theme/pastel_on_dark'));
    this.register(new AceTheme('solarized_dark', 'Solarized Dark', 'ace/theme/solarized_dark'));
    this.register(new AceTheme('solarized_light', 'Solarized Light', 'ace/theme/solarized_light'));
    this.register(new AceTheme('sqlserver', 'SQL Server', 'ace/theme/sqlserver'));
    this.register(new AceTheme('terminal', 'Terminal', 'ace/theme/terminal'));
    this.register(new AceTheme('textmate', 'Textmate', 'ace/theme/textmate'));
    this.register(new AceTheme('tomorrow', 'Tomorrow', 'ace/theme/tomorrow'));
    this.register(new AceTheme('tomorrow_night', 'Tomorrow Night', 'ace/theme/tomorrow_night'));
    this.register(new AceTheme('tomorrow_night_blue', 'Tomorrow Night Blue', 'ace/theme/tomorrow_night_blue'));
    this.register(new AceTheme('tomorrow_night_bright', 'Tomorrow Night Bright', 'ace/theme/tomorrow_night_bright'));
    this.register(new AceTheme('tomorrow_night_eighties', 'Tomorrow Night Eighties', 'ace/theme/tomorrow_night_eighties'));
    this.register(new AceTheme('twilight', 'Twilight', 'ace/theme/twilight'));
    this.register(new AceTheme('vibrant_ink', 'Vibrant Ink', 'ace/theme/vibrant_ink'));
    this.register(new AceTheme('xcode', 'XCode', 'ace/theme/xcode'));
  }
}
