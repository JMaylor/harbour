module.exports = {
  extends: ['@antfu', 'plugin:tailwindcss/recommended'],
  plugins: ['tailwindcss', 'vitest'],
  rules: {
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 2,
        },
        ObjectPattern: {
          multiline: true,
          minProperties: 3,
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ],
    'array-bracket-newline': ['error', { multiline: true }],
    'array-element-newline': [
      'error',
      {
        multiline: true,
        minItems: 3,
      },
    ],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 1 },
        multiline: { max: 1 },
      },
    ],
  },
  settings: {
    tailwindcss: {
      officialSorting: true,
      prependCustom: true,
    },
  },
}
