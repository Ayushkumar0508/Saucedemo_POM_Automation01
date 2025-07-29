// utils/TestUtils.js
// Logging utilities, screenshot helpers, step context, retry mechanisms for deterministic, robust Playwright runs
const fs = require('fs');
const path = require('path');
const { expect } = require('@playwright/test');
const TestData = require('../data/TestData');

class TestUtils {
  static async logStepWithContext(page, context, msg) {
    const browser = (page.context && page.context().browser) ? page.context().browser() : (page.browser ? page.browser() : null); // Prefer correct context-scoped browser
    const browserType = browser ? (browser._name || 'unknown') : 'unknown';
    const step = `[${new Date().toISOString()}][${browserType.toUpperCase()}][${context}] ${msg}`;
    // eslint-disable-next-line no-console
    console.log(step);
  }

  static async screenshotOnState(page, name) {
    try {
      await page.screenshot({ path: name, fullPage: true });
      await TestUtils.logStepWithContext(page, 'SCREENSHOT', `Screenshot saved: ${name}`);
    } catch (err) {
      console.error(`[SCREENSHOT ERROR]: ${err.message}`);
    }
  }

  static async retry(fn, maxAttempts = 2, context = 'RETRY_FN') {
    let lastErr = null;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try { return await fn(); } catch (err) {
        lastErr = err;
        console.warn(`[${context}] Attempt ${attempt} failed: ${err.message}`);
        if (attempt === maxAttempts) throw err;
      }
    }
    throw lastErr;
  }
}
module.exports = TestUtils;
