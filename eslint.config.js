import js            from '@eslint/js'
import globals       from 'globals'
import reactHooks    from 'eslint-plugin-react-hooks'
import reactRefresh  from 'eslint-plugin-react-refresh'

export default [
  /*❶ 빌드 산출물 무시*/
  { ignores: ['dist'] },

 /*❷ Node 환경 전용 : 모든 *.config.js / *.cjs */
 {
   files: [
     '*.{config,cjs,cts,mjs,mts}.js',      // vite.config.js 등
     'tailwind.config.js',                 // 개별 지정도 가능
   ],   languageOptions: {
     ecmaVersion: 'latest',
     sourceType : 'module',
     globals    : globals.node,            // ← Node 전역 사용 허용
   },
   rules: {
     // 설정 파일은 대개 dev 전용 → 규칙 완화 예시
     'no-undef'      : 'off',
     'no-console'    : 'off',
     'import/no-extraneous-dependencies': 'off',
   },
 },

  /*❸ 애플리케이션(브라우저) 코드 */
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,             // 브라우저 전역
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]