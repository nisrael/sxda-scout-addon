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

import {
  Button,
  CheckBoxField,
  FormModel,
  GroupBox,
  NumberField,
  SequenceBox,
  SliderField,
  SmartField,
  StringField,
  TabBox,
  TabItem,
  WidgetField
} from '@eclipse-scout/core';
import {EventsTab, EventsTabWidgetMap} from '../index';
import {MonacoField} from "../../../monaco/src";

export default (): FormModel => ({
  id: 'sxda.MonacoForm',
  displayHint: 'view',
  rootGroupBox: {
    id: 'MainBox',
    objectType: GroupBox,
    scrollable: true,
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
              heightInPixel: 500,
              fillVertical: true
            },
            fieldWidget: {
              id: 'MonacoField',
              objectType: MonacoField,
              language: 'javascript',
              theme: 'vs-dark',
              value: `// Welcome to Monaco Editor!\nfunction greet(name) {\n  console.log('Hello, ' + name + '!');\n}\n\ngreet('World');`
            }
          }
        ]
      },
      {
        id: 'ConfigurationBox',
        objectType: TabBox,
        cssClass: 'jswidgets-configuration',
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
                  },
                  {
                    id: 'UpdateDisplayTextOnModifyField',
                    objectType: CheckBoxField,
                    label: 'Update Display Text On Modify'
                  },
                  {
                    id: 'LanguageField',
                    objectType: SmartField<string>,
                    label: 'Language',
                    lookupCall: {
                      objectType: 'StaticLookupCall',
                      data: [
                        ['plaintext', 'Plain Text'],
                        ['javascript', 'JavaScript'],
                        ['typescript', 'TypeScript'],
                        ['json', 'JSON'],
                        ['html', 'HTML'],
                        ['css', 'CSS'],
                        ['java', 'Java'],
                        ['python', 'Python'],
                        ['markdown', 'Markdown']
                      ]
                    }
                  },
                  {
                    id: 'ThemeField',
                    objectType: SmartField<string>,
                    label: 'Theme',
                    lookupCall: {
                      objectType: 'StaticLookupCall',
                      data: [
                        ['vs', 'Visual Studio Light'],
                        ['vs-dark', 'Visual Studio Dark'],
                        ['hc-black', 'High Contrast Dark'],
                        ['hc-light', 'High Contrast Light']
                      ]
                    }
                  },
                  {
                    id: 'LineNumbersField',
                    objectType: CheckBoxField,
                    label: 'Line Numbers'
                  },
                  {
                    id: 'MinimapField',
                    objectType: CheckBoxField,
                    label: 'Minimap'
                  },
                  {
                    id: 'WordWrapField',
                    objectType: CheckBoxField,
                    label: 'Word Wrap'
                  },
                  {
                    id: 'FoldingField',
                    objectType: CheckBoxField,
                    label: 'Code Folding'
                  },
                  {
                    id: 'FontSizeField',
                    objectType: SliderField,
                    label: 'Font Size',
                    minValue: 8,
                    maxValue: 32
                  },
                  {
                    id: 'TabSizeField',
                    objectType: NumberField,
                    label: 'Tab Size',
                    minValue: 1,
                    maxValue: 8
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

export type MonacoFormWidgetMap = {
  'MainBox': GroupBox;
  'DetailBox': GroupBox;
  'WidgetField': WidgetField;
  'MonacoField': MonacoField;
  'SetValueField': StringField;
  'ConfigurationBox': TabBox;
  'PropertiesTab': TabItem;
  'PropertiesBox': GroupBox;
  'SetValueFieldBox': GroupBox;
  'SetValueButton': Button;
  'EnableField': CheckBoxField;
  'UpdateDisplayTextOnModifyField': CheckBoxField;
  'LanguageField': SmartField<string>;
  'ThemeField': SmartField<string>;
  'LineNumbersField': CheckBoxField;
  'MinimapField': CheckBoxField;
  'WordWrapField': CheckBoxField;
  'FoldingField': CheckBoxField;
  'FontSizeField': SliderField;
  'TabSizeField': NumberField;
  'ActionsTab': TabItem;
  'EventsTab': EventsTab;
} & EventsTabWidgetMap;
