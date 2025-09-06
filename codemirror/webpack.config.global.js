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
module.exports = (env, args) => {
  const config = baseConfig(env, args);
  return {
    ...config,
    entry: {
      'sxda-scout-addon-codemirror': './src/index.ts',
      'codemirror-theme': './src/codemirror-theme.less',
      'codemirror-theme-dark': './src/codemirror-theme-dark.less',
    },
    optimization: {
      ...config.optimization,
      splitChunks: undefined // disable splitting
    },
    externals: {
      ...config.externals,
      'jquery': 'jQuery',
      '@eclipse-scout/core': 'scout',
      '@codemirror/autocomplete': 'autocomplete',
      '@codemirror/commands': 'commands',
      '@codemirror/lang-java': 'langJava',
      '@codemirror/lang-javascript': 'langJavascript',
      '@codemirror/lang-json': 'langJson',
      '@codemirror/lang-markdown': 'langMarkdown',
      '@codemirror/language"': 'language',
      '@codemirror/language-data': 'languageData',
      'thememirror': 'thememirror',
      '@codemirror/lint': 'lint',
      '@codemirror/state': 'state',
      '@codemirror/view"': 'view',
    }
  };
};
