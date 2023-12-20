import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: true,

  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  typescript: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: ['./node_modules', './build', './dist'],
  rules: {
    'semi': ['error', 'always'],
    'no-console': 'warn',
    'no-multiple-empty-lines': 'error',
    'style/semi': ['error', 'always'],
    'style/brace-style': ['error', '1tbs'],
    'style/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'comma',
          requireLast: true,
        },
        overrides: {
          interface: {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
          },
        },
      },
    ],
    'ts/no-namespace': 'off',
    'ts/no-redeclare': 'off',
    'ts/consistent-type-imports': 'off',
    'ts/consistent-type-definitions': 'off',
  },
});
