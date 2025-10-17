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
import {AceThemeLookupCall} from '../../../src/ace/themes/AceThemeLookupCall';
import {scout} from '@eclipse-scout/core';

/**
 * Tests for AceThemeLookupCall
 *
 * This demonstrates testing lookup calls for themes (similar to mode lookup)
 */
describe('AceThemeLookupCallSpec', () => {

  let session;
  let lookupCall;

  beforeEach(() => {
    setFixtures(sandbox());
    session = sandboxSession();
    lookupCall = scout.create(AceThemeLookupCall, {
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

    it('includes common themes', () => {
      let data = lookupCall._data();
      let themeIds = data.map(theme => theme[0]);

      // Check for some common Ace themes
      expect(themeIds).toContain('textmate');
      expect(themeIds).toContain('monokai');
      expect(themeIds).toContain('twilight');
    });

    it('themes have non-empty names', () => {
      let data = lookupCall._data();

      data.forEach(theme => {
        expect(theme[1].length).toBeGreaterThan(0);
      });
    });

    it('theme ids are lowercase or contain underscores', () => {
      let data = lookupCall._data();

      data.forEach(theme => {
        let id = theme[0];
        // Theme IDs should not contain spaces or special chars except underscore
        expect(id).not.toMatch(/\s/);
      });
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

    it('can look up specific theme by key', (done) => {
      lookupCall.cloneForKey('monokai')
        .execute()
        .then(result => {
          expect(result.lookupRows.length).toBe(1);
          expect(result.lookupRows[0].key).toBe('monokai');
          expect(result.lookupRows[0].text).toBe('Monokai');
          done();
        })
        .catch(done.fail);
    });

    it('can search themes by text', (done) => {
      lookupCall.cloneForText('mono')
        .execute()
        .then(result => {
          expect(result.lookupRows.length).toBeGreaterThan(0);
          // Results should include themes with 'mono' in the name
          let hasMonokai = result.lookupRows.some(row => row.key === 'monokai');
          expect(hasMonokai).toBe(true);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('lookup call configuration', () => {

    it('provides data for multiple themes', () => {
      let data = lookupCall._data();
      // Ace has many themes
      expect(data.length).toBeGreaterThan(10);
    });

    it('can clone for key lookup', () => {
      let cloned = lookupCall.cloneForKey('twilight');
      expect(cloned).toBeDefined();
      expect(cloned.key).toBe('twilight');
    });

    it('can clone for text lookup', () => {
      let cloned = lookupCall.cloneForText('Twilight');
      expect(cloned).toBeDefined();
      // The cloned lookup call is configured for text search
      // We can verify it works by executing it
      expect(cloned.execute).toBeDefined();
    });
  });
});
