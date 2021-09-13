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
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'airbnb',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.ts', '.tsx'],
          },
        },
      },
      rules: {
        'no-unused-vars': 'off',
        'no-underscore-dangle': ['error', { allow: ['_id', '_recipes', 'recipe_items'] }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            ts: 'never',
            tsx: 'never',
          },
        ],
      },
    },
  ],
};
