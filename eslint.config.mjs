import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import { rules } from 'eslint-plugin-react/configs/all';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      'react/function-component-definition': 'off',
      'arrow-body-style': 'off',
      'import/prefer-default-export': 'off',
      'no-var': 'warn',
      eqeqeq: 'warn',
      'no-extra-semi': 'error',
      'no-unused-vars': 'warn',
      'react/prop-types': 0,
    },
  },
];
