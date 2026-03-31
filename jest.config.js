// jest.config.js
module.exports = {
  preset: "jest-expo",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  setupFilesAfterFramework: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|toastify-react-native|react-native-reanimated|react-native-worklets)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^react-native-reanimated$": "<rootDir>/node_modules/react-native-reanimated/mock",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};