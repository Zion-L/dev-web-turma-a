import pluginVue from 'eslint-plugin-vue'

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'semi': ['error', 'never'],       // proíbe ponto e vírgula
      'comma-dangle': ['error', 'always-multiline'],
      'quotes': ['error', 'single'],
    },
  },
]