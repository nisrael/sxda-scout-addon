import {AceForm} from "../ace/AceForm";
import {Desktop} from "./Desktop";
import {DemoOutline} from "../index";


export default () => ({
  id: 'Desktop',
  objectType: Desktop,
  navigationHandleVisible: false,
  navigationVisible: true,
  headerVisible: false,
  outline: {
    objectType: DemoOutline
  },
});

export type DesktopWidgetMap = {
  'AceForm': AceForm;
  'Desktop': Desktop;
};
