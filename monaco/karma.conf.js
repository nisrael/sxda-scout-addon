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
const baseConfig = require('@eclipse-scout/cli/scripts/karma-defaults');
const path = require('path');

module.exports = (config, specEntryPoint) => {
  baseConfig(config, specEntryPoint);

  // Get current configuration after baseConfig has been applied
  const currentConfig = config;

  // Extend existing reporters array
  currentConfig.reporters = currentConfig.reporters || [];
  if (!currentConfig.reporters.includes('coverage')) {
    currentConfig.reporters.push('coverage');
  }

  // Extend existing plugins array
  currentConfig.plugins = currentConfig.plugins || [];
  currentConfig.plugins.push(require('karma-coverage'));

  // Add coverage configuration
  currentConfig.coverageReporter = {
    dir: 'target/coverage',
    reporters: [
      { type: 'html', subdir: 'html' },
      { type: 'lcovonly', subdir: 'lcov' },
      { type: 'text-summary' },
      { type: 'json', subdir: 'json' }
    ]
  };

  // Configure webpack for coverage instrumentation
  if (currentConfig.webpack) {
    currentConfig.webpack.devtool = 'inline-source-map';

    // Add istanbul loader for source files (not test files)
    currentConfig.webpack.module = currentConfig.webpack.module || {};
    currentConfig.webpack.module.rules = currentConfig.webpack.module.rules || [];

    // Add CSS loader for Monaco Editor's imported CSS files
    // During tests, we just need to process the CSS without injecting it
    currentConfig.webpack.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: false,
            sourceMap: false
          }
        }
      ]
    });

    // Add post-processing rule for coverage instrumentation
    currentConfig.webpack.module.rules.push({
      test: /\.ts$/,
      include: path.resolve('src/'),
      exclude: [/node_modules/, /\.spec\.ts$/],
      enforce: 'post',
      use: {
        loader: '@jsdevtools/coverage-istanbul-loader',
        options: { esModules: true }
      }
    });
  }
};
