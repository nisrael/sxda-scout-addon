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
import {JasmineScout} from '@eclipse-scout/core/testing';

// Configure Monaco Environment for tests
// Monaco Editor requires this to handle web workers in test environment
self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    // Return empty blob URL to avoid network requests in tests
    // This prevents "Cannot read properties of undefined (reading 'toUrl')" errors
    return 'data:text/javascript;charset=utf-8,' + encodeURIComponent('self.onmessage = function() {};');
  }
};

let context = require.context('./', true, /[sS]pec\.js$/);
JasmineScout.runTestSuite(context);
