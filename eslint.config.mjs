import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import jestDom from 'eslint-plugin-jest-dom';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import testingLibrary from 'eslint-plugin-testing-library';

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-return-await': 'error',
      'react-hooks/set-state-in-effect': 'off',
      'react/react-in-jsx-scope': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
  {
    ...testingLibrary.configs['flat/react'],
    files: ['**/*.test.{ts,tsx}'],
  },
  {
    ...jestDom.configs['flat/recommended'],
    files: ['**/*.test.{ts,tsx}'],
  },
  prettierRecommended,
  globalIgnores(['.next/**', 'node_modules/**', 'next-env.d.ts']),
]);
