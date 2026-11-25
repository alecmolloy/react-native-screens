const { getDefaultConfig } = require("@react-native/metro-config");
const config = getDefaultConfig(__dirname);
config.maxWorkers = 3;
config.resolver.useWatchman = false;
module.exports = config;
