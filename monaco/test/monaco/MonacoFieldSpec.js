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
import {MonacoField} from '../../src/index';

describe('MonacoFieldSpec', () => {

  afterEach(() => {
    // Remove all beforeunload listeners
    // FIXME find out which plugin is responsible for the popup
    //  "Seite verlassen? Deine Änderungen werden evtl. nicht gespeichert."
    // which leads to
    // Chrome 141.0.0.0 (Mac OS 10.15.7) ERROR
    //   Some of your tests did a full page reload!
    // and ExitStatus 3
    window.onbeforeunload = null;
  });

  describe('click and check', () => {

    it('touch', () => {
      let monacoField = new MonacoField();

      monacoField.touch();

      expect(monacoField.touched).toEqual(true);

    });
  });
});
