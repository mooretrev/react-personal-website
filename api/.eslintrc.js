module.exports = {
  root: true,
  env: {
    node: true,
    mongo: true,
    jest: true,
  },
  extends: [
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'always'],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
