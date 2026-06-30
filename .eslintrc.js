module.exports = {
  root: true,

  env: {
    es2022: true,
    node: true,
    browser: true,
    jest: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    projectService: true,
    tsconfigRootDir: __dirname,
  },

  // ========== РАСШИРЕНИЯ ==========
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],

  // ========== ПЛАГИНЫ ==========
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],

  // ========== НАСТРОЙКИ ==========
  settings: {
    react: { version: 'detect' },
  },

  // ========== ПРАВИЛА ==========
  rules: {
    // REACT
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/self-closing-comp': 'error',
    'react/jsx-no-bind': [
      'error',
      {
        ignoreRefs: true,
        allowArrowFunctions: false,
        allowFunctions: false,
        allowBind: false,
      },
    ],

    // REACT HOOKS
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // TYPESCRIPT
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',

    // ЗАЩИТА ГРАНИЦ МОНОРЕПЫ
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@fintrack-pro/web', '@fintrack-pro/web/*', '@fintrack-pro/mobile', '@fintrack-pro/mobile/*'],
            message: 'Запрещен алиас текущего пакета внутри самого себя.',
          },
          {
            group: ['../../packages/*', '../packages/*'],
            message: 'Запрещен относительный импорт между пакетами монорепы.',
          },
        ],
      },
    ],

    // ОБЩИЕ
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    eqeqeq: ['error', 'smart'],
    curly: ['error', 'multi-line'],
    'prefer-const': 'error',
    'no-var': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': 'error',
    'no-trailing-spaces': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
  },

  // ========== ЧТО ИГНОРИРУЕМ ==========
  ignorePatterns: ['node_modules', 'dist', 'build', '.expo', 'coverage', '.husky', 'package-lock.json'],

  // ========== ПЕРЕОПРЕДЕЛЕНИЯ ДЛЯ КОНКРЕТНЫХ ФАЙЛОВ ==========
  overrides: [
    // ===== JS КОНФИГИ =====
    {
      files: ['*.js', '*.cjs', '*.mjs', '*.config.js', '*.config.ts', '.*rc.js', '.*rc.cjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'no-console': 'off',
        'no-restricted-imports': 'off',
      },
    },
    // ===== WEB ПРИЛОЖЕНИЕ =====
    {
      files: ['apps/web/**/*.{ts,tsx}'],
      settings: {
        react: { version: 'detect' },
      },
    },
    // ===== MOBILE ПРИЛОЖЕНИЕ =====
    {
      files: ['apps/mobile/**/*.{ts,tsx}'],
      settings: {
        react: { version: 'detect' },
      },
    },
    // ===== SHARED ПАКЕТЫ =====
    {
      files: ['packages/**/*.{ts,tsx}'],
      settings: {
        react: { version: 'detect' },
      },
    },
    // ===== ТЕСТЫ =====
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      env: { jest: true },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
  ],
};
