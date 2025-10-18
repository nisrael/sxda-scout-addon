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
  StringField,
  TabBox,
  TabItem,
  WidgetField
} from '@eclipse-scout/core';
import {EventsTab, EventsTabWidgetMap} from '../index';

export default (): FormModel => ({
  id: 'sxda.StringFieldForm',
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
              id: 'StringField',
              objectType: StringField,
              multilineText: true,
              label: 'Multi-line StringField'
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
                    id: 'MultilineField',
                    objectType: CheckBoxField,
                    label: 'Multiline Text'
                  },
                  {
                    id: 'SpellCheckEnabledField',
                    objectType: CheckBoxField,
                    label: 'Spell Check Enabled'
                  },
                  {
                    id: 'TrimTextField',
                    objectType: CheckBoxField,
                    label: 'Trim Text'
                  },
                  {
                    id: 'WrapTextField',
                    objectType: CheckBoxField,
                    label: 'Wrap Text'
                  },
                  {
                    id: 'SelectionTrackingEnabledField',
                    objectType: CheckBoxField,
                    label: 'Selection Tracking Enabled'
                  },
                  {
                    id: 'InputMaskedField',
                    objectType: CheckBoxField,
                    label: 'Input Masked (Password)'
                  },
                  {
                    id: 'MaxLengthField',
                    objectType: NumberField,
                    label: 'Max Length'
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
                      }
                    ]
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

export type StringFieldFormWidgetMap = {
  'MainBox': GroupBox;
  'DetailBox': GroupBox;
  'WidgetField': WidgetField;
  'StringField': StringField;
  'SetValueField': StringField;
  'ConfigurationBox': TabBox;
  'PropertiesTab': TabItem;
  'PropertiesBox': GroupBox;
  'SetValueFieldBox': GroupBox;
  'SetValueButton': Button;
  'SelectionTrackingEnabledField': CheckBoxField;
  'InputMaskedField': CheckBoxField;
  'EnableField': CheckBoxField;
  'UpdateDisplayTextOnModifyField': CheckBoxField;
  'MultilineField': CheckBoxField;
  'SpellCheckEnabledField': CheckBoxField;
  'TrimTextField': CheckBoxField;
  'WrapTextField': CheckBoxField;
  'MaxLengthField': NumberField;
  'ActionsTab': TabItem;
  'EventsTab': EventsTab;
} & EventsTabWidgetMap;
