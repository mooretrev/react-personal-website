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
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', { js: 'always', json: 'always', ts: 'never' }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-return-await': 'off',
    'no-await-in-loop': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'airbnb',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.ts'],
          },
        },
      },
      rules: {
        'import/extensions': ['error', { js: 'always', json: 'always', ts: 'never' }],
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
        'no-return-await': 'off',
        'no-await-in-loop': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
};
