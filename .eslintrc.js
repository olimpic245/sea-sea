module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['eslint:recommended', 'react-app', 'airbnb', 'prettier'],
  plugins: ['import', 'react', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  rules: {
    // check this
    'prettier/prettier': ['error', { singleQuote: true }],
    'react/no-array-index-key': 0,
    'react/require-default-props': 0,
    'max-len': [2, 200, 2],

    // main
    'arrow-parens': [1, 'as-needed'],
    'class-methods-use-this': 0,
    'global-require': 0,
    // "jsx-quotes": [1, "prefer-single"],
    'no-bitwise': 0,
    'no-console': [1, { allow: ['info', 'warn', 'error'] }],
    'no-class-assign': 0,
    'no-extend-native': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    quotes: [1, 'single'],
    'import/prefer-default-export': 0,

    // react
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': 0,
    'react/jsx-no-bind': 0, // Use this (bind all methods near methods)
    'react/jsx-no-target-blank': 0, // Use this
    'react/no-string-refs': 0, // Use this
    'react/no-unused-prop-types': 0,
    'react/prefer-stateless-function': 0, // Use this
    'react/prop-types': 1, // Use this
  },
};
