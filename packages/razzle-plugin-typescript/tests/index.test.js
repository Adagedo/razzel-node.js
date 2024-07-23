'use strict';

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const createRazzleTestConfig = require('razzle/config/createRazzleTestConfig');
const plugin = require('../index');
const { babelLoaderFinder, tsLoaderFinder } = require('../helpers');

describe('razzle-typescript-plugin', () => {
  describe('with useBabel=false', () => {
    let config;
    beforeAll(async done => {
      config = await createRazzleTestConfig('web', 'dev', {
        plugins: [{ object: plugin, options: { useBabel: false } }],
      });
      done();
    });

    it('should add .ts and .tsx to extensions', () => {
      expect(config.resolve.extensions).toContain('.ts');
      expect(config.resolve.extensions).toContain('.tsx');
    });

    it('should add ts-loader', () => {
      const rule = config.module.rules.find(tsLoaderFinder);
      expect(rule).not.toBeUndefined();
    });

    it('should add fork-ts-checker-webpack-plugin', () => {
      const tsCheckerPlugin = config.plugins.find(
        plugin => plugin instanceof ForkTsCheckerWebpackPlugin
      );

      expect(tsCheckerPlugin).not.toBeUndefined();
    });

    it('should remove babel-loader', () => {
      const rule = config.module.rules.find(babelLoaderFinder);
      expect(rule).toBeUndefined();
    });
  });

  describe('with useBabel=true', () => {
    let config;
    beforeAll(async done => {
      config = await createRazzleTestConfig('web', 'dev', {
        plugins: [{ object: plugin, options: { useBabel: true } }],
      });
      done();
    });

    it('should keep babel-loader', () => {
      const rule = config.module.rules.find(babelLoaderFinder);
      expect(rule).not.toBeUndefined();
    });

    it('should add babel-loader to .ts and .tsx files too', () => {
      const tsLoader = config.module.rules.find(tsLoaderFinder);
      const babelLoader = tsLoader.use.find(babelLoaderFinder);

      expect(babelLoader).not.toBeUndefined();
    });
  });

  describe('when creating a server config', () => {
    let config;
    beforeAll(async done => {
      config = await createRazzleTestConfig('node', 'dev', {
        disableStartServer: true,
        plugins: [{ object: plugin, options: {} }],
      });
      done();
    });

    it('should not add fork-ts-checker-webpack-plugin', () => {
      const tsCheckerPlugin = config.plugins.find(
        plugin => plugin instanceof ForkTsCheckerWebpackPlugin
      );

      expect(tsCheckerPlugin).toBeUndefined();
    });
  });
});
