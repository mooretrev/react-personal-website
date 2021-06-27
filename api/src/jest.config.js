module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    'src/.+\\.(j|t)sx?$': 'ts-jest',
  },
};
