module.exports = {
  preset: 'jest-expo',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native' +
      '|react-navigation-tabs' +
      '|react-native-splash-screen' +
      '|react-native-screens' +
      '|react-native-reanimated' +
      '|react-native-card-flip' +
      '|@react-navigation' +
      '|@react-native-community' +
      '|react-native-iphone-x-helper' +
      '/)',
      //"node_modules/(?!expo-file-system/)"
  ],
  coveragePathIgnorePatterns:[
    "node_modules/expo-file-system"
  ],
  "moduleNameMapper": {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  }
};
