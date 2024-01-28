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
  Button,
  CheckBoxField,
  FormModel,
  GroupBox,
  SequenceBox,
  SmartField,
  StringField,
  TabBox,
  TabItem,
  WidgetField
} from '@eclipse-scout/core';
import {EventsTab, EventsTabWidgetMap} from '../index';
import {AceField, AceThemeLookupCall, AceModeLookupCall} from "../../../ace/src";

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
              weightY: 1,
              fillVertical: true
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
        gridDataHints: {
          weightY: 0,
          fillVertical: false
        },
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
                  },
                  {
                    id: 'SoftTabsField',
                    objectType: CheckBoxField,
                    label: 'Soft Tabs'
                  },
                  {
                    id: 'WrapModeField',
                    objectType: CheckBoxField,
                    label: 'Wrap Mode'
                  },
                  {
                    id: 'ShowPrintMarginField',
                    objectType: CheckBoxField,
                    label: 'Show Print Margin'
                  },
                  {
                    id: 'HighlightActiveLineField',
                    objectType: CheckBoxField,
                    label: 'Highlight Active Line'
                  },
                  {
                    id: 'SelectOnSetValueField',
                    objectType: CheckBoxField,
                    label: 'Select on Set Value'
                  },
                  {
                    id: 'SetValueFieldBox',
                    objectType: SequenceBox,
                    label: 'Text',
                    fields: [
                      {
                        id: 'SetValueField',
                        objectType: StringField,
                        gridDataHints: {
                          weightX: 1
                        }
                      },
                      {
                        id: 'SetValueButton',
                        objectType: Button,
                        label: 'Set value',
                        gridDataHints: {
                          weightX: 0,
                          useUiWidth: true
                        }
                      },

                    ]
                  },

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
  'SetValueField': StringField;
  'ConfigurationBox': TabBox;
  'PropertiesTab': TabItem;
  'PropertiesBox': GroupBox;
  'SetValueFieldBox': GroupBox;
  'SetValueButton': Button;
  'SelectOnSetValueField': CheckBoxField;
  'EnableField': CheckBoxField;
  'SoftTabsField': CheckBoxField;
  'ShowPrintMarginField': CheckBoxField;
  'HighlightActiveLineField': CheckBoxField;
  'WrapModeField': CheckBoxField;
  'ThemeField': SmartField<string>;
  'ModeField': SmartField<string>;
  'ActionsTab': TabItem;
  'EventsTab': EventsTab;
} & EventsTabWidgetMap;
