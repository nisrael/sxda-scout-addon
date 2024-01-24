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
import {StaticLookupCall} from '@eclipse-scout/core';

export class AceThemeLookupCall extends StaticLookupCall<string> {

  constructor() {
    super();
  }

  protected override _data(): any[] {
    return AceThemeLookupCall.DATA;
  }

  static DATA = [
    ['ambiance', 'Ambiance'],
    ['chaos', 'Chaos'],
    ['chrome', 'Chrome'],
    ['cloud9_day', 'Cloud9 day'],
    ['cloud9_night', 'Cloud9 night'],
    ['cloud9_night_low_color', 'Cloud9 night low color'],
    ['cloud_editor', 'Cloud editor'],
    ['cloud_editor_dark', 'Cloud editor dark'],
    ['clouds', 'Clouds'],
    ['clouds_midnight', 'Clouds midnight'],
    ['cobalt', 'Cobalt'],
    ['crimson_editor', 'Crimson editor'],
    ['dawn', 'Dawn'],
    ['dracula', 'Dracula'],
    ['dreamweaver', 'Dreamweaver'],
    ['eclipse', 'Eclipse'],
    ['github', 'Github'],
    ['github_dark', 'Github dark'],
    ['gob', 'Gob'],
    ['gruvbox', 'Gruvbox'],
    ['gruvbox_dark_hard', 'Gruvbox dark hard'],
    ['gruvbox_light_hard', 'Gruvbox light hard'],
    ['idle_fingers', 'Idle fingers'],
    ['iplastic', 'Iplastic'],
    ['katzenmilch', 'Katzenmilch'],
    ['kr_theme', 'KR theme'],
    ['kuroir', 'Kuroir'],
    ['merbivore', 'Merbivore'],
    ['merbivore_soft', 'Merbivore soft'],
    ['mono_industrial', 'Mono industrial'],
    ['monokai', 'Monokai'],
    ['nord_dark', 'Nord dark'],
    ['one_dark', 'One dark'],
    ['pastel_on_dark', 'Pastel on dark'],
    ['solarized_dark', 'Solarized dark'],
    ['solarized_light', 'Solarized light'],
    ['sqlserver', 'Sqlserver'],
    ['terminal', 'Terminal'],
    ['textmate', 'Textmate'],
    ['tomorrow', 'Tomorrow'],
    ['tomorrow_night', 'Tomorrow night'],
    ['tomorrow_night_blue', 'Tomorrow night blue'],
    ['tomorrow_night_bright', 'Tomorrow night bright'],
    ['tomorrow_night_eighties', 'Tomorrow night eighties'],
    ['twilight', 'Twilight'],
    ['vibrant_ink', 'Vibrant ink'],
    ['xcode', 'XCode'],
  ];
}
