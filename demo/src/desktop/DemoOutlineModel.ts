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
import {Outline, OutlineModel, PageWithNodes} from '@eclipse-scout/core';
import {AceForm, DemoOutline} from '../index';

export default (): OutlineModel => ({
  id: 'DemoOutline',
  title: 'Addon Widgets Demo',
  objectType: Outline,
  nodes: [
    {
      objectType: PageWithNodes,
      id: 'AcePage',
      leaf: true,
      text: 'AceField',
      detailForm: {
        objectType: AceForm,
      },
      detailTableVisible: false
    }
  ]
});

export type DemoOutlineWidgetMap = {
  'DemoOutline': DemoOutline;
};
