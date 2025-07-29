// tests/product-listing-checkout.test.js
// Main test file using Playwright test runner with chain-of-thought logging and deterministic artifacts
// See https://playwright.dev/docs/test-intro
const { test, expect } = require('@playwright/test');
const ProductListingPage = require('../pages/ProductListingPage');
const TestData = require('../data/TestData');
const TestUtils = require('../utils/TestUtils');

// Ensure clean state, reproducible: browser, viewport, etc. per top-level Playwright config

test.describe('Saucedemo Complete Flow - Chain-of-Thought Trace', () => {
  for (const browserName of ['chromium', 'firefox']) {
    test(`Login, add product, checkout complete - deterministic POM [${browserName}]`, async ({ page, browserName: testBrowser }) => {
      // Only run for the intended browser
      if (browserName !== testBrowser) test.skip();
      await TestUtils.logStepWithContext(page, 'TEST', `Running on browser: ${testBrowser}`);
      await page.goto('https://www.saucedemo.com', { waitUntil: 'domcontentloaded' });
      await TestUtils.logStepWithContext(page, 'NAVIGATE', 'Loaded main page.');

      // Chain-of-thought stepwise log for test actions (see TestUtils)
      const pom = new ProductListingPage(page);
      try {
        // 1. Login
        await pom.login(TestData.validUser.username, TestData.validUser.password);
        await TestUtils.screenshotOnState(page, TestData.screenshotNames[testBrowser]);

        // 2. Add product and go to cart
        await pom.addFirstProductToCart();
        await pom.openCart();

        // 3. Proceed to checkout, fill info
        await pom.proceedToCheckout();
        await pom.fillCheckoutInfo(
          TestData.checkout.firstName,
          TestData.checkout.lastName,
          TestData.checkout.zip
        );

        // 4. Complete purchase
        await pom.finishCheckout();
        await TestUtils.screenshotOnState(page, `checkout-complete-${testBrowser}.png`);
      } catch (err) {
        await TestUtils.logStepWithContext(page, 'ERROR', `Test failed: ${err.message}`);
        throw err;
      } finally {
        await pom.dispose();
      }
    });
  }
});
