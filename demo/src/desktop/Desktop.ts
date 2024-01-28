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
import {
  App,
  Desktop as ScoutDesktop,
  DesktopModel as ScoutDesktopModel,
  Form,
  GroupBox, icons, InitModelOf, LabelField,
  models,
  scout
} from '@eclipse-scout/core';
import {APP_VERSION} from "../version";
import DesktopModel, {DesktopWidgetMap} from './DesktopModel';

export class Desktop extends ScoutDesktop {
  declare widgetMap: DesktopWidgetMap;

  constructor() {
    super();
    App.get().version = APP_VERSION;
  }

  protected override _jsonModel(): ScoutDesktopModel {
    return models.get(DesktopModel);
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);

    let aboutMenu = this.widget('AboutMenu');
    aboutMenu.on('action', this._onAboutMenuAction.bind(this));

    let defaultThemeMenu = this.widget('DefaultThemeMenu');
    defaultThemeMenu.on('action', this._onDefaultThemeMenuAction.bind(this));

    let darkThemeMenu = this.widget('DarkThemeMenu');
    darkThemeMenu.on('action', this._onDarkThemeMenuAction.bind(this));

    if (this.theme === 'dark') {
      darkThemeMenu.setIconId(icons.CHECKED_BOLD);
    } else {
      defaultThemeMenu.setIconId(icons.CHECKED_BOLD);
    }
  }

  protected _onDefaultThemeMenuAction() {
    this.setTheme('default');
  }

  protected _onDarkThemeMenuAction() {
    this.setTheme('dark');
  }

  _renderTheme(): void {
    console.log('switch theme to ' + this.theme);
    let theme_name = 'sxda-theme.css';
    if (this.theme && this.theme !== 'default') {
      theme_name = 'sxda-theme-' + this.theme + '.css';
    }
    let link = document.getElementById('theme') as HTMLLinkElement;
    link.href = theme_name;
  }

  protected override _render() {
    super._render();
    this._renderTheme();
  }

  protected _onAboutMenuAction() {
    let form = scout.create(Form, {
      parent: this,
      resizable: false,
      title: 'sxda-scut-addon Demo Application',
      rootGroupBox: {
        objectType: GroupBox,
        borderDecoration: 'empty',
        fields: [{
          objectType: LabelField,
          value: App.get().version,
          labelVisible: false,
          wrapText: true,
          htmlEnabled: true,
          cssClass: 'about-info',
          statusVisible: false,
          gridDataHints: {
            h: 3
          }
        }]
      }
    });
    form.open();
  }
}
