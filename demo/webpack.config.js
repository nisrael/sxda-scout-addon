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
const baseConfig = require('@eclipse-scout/cli/scripts/webpack-defaults');
module.exports = (env, args) => {
  args.resDirArray = [
    './res',
    './node_modules/@eclipse-scout/core/res',
    './node_modules/@eclipse-scout/core/dist/locales.json',
    './node_modules/@eclipse-scout/core/dist/texts.json'
  ];
  const config = baseConfig(env, args);
  config.entry = {
    'sxda': './src/index.ts',
    'sxda-theme': './src/sxda-theme.less',
    'sxda-theme-dark': './src/sxda-theme-dark.less'
  };
  config.optimization = {
    ...config.optimization
  };
  return config;
};
