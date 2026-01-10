const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// 1. Watch the workspace root (parent folder) so it sees your library code
config.watchFolders = [workspaceRoot];

// 2. Force Metro to resolve node_modules from the Example app first, then the parent
// This prevents "Duplicate React" errors if dependencies exist in both places.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Ensure the library name resolves to the parent folder
// (This is useful if your package.json name doesn't match the folder structure perfectly)
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'react-native-wallpaper': workspaceRoot,
};

module.exports = config;
