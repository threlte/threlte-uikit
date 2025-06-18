import js from '@eslint/js'
import globals from 'globals'
import prettier from 'eslint-config-prettier'
import svelte from 'eslint-plugin-svelte'
import ts from 'typescript-eslint'
import svelteConfig from './svelte.config.js'

export default ts.config(
  prettier,
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    name: 'ignores',
    ignores: ['.svelte-kit', 'dist'],
  },
  {
    files: ['**/*.svelte', '**/*.svelte.js', '**/*.svelte.ts', '../*.svelte.config.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'], // Add support for additional file extensions, such as .svelte
        parser: ts.parser,
        // Specify a parser for each language, if needed:
        // parser: {
        //   ts: ts.parser,
        //   js: espree,    // Use espree for .js files (add: import espree from 'espree')
        //   typescript: ts.parser
        // },

        // We recommend importing and specifying svelte.config.js.
        // By doing so, some rules in eslint-plugin-svelte will automatically read the configuration and adjust their behavior accordingly.
        // While certain Svelte settings may be statically loaded from svelte.config.js even if you don’t specify it,
        // explicitly specifying it ensures better compatibility and functionality.
        svelteConfig,
      },
    },
  }
)
