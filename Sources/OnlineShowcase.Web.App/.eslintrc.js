// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'no-param-reassign': 0,
    'no-multi-assign': 0,
    'semi': ['error', 'never'],
    "comma-dangle": ["warn", "never"],
    "linebreak-style": ["warn", "windows"],
    "no-unused-vars": ["warn"],
    "spaced-comment": ["off"], 
    "class-methods-use-this": ["off"],
    "prefer-arrow-callback": ["off"],
    "arrow-parens": ["off"],
    "no-nested-ternary": ["off"],
    "max-len": ["off"],    
    
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
