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
  SequenceBox,
  StringField,
  TabBox,
  TabItem,
  WidgetField
} from '@eclipse-scout/core';
import {EventsTab, EventsTabWidgetMap} from '../index';
import {PdfField} from "../../../pdf/src";

export default (): FormModel => ({
  id: 'sxda.PdfForm',
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
              heightInPixel: 600,
              fillVertical: true
            },
            fieldWidget: {
              id: 'PdfField',
              objectType: PdfField,
              pdfSource: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
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
                    id: 'ShowToolbarField',
                    objectType: CheckBoxField,
                    label: 'Show Toolbar'
                  },
                  {
                    id: 'EnablePrintField',
                    objectType: CheckBoxField,
                    label: 'Enable Print'
                  },
                  {
                    id: 'EnableDownloadField',
                    objectType: CheckBoxField,
                    label: 'Enable Download'
                  },
                  {
                    id: 'PdfSourceFieldBox',
                    objectType: SequenceBox,
                    label: 'PDF Source',
                    fields: [
                      {
                        id: 'PdfSourceField',
                        objectType: StringField,
                        gridDataHints: {
                          weightX: 1
                        }
                      },
                      {
                        id: 'LoadPdfButton',
                        objectType: Button,
                        label: 'Load PDF',
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

export type PdfFormWidgetMap = {
  'MainBox': GroupBox;
  'DetailBox': GroupBox;
  'WidgetField': WidgetField;
  'PdfField': PdfField;
  'PdfSourceField': StringField;
  'ConfigurationBox': TabBox;
  'PropertiesTab': TabItem;
  'PropertiesBox': GroupBox;
  'PdfSourceFieldBox': GroupBox;
  'LoadPdfButton': Button;
  'EnableField': CheckBoxField;
  'ShowToolbarField': CheckBoxField;
  'EnablePrintField': CheckBoxField;
  'EnableDownloadField': CheckBoxField;
  'EventsTab': EventsTab;
} & EventsTabWidgetMap;
