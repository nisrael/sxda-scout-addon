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
const baseConfig = require('@eclipse-scout/cli/scripts/webpack-defaults');
const addMonacoSupport = require('./webpack-monaco');

module.exports = (env, args) => {
  const config = baseConfig(env, args);
  const configWithMonaco = addMonacoSupport(config);

  return {
    ...configWithMonaco,
    entry: {
      'sxda-scout-addon-monaco': './src/index.ts',
      'monaco-theme': './src/monaco-theme.less',
      'monaco-theme-dark': './src/monaco-theme-dark.less',
    },
    optimization: {
      ...configWithMonaco.optimization,
      splitChunks: undefined // disable splitting
    },
    externals: {
      ...configWithMonaco.externals,
      'jquery': 'jQuery',
      '@eclipse-scout/core': 'scout',
      'monaco-editor': 'monaco-editor'
    }
  };
};
