module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'only-warn',
  ],
  rules: {
    'import/extensions': ['error', 'ignorePackages'],
    'no-unused-vars': ['warn', { varsIgnorePattern: 'React' }],
    'no-underscore-dangle': ['error', { allow: ['_id', '_recipes', 'recipe_items'] }],
  },
};
