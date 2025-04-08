export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};