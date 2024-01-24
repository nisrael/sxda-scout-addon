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
