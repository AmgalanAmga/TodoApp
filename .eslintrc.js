module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        'no-inline-styles': false,
      },
      {
        usePrettierrc: false,
      },
    ],
  },
};
