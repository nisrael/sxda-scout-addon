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
import {AceForm} from "../ace/AceForm";
import {Desktop} from "./Desktop";
import {DemoOutline} from "../index";
import {Menu} from "@eclipse-scout/core";


export default () => ({
  id: 'sxda.Desktop',
  objectType: Desktop,
  navigationHandleVisible: false,
  navigationVisible: true,
  headerVisible: true,
  outline: {
    objectType: DemoOutline
  },
  menus: [
    {
      id: 'ThemeMenu',
      objectType: Menu,
      text: 'Theme',
      childActions: [
        {
          id: 'DefaultThemeMenu',
          objectType: Menu,
          text: 'Default'
        },
        {
          id: 'DarkThemeMenu',
          objectType: Menu,
          text: 'Dark'
        }
      ]
    },
    {
      id: 'AboutMenu',
      objectType: Menu,
      text: 'About',
      cssClass: 'about-menu'
    }
  ]
});

export type DesktopWidgetMap = {
  'AceForm': AceForm;
  'Desktop': Desktop;
  'ThemeMenu': Menu;
  'DefaultThemeMenu': Menu;
  'DarkThemeMenu': Menu;
  'AboutMenu': Menu;
};
