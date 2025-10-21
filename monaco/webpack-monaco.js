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
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

/**
 * Adds Monaco Editor support to a webpack configuration.
 *
 * This function configures webpack to properly bundle Monaco Editor by:
 * - Adding CSS and font file loaders
 * - Configuring the MonacoWebpackPlugin with the specified languages and features
 *
 * @param {object} config - The webpack configuration object to modify
 * @param {object} options - Monaco configuration options
 * @param {string[]} options.languages - Array of language IDs to include (default: common web languages)
 * @param {string[]} options.features - Array of feature IDs to include/exclude (prefix with ! to exclude)
 * @returns {object} The modified webpack configuration
 *
 * @example
 * const baseConfig = require('@eclipse-scout/cli/scripts/webpack-defaults');
 * const addMonacoSupport = require('@sxda/scout-addon-monaco/webpack-monaco');
 *
 * module.exports = (env, args) => {
 *   const config = baseConfig(env, args);
 *   return addMonacoSupport(config, {
 *     languages: ['typescript', 'javascript', 'json'],
 *     features: ['!gotoSymbol']
 *   });
 * };
 */
module.exports = function addMonacoSupport(config, options = {}) {
  const defaultOptions = {
    languages: ['typescript', 'javascript', 'json', 'html', 'css', 'markdown', 'java', 'python'],
    features: ['!gotoSymbol']
  };

  const monacoOptions = {
    ...defaultOptions,
    ...options
  };

  // Add CSS loader for Monaco's styles
  config.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  });

  // Add asset module for Monaco's fonts (webpack 5 built-in)
  config.module.rules.push({
    test: /\.ttf$/,
    type: 'asset/resource'
  });

  // Add Monaco webpack plugin
  config.plugins.push(
    new MonacoWebpackPlugin(monacoOptions)
  );

  // Exclude Monaco Editor from source-map-loader to prevent missing source map warnings
  // Monaco's ESM distribution references source maps that don't exist in the published package
  config.module.rules = config.module.rules.map(rule => {
    let hasSourceMapLoader = false;

    // Check if this rule uses source-map-loader in various forms
    if (rule.use && Array.isArray(rule.use)) {
      hasSourceMapLoader = rule.use.some(loader => {
        if (typeof loader === 'string') {
          return loader.includes('source-map-loader');
        }
        if (typeof loader === 'object' && loader.loader) {
          return loader.loader.includes('source-map-loader');
        }
        return false;
      });
    }

    // Check for loader property (string form)
    if (rule.loader && rule.loader.includes('source-map-loader')) {
      hasSourceMapLoader = true;
    }

    if (hasSourceMapLoader) {
      return {
        ...rule,
        exclude: [
          ...(Array.isArray(rule.exclude) ? rule.exclude : rule.exclude ? [rule.exclude] : []),
          /node_modules[\\/]monaco-editor/
        ]
      };
    }

    return rule;
  });

  return config;
};
