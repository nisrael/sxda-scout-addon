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

/*
 * Copyright (c) 2010, 2023 BSI Business Systems Integration AG
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import {
  CheckBoxField,
  FormModel,
  GroupBox,
  SmartField,
  TabBox,
  TabItem,
  WidgetField
} from '@eclipse-scout/core';
import {EventsTab, EventsTabWidgetMap, AceThemeLookupCall, AceModeLookupCall} from '../index';
import {AceField} from "../../../ace/src";

export default (): FormModel => ({
  id: 'sxda.AceForm',
  displayHint: 'view',
  rootGroupBox: {
    id: 'MainBox',
    objectType: GroupBox,
    fields: [
      {
        id: 'DetailBox',
        objectType: GroupBox,
        gridColumnCount: 1,
        fields: [
          {
            id: 'WidgetField',
            objectType: WidgetField,
            labelVisible: false,
            statusVisible: false,
            gridDataHints: {
              h: 4,
              weightY: 0
            },
            fieldWidget: {
              id: 'AceField',
              objectType: AceField,
            }
          }
        ]
      },
      {
        id: 'ConfigurationBox',
        objectType: TabBox,
        cssClass: 'sxda-configuration',
        selectedTab: 'PropertiesTab',
        tabItems: [
          {
            id: 'PropertiesTab',
            objectType: TabItem,
            label: 'Properties',
            fields: [
              {
                id: 'PropertiesBox',
                objectType: GroupBox,
                label: 'Properties',
                labelVisible: false,
                borderVisible: false,
                fields: [
                  {
                    id: 'EnableField',
                    objectType: CheckBoxField,
                    label: 'Enable',
                    labelVisible: false
                  },
                  {
                    id: 'ThemeField',
                    objectType: SmartField<string>,
                    label: 'Theme',
                    lookupCall: AceThemeLookupCall
                  },
                  {
                    id: 'ModeField',
                    objectType: SmartField<string>,
                    label: 'Mode',
                    lookupCall: AceModeLookupCall
                  }
                ]
              }
            ]
          },
          {
            id: 'EventsTab',
            objectType: EventsTab
          }
        ]
      }
    ]
  }
});

export type AceFormWidgetMap = {
  'MainBox': GroupBox;
  'DetailBox': GroupBox;
  'WidgetField': WidgetField;
  'AceField': AceField;
  'ConfigurationBox': TabBox;
  'PropertiesTab': TabItem;
  'PropertiesBox': GroupBox;
  'EnableField': CheckBoxField;
  'ThemeField': SmartField<string>;
  'ModeField': SmartField<string>;
  'ActionsTab': TabItem;
  'EventsTab': EventsTab;
} & EventsTabWidgetMap;
