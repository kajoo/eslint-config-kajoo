const restrictedGlobals = require('eslint-restricted-globals');
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:flowtype/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/flowtype',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: [
    'jest',
    'prettier',
    'import',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/no-unresolved': ERROR,
    'no-restricted-globals': [ERROR].concat(restrictedGlobals),
    'prettier/prettier': [
      ERROR,
      {
        singleQuote: true,
        trailingComma: 'all',
        endOfLine: 'lf',
      },
    ],
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: [
          '**/__tests__/**/*.[jt]s?(x)',
          '**/?(*.)+(spec|test).[jt]s?(x)',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
  overrides: [
    {
      files: ['*.js'],
      parser: 'babel-eslint',
      plugins: ['flowtype'],
      rules: {
        'flowtype/no-weak-types': WARNING,
        'flowtype/require-parameter-type': OFF,
        'flowtype/require-return-type': [
          OFF,
          'always',
          { annotateUndefined: 'never' },
        ],
        'flowtype/require-valid-file-annotation': ERROR,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          ERROR,
          { argsIgnorePattern: '^_' },
        ],
        'no-dupe-class-members': OFF,
        'no-unused-vars': OFF,
      },
    },
    {
      files: ['*.{spec,test}.{js,ts,tsx}', '**/__tests__/**/*.{js,ts,tsx}'],
      env: {
        jest: true,
        'jest/globals': true,
      },
    },
  ],
};
