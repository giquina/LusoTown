module.exports = {
  // LusoTown Mobile App Prettier Configuration
  // Consistent with web app formatting standards
  
  // Basic formatting
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  
  // React/React Native specific
  jsxSingleQuote: true,
  jsxBracketSameLine: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  
  // Line endings (consistent across platforms)
  endOfLine: 'lf',
  
  // File-specific overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        tabWidth: 2,
      },
    },
  ],
};