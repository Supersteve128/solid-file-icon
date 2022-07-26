module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  preset: "solid-jest/preset/browser",
  transform: {
    '\\.js$': ['babel-jest', { configFile: './config/babel.config.js' }],
  },
  roots: ['../'],
};
