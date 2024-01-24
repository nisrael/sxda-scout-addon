import {scout, App, ObjectFactory} from '@eclipse-scout/core';
import {Desktop} from './desktop/Desktop'

import * as self from './index';

export * from './desktop/Desktop'
export * from './desktop/DemoOutline'
export * from './common/EventsTab'
export * from './common/EventsTabModel'
export * from './ace/AceFormModel'
export * from './ace/AceForm'
export * from './ace/AceThemeLookupCall'
export * from './ace/AceModeLookupCall'


scout.addObjectFactories({
  'Desktop': function () {
    return new Desktop();
  }
});

ObjectFactory.get().registerNamespace('sxda', self);

new App().init({
  bootstrap: {
    textsUrl: 'texts.json',
    localesUrl: 'locales.json'
  }
});
