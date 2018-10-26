module.exports = {
    extends: 'airbnb',
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: '2017',
    },
    env: {
        browser: true,
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: './webpack.config.js',
            },
        },
    },
    rules: {
        'global-require': 'off', // allow `require()` image inside JSX
        'import/no-mutable-exports': 'off', // same logic as for 'prefer-const'
        'import/prefer-default-export': 'off',
        indent: ['error', 4, {SwitchCase: 1}],
        'max-len': ['error', 160],
        'no-debugger': 'warn', // avoid making it an 'error' - it'll break dev flow
        'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
        'no-use-before-define': ['error', {functions: false}],
        'prefer-const': 'off',
        'react/jsx-curly-spacing': ['error', 'never', {allowMultiline: true}],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/no-find-dom-node': 'error',
        'react/forbid-prop-types': 'off',
        'no-multiple-empty-lines': ['error', {'max': 1}],
        'newline-before-return': 'warn',
        'newline-after-var': ["error", "always"],
        'curly': ['warn', 'all'],
        'space-in-parens': 'off',
        'no-underscore-dangle': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
    },
};
