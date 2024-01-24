import {Outline, OutlineModel} from '@eclipse-scout/core';
import DemoOutlineModel, {DemoOutlineWidgetMap} from './DemoOutlineModel';

export class DemoOutline extends Outline {
  declare widgetMap: DemoOutlineWidgetMap;

  protected override _jsonModel(): OutlineModel {
    return DemoOutlineModel();
  }
}
