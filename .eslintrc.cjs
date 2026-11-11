module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react-refresh'],
rules: {
  'no-unused-vars': 'warn',
  'react/jsx-no-target-blank': 'warn',
  'react/react-in-jsx-scope': 'off',
  'react-refresh/only-export-components': 'warn',
  'react/prop-types': 'off',
},
};