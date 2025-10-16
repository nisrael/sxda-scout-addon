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
import {LanguagesLookupCall} from '../../../src/codemirror/languages/LanguagesLookupCall';
import {scout} from '@eclipse-scout/core';

/**
 * Tests for LanguagesLookupCall
 *
 * This demonstrates testing lookup calls (similar to dropdown/combobox data)
 */
describe('LanguagesLookupCallSpec', () => {

  let session;
  let lookupCall;

  beforeEach(() => {
    setFixtures(sandbox());
    session = sandboxSession();
    lookupCall = scout.create(LanguagesLookupCall, {
      session: session
    });
  });

  describe('data retrieval', () => {

    it('returns array of languages', () => {
      let data = lookupCall._data();

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('each language has id and name', () => {
      let data = lookupCall._data();

      data.forEach(language => {
        expect(language.length).toBe(2); // [id, name]
        expect(language[0]).toBeDefined(); // id
        expect(language[1]).toBeDefined(); // name
        expect(typeof language[0]).toBe('string');
        expect(typeof language[1]).toBe('string');
      });
    });

    it('includes None as first option', () => {
      let data = lookupCall._data();

      expect(data[0][0]).toBe('None');
      expect(data[0][1]).toBe('None');
    });

    it('includes common programming languages', () => {
      let data = lookupCall._data();
      let languageIds = data.map(language => language[0]);

      // Check for some common languages from CodeMirror language-data
      expect(languageIds).toContain('JavaScript');
      expect(languageIds).toContain('Java');
      expect(languageIds).toContain('JSON');
    });

    it('languages have non-empty names', () => {
      let data = lookupCall._data();

      data.forEach(language => {
        expect(language[1].length).toBeGreaterThan(0);
      });
    });

    it('languages are sorted alphabetically (except None)', () => {
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

    it('can look up specific language by key', (done) => {
      lookupCall.cloneForKey('JavaScript')
        .execute()
        .then(result => {
          expect(result.lookupRows.length).toBe(1);
          expect(result.lookupRows[0].key).toBe('JavaScript');
          expect(result.lookupRows[0].text).toBe('JavaScript');
          done();
        })
        .catch(done.fail);
    });

    it('can search languages by text', (done) => {
      lookupCall.cloneForText('Java')
        .execute()
        .then(result => {
          expect(result.lookupRows.length).toBeGreaterThan(0);
          // Results should include 'Java' and possibly 'JavaScript'
          let hasJava = result.lookupRows.some(row => row.key === 'Java');
          expect(hasJava).toBe(true);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('lookup call configuration', () => {

    it('provides data for multiple languages', () => {
      let data = lookupCall._data();
      // Should have None plus many CodeMirror languages
      expect(data.length).toBeGreaterThan(10);
    });

    it('can clone for key lookup', () => {
      let cloned = lookupCall.cloneForKey('Python');
      expect(cloned).toBeDefined();
      expect(cloned.key).toBe('Python');
    });

    it('can clone for text lookup', () => {
      let cloned = lookupCall.cloneForText('Python');
      expect(cloned).toBeDefined();
      // The cloned lookup call is configured for text search
      // We can verify it works by executing it
      expect(cloned.execute).toBeDefined();
    });
  });
});
