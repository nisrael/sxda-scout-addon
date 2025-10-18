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
  GroupBox, NumberField,
  SequenceBox,
  SmartField,
  StringField,
  TabBox,
  TabItem,
  WidgetField
} from '@eclipse-scout/core';
import {EventsTab, EventsTabWidgetMap} from '../index';
import {CodeMirrorField} from "../../../codemirror/src";
import {LanguagesLookupCall} from "../../../codemirror/src/codemirror/languages/LanguagesLookupCall";
import {ThemesLookupCall} from "../../../codemirror/src/codemirror/themes/ThemesLookupCall";

export default (): FormModel => ({
  id: 'sxda.CodeMirrorForm',
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
              id: 'CodeMirrorField',
              objectType: CodeMirrorField,
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
                    label: 'Mode',
                    lookupCall: LanguagesLookupCall
                  },
                  {
                    id: 'ThemeField',
                    objectType: SmartField<string>,
                    label: 'Theme',
                    lookupCall: ThemesLookupCall
                  },
                  {
                    id: 'SyntaxHighlightingField',
                    objectType: CheckBoxField,
                    label: 'Syntax Highlighting'
                  },
                  {
                    id: 'HighlightActiveLineField',
                    objectType: CheckBoxField,
                    label: 'Highlight Active Line'
                  },
                  {
                    id: 'TabSizeField',
                    objectType: NumberField,
                    label: 'TabSize'
                  },
                  {
                    id: 'LineNumbersField',
                    objectType: CheckBoxField,
                    label: 'lineNumbers'
                  },
                  {
                    id: 'HighlightActiveLineGutterField',
                    objectType: CheckBoxField,
                    label: 'highlightActiveLineGutter'
                  },
                  {
                    id: 'FoldGutterField',
                    objectType: CheckBoxField,
                    label: 'foldGutter'
                  },
                  {
                    id: 'DropCursorField',
                    objectType: CheckBoxField,
                    label: 'dropCursor'
                  },
                  {
                    id: 'AllowMultipleSelectionsField',
                    objectType: CheckBoxField,
                    label: 'allowMultipleSelections'
                  },
                  {
                    id: 'IndentOnInputField',
                    objectType: CheckBoxField,
                    label: 'indentOnInput'
                  },
                  {
                    id: 'BracketMatchingField',
                    objectType: CheckBoxField,
                    label: 'bracketMatching'
                  },
                  {
                    id: 'CloseBracketsField',
                    objectType: CheckBoxField,
                    label: 'closeBrackets'
                  },
                  {
                    id: 'AutocompletionField',
                    objectType: CheckBoxField,
                    label: 'autocompletion'
                  },
                  {
                    id: 'RectangularSelectionField',
                    objectType: CheckBoxField,
                    label: 'rectangularSelection'
                  },
                  {
                    id: 'CrosshairCursorField',
                    objectType: CheckBoxField,
                    label: 'crosshairCursor'
                  },
                  {
                    id: 'HighlightSelectionMatchesField',
                    objectType: CheckBoxField,
                    label: 'highlightSelectionMatches'
                  },
                  {
                    id: 'CloseBracketsKeymapField',
                    objectType: CheckBoxField,
                    label: 'closeBracketsKeymap'
                  },
                  {
                    id: 'SearchKeymapField',
                    objectType: CheckBoxField,
                    label: 'searchKeymap'
                  },
                  {
                    id: 'FoldKeymapField',
                    objectType: CheckBoxField,
                    label: 'foldKeymap'
                  },
                  {
                    id: 'CompletionKeymapField',
                    objectType: CheckBoxField,
                    label: 'completionKeymap'
                  },
                  {
                    id: 'LintKeymapField',
                    objectType: CheckBoxField,
                    label: 'lintKeymap'
                  },
                  {
                    id: 'HighlightSpecialCharsField',
                    objectType: CheckBoxField,
                    label: 'highlightSpecialChars'
                  },
                  {
                    id: 'HistoryField',
                    objectType: CheckBoxField,
                    label: 'history'
                  },
                  {
                    id: 'DrawSelectionField',
                    objectType: CheckBoxField,
                    label: 'drawSelection'
                  },
                  {
                    id: 'DefaultKeymapField',
                    objectType: CheckBoxField,
                    label: 'defaultKeymap'
                  },
                  {
                    id: 'HistoryKeymapField',
                    objectType: CheckBoxField,
                    label: 'historyKeymap'
                  },
                  {
                    id: 'IndentWithTabKeymapField',
                    objectType: CheckBoxField,
                    label: 'indentWithTabKeymap'
                  },
                  {
                    id: 'LineWrappingField',
                    objectType: CheckBoxField,
                    label: 'lineWrapping'
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

export type CodeMirrorFormWidgetMap = {
  'MainBox': GroupBox;
  'DetailBox': GroupBox;
  'WidgetField': WidgetField;
  'CodeMirrorField': CodeMirrorField;
  'SetValueField': StringField;
  'ConfigurationBox': TabBox;
  'PropertiesTab': TabItem;
  'PropertiesBox': GroupBox;
  'SetValueFieldBox': GroupBox;
  'SetValueButton': Button;
  'EnableField': CheckBoxField;
  'UpdateDisplayTextOnModifyField': CheckBoxField;
  'SyntaxHighlightingField': CheckBoxField;
  'HighlightActiveLineField': CheckBoxField;
  'LanguageField': SmartField<string>;
  'ThemeField': SmartField<string>;
  'TabSizeField': NumberField;
  'LineNumbersField': CheckBoxField;
  'HighlightActiveLineGutterField': CheckBoxField;
  'FoldGutterField': CheckBoxField;
  'DropCursorField': CheckBoxField;
  'AllowMultipleSelectionsField': CheckBoxField;
  'IndentOnInputField': CheckBoxField;
  'BracketMatchingField': CheckBoxField;
  'CloseBracketsField': CheckBoxField;
  'AutocompletionField': CheckBoxField;
  'RectangularSelectionField': CheckBoxField;
  'CrosshairCursorField': CheckBoxField;
  'HighlightSelectionMatchesField': CheckBoxField;
  'CloseBracketsKeymapField': CheckBoxField;
  'SearchKeymapField': CheckBoxField;
  'FoldKeymapField': CheckBoxField;
  'CompletionKeymapField': CheckBoxField;
  'LintKeymapField': CheckBoxField;
  'HighlightSpecialCharsField': CheckBoxField;
  'HistoryField': CheckBoxField;
  'DrawSelectionField': CheckBoxField;
  'DefaultKeymapField': CheckBoxField;
  'HistoryKeymapField': CheckBoxField;
  'IndentWithTabKeymapField': CheckBoxField;
  'LineWrappingField': CheckBoxField;
  'ActionsTab': TabItem;
  'EventsTab': EventsTab;
} & EventsTabWidgetMap;
