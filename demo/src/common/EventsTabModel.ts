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
import {Button, FormField, GroupBoxModel, LabelField, StringField, TabItem} from '@eclipse-scout/core';

export default (): GroupBoxModel => ({
  id: 'sxda.EventsTab',
  objectType: TabItem,
  label: 'Events',
  gridColumnCount: 1,
  fields: [
    {
      id: 'EventsOverviewField',
      objectType: LabelField,
      labelVisible: false,
      htmlEnabled: true,
      wrapText: true,
      gridDataHints: {
        useUiHeight: true
      }
    },
    {
      id: 'EventLogField',
      objectType: StringField,
      label: '${textKey:EventLog}',
      labelPosition: FormField.LabelPosition.TOP,
      enabled: false,
      multilineText: true,
      checkSaveNeeded: false,
      gridDataHints: {
        h: 3
      }
    },
    {
      id: 'ClearEventLogButton',
      objectType: Button,
      label: '${textKey:ClearEventLog}',
      displayStyle: 3,
      processButton: false
    }
  ]
});

export type EventsTabWidgetMap = {
  'EventsOverviewField': LabelField;
  'EventLogField': StringField;
  'ClearEventLogButton': Button;
};
