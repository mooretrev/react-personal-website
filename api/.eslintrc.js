// setup eslint for typescript
module.exports = {
  root: true,
  env: {
    node: true,
    mongo: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // 'import/extensions': ['error', 'always'],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
