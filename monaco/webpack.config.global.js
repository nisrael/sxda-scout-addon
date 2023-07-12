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
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const baseConfig = require('@eclipse-scout/cli/scripts/webpack-defaults');
const {push} = require("karma/lib/init/log-queue");
module.exports = (env, args) => {
  const config = baseConfig(env, args);
  config.plugins.push(new MonacoWebpackPlugin());
  config.module.rules.push(
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.ttf$/,
      use: ['file-loader']
    }
  );
  // This build creates resources that can directly be included in a html file without needing a build stack (webpack, babel etc.).
  // The resources are available by a CDN that provides npm modules (e.g. https://www.jsdelivr.com/package/npm/@eclipse-scout/core)
  return {
    ...config,
    entry: {
      'sxda-scout-addon-monaco': './src/index.ts'
    },
    optimization: {
      ...config.optimization,
      splitChunks: undefined // disable splitting
    },
    externals: {
      ...config.externals,
      'jquery': 'jQuery',
      '@eclipse-scout/core': 'scout'
    }
  };
};
