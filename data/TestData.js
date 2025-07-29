// data/TestData.js
// Central place for deterministic, fixed test data and configuration constants
module.exports = {
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  checkout: {
    firstName: 'Play',
    lastName: 'Wright',
    zip: '42424',
  },
  randomSeed: 42,
  screenshotNames: {
    chromium: 'logged-in-chromium.png',
    firefox: 'logged-in-firefox.png',
  }
};
