const restrictedGlobals = require('eslint-restricted-globals');
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:flowtype/recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    'react-native/react-native': true,
  },
  plugins: [
    'jest',
    'prettier',
    'react',
    'react-native',
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
          '**/?(*.)+(spec|test).[tj]s?(x)',
        ],
      },
    ],
    'react/prop-types': WARNING,
    'react/display-name': WARNING,
    'react-native/no-unused-styles': ERROR,
    'react-native/split-platform-components': OFF,
    'react-native/no-inline-styles': WARNING,
    'react-native/no-color-literals': WARNING,
    'react-native/no-raw-text': ERROR,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.android.js', '.ios.js', '.native.js'],
      },
    },
    react: {
      version: 'detect',
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
