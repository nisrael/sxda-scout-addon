/*
 * Copyright (c) 2010-2023 BSI Business Systems Integration AG
 * Copyright (c) 2023 Nils Israel
 *
 * This program is based on work from the Eclipse Scout Project
 * https://www.eclipse.org/scout/ and provides an extension for it.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */
const baseConfig = require('@eclipse-scout/cli/scripts/webpack-defaults');
module.exports = (env, args) => {
  const config = baseConfig(env, args);
  // This build creates resources that can directly be included in a html file without needing a build stack (webpack, babel etc.).
  // The resources are available by a CDN that provides npm modules (e.g. https://www.jsdelivr.com/package/npm/@eclipse-scout/core)

  return {
    ...config,
    entry: {
      'sxda-scout-addon-ace': './src/index.ts'
    },
    optimization: {
      ...config.optimization,
      splitChunks: undefined // disable splitting
    },
    externals: {
      ...config.externals,
      'jquery': 'jQuery',
      'ace-builds': 'ace',
      'ace-builds/esm-resolver': 'ace',
      '@eclipse-scout/core': 'scout'
    }
  };
};
