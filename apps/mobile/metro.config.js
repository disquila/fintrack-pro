const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

const monorepoRoot = path.resolve(__dirname, '../..');

config.watchFolders = [monorepoRoot];
config.resolver.nodeModulesPaths = [path.resolve(monorepoRoot, 'node_modules')];

module.exports = withNativeWind(config, { input: './global.css' });
