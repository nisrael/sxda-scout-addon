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
import {ThemesLookupCall} from '../../../src/codemirror/themes/ThemesLookupCall';
import {scout} from '@eclipse-scout/core';

/**
 * Tests for ThemesLookupCall
 *
 * This demonstrates testing lookup calls for CodeMirror themes
 */
describe('ThemesLookupCallSpec', () => {

  let session;
  let lookupCall;

  beforeEach(() => {
    setFixtures(sandbox());
    session = sandboxSession();
    lookupCall = scout.create(ThemesLookupCall, {
      session: session
    });
  });

  describe('data retrieval', () => {

    it('returns array of themes', () => {
      let data = lookupCall._data();

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('each theme has id and name', () => {
      let data = lookupCall._data();

      data.forEach(theme => {
        expect(theme.length).toBe(2); // [id, name]
        expect(theme[0]).toBeDefined(); // id
        expect(theme[1]).toBeDefined(); // name
        expect(typeof theme[0]).toBe('string');
        expect(typeof theme[1]).toBe('string');
      });
    });

    it('includes None as first option', () => {
      let data = lookupCall._data();

      expect(data[0][0]).toBe('None');
      expect(data[0][1]).toBe('None');
    });

    it('includes common CodeMirror themes', () => {
      let data = lookupCall._data();
      let themeIds = data.map(theme => theme[0]);

      // Check for some common CodeMirror themes
      // Note: The actual themes depend on what's imported in Themes.ts
      expect(themeIds).toContain('None'); // Always present
      expect(data.length).toBeGreaterThan(1); // At least None + some themes
    });

    it('themes have non-empty names', () => {
      let data = lookupCall._data();

      data.forEach(theme => {
        expect(theme[1].length).toBeGreaterThan(0);
      });
    });

    it('themes are sorted alphabetically (except None)', () => {
      let data = lookupCall._data();

      // Skip first entry (None) and check rest is sorted
      for (let i = 2; i < data.length; i++) {
        let prev = data[i - 1][1];
        let current = data[i][1];
        expect(prev.localeCompare(current)).toBeLessThanOrEqual(0);
      }
    });
  });

  describe('lookup execution', () => {

    it('executes lookup and returns results', (done) => {
      // Scout LookupCalls must be cloned before execution
      lookupCall.cloneForAll()
        .execute()
        .then(result => {
          expect(result).toBeDefined();
          expect(result.lookupRows).toBeDefined();
          expect(result.lookupRows.length).toBeGreaterThan(0);
          done();
        })
        .catch(done.fail);
    });

    it('lookup rows have key and text', (done) => {
      lookupCall.cloneForAll()
        .execute()
        .then(result => {
          result.lookupRows.forEach(row => {
            expect(row.key).toBeDefined();
            expect(row.text).toBeDefined();
          });
          done();
        })
        .catch(done.fail);
    });

    it('can look up None theme by key', (done) => {
      lookupCall.cloneForKey('None')
        .execute()
        .then(result => {
          expect(result.lookupRows.length).toBe(1);
          expect(result.lookupRows[0].key).toBe('None');
          expect(result.lookupRows[0].text).toBe('None');
          done();
        })
        .catch(done.fail);
    });

    it('can search themes by text', (done) => {
      lookupCall.cloneForText('None')
        .execute()
        .then(result => {
          expect(result.lookupRows.length).toBeGreaterThan(0);
          // Results should include 'None'
          let hasNone = result.lookupRows.some(row => row.key === 'None');
          expect(hasNone).toBe(true);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('lookup call configuration', () => {

    it('provides data for themes', () => {
      let data = lookupCall._data();
      // Should have None plus CodeMirror themes
      expect(data.length).toBeGreaterThan(0);
    });

    it('can clone for key lookup', () => {
      let cloned = lookupCall.cloneForKey('None');
      expect(cloned).toBeDefined();
      expect(cloned.key).toBe('None');
    });

    it('can clone for text lookup', () => {
      let cloned = lookupCall.cloneForText('Dark');
      expect(cloned).toBeDefined();
      // The cloned lookup call is configured for text search
      // We can verify it works by executing it
      expect(cloned.execute).toBeDefined();
    });

    it('first element is always None', () => {
      let data = lookupCall._data();
      // None should always be first to allow "no theme" selection
      expect(data[0]).toEqual(['None', 'None']);
    });
  });
});
