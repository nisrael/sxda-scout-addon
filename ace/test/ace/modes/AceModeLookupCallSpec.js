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
import {AceModeLookupCall} from '../../../src/ace/modes/AceModeLookupCall';
import {scout} from '@eclipse-scout/core';

/**
 * Tests for AceModeLookupCall
 *
 * This demonstrates testing lookup calls (similar to dropdown/combobox data)
 */
describe('AceModeLookupCallSpec', () => {

  let session;
  let lookupCall;

  beforeEach(() => {
    setFixtures(sandbox());
    session = sandboxSession();
    lookupCall = scout.create(AceModeLookupCall, {
      session: session
    });
  });

  describe('data retrieval', () => {

    it('returns array of modes', () => {
      let data = lookupCall._data();

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('each mode has id and name', () => {
      let data = lookupCall._data();

      data.forEach(mode => {
        expect(mode.length).toBe(2); // [id, name]
        expect(mode[0]).toBeDefined(); // id
        expect(mode[1]).toBeDefined(); // name
        expect(typeof mode[0]).toBe('string');
        expect(typeof mode[1]).toBe('string');
      });
    });

    it('includes common programming languages', () => {
      let data = lookupCall._data();
      let modeIds = data.map(mode => mode[0]);

      // Check for some common modes
      expect(modeIds).toContain('java');
      expect(modeIds).toContain('javascript');
      expect(modeIds).toContain('json');
      expect(modeIds).toContain('text');
    });

    it('modes have non-empty names', () => {
      let data = lookupCall._data();

      data.forEach(mode => {
        expect(mode[1].length).toBeGreaterThan(0);
      });
    });

    it('mode ids are lowercase', () => {
      let data = lookupCall._data();

      data.forEach(mode => {
        let id = mode[0];
        expect(id).toBe(id.toLowerCase());
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

    it('can look up specific mode by key', (done) => {
      lookupCall.cloneForKey('java')
        .execute()
        .then(result => {
          expect(result.lookupRows.length).toBe(1);
          expect(result.lookupRows[0].key).toBe('java');
          expect(result.lookupRows[0].text).toBe('Java');
          done();
        })
        .catch(done.fail);
    });

    it('can search modes by text', (done) => {
      lookupCall.cloneForText('Java')
        .execute()
        .then(result => {
          expect(result.lookupRows.length).toBeGreaterThan(0);
          // Results should include 'Java' and possibly 'JavaScript'
          let hasJava = result.lookupRows.some(row => row.key === 'java');
          expect(hasJava).toBe(true);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('lookup call configuration', () => {

    it('provides data for all modes', () => {
      let data = lookupCall._data();
      expect(data.length).toBeGreaterThan(10);
    });

    it('can clone for key lookup', () => {
      let cloned = lookupCall.cloneForKey('python');
      expect(cloned).toBeDefined();
      expect(cloned.key).toBe('python');
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
