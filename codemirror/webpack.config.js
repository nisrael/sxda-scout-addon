/*
 * Copyright (c) 2010-2024 BSI Business Systems Integration AG
 * Copyright (c) 2023-2024 Nils Israel
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
module.exports = (env, args) => {
  args.resDirArray = [];
  if (args.run === 'global') {
    return require('./webpack.config.global.js')(env, args);
  }
  const baseConfig = require('@eclipse-scout/cli/scripts/webpack-defaults');
  const config = baseConfig(env, args);
  let libraryConfig = baseConfig.libraryConfig(config);
  libraryConfig.entry = {
    'sxda-scout-addon-codemirror.esm': './src/index.ts'
  };
    return libraryConfig;
};
