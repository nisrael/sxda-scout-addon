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
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = (env, args) => {
  args.resDirArray = [];
  if (args.run === 'global') {
    return require('./webpack.config.global.js')(env, args);
  }
  const baseConfig = require('@eclipse-scout/cli/scripts/webpack-defaults');
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
  let libraryConfig = baseConfig.libraryConfig(config);
  libraryConfig.entry = {
    'sxda-scout-addon-monaco': './src/index.ts'
  };
  return libraryConfig;
};
