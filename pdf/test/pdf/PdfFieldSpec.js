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
import {PdfField} from '../../src/index';
import {scout} from '@eclipse-scout/core';

describe('PdfFieldSpec', () => {

  let session;

  beforeEach(() => {
    setFixtures(sandbox());
    session = sandboxSession();
  });

  describe('initialization', () => {

    it('creates field with default properties', () => {
      let field = new PdfField();

      expect(field.pdfSource).toBe(null);
      expect(field.zoomLevel).toBe('auto');
      expect(field.pageNumber).toBe(1);
      expect(field.showToolbar).toBe(true);
    });

    it('accepts configuration via Scout model', () => {
      let field = scout.create(PdfField, {
        parent: session.desktop,
        pdfSource: 'test.pdf',
        zoomLevel: '1.5',
        pageNumber: 2
      });

      expect(field.pdfSource).toBe('test.pdf');
      expect(field.zoomLevel).toBe('1.5');
      expect(field.pageNumber).toBe(2);
    });
  });

  describe('rendering', () => {

    it('creates required DOM structure', () => {
      let field = scout.create(PdfField, {
        parent: session.desktop
      });
      field.render();

      expect(field.$container).toBeDefined();
      expect(field.$container.hasClass('pdf-field')).toBe(true);
      expect(field.$field).toBeDefined();
    });
  });
});
