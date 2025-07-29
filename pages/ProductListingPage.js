// pages/ProductListingPage.js
// Central Inventory page object, implements login, add-to-cart, cart & checkout actions
// Implements robust error handling, stepwise reporting, and clean POM abstraction

const { expect } = require('@playwright/test');
const TestUtils = require('../utils/TestUtils');
const TestData = require('../data/TestData');

class ProductListingPage {
  constructor(page) {
    this.page = page;
    // Selectors comply with actual saucedemo.com HTML (2024/2025, see https://www.saucedemo.com)
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.inventoryContainer = '.inventory_list';
    this.firstInventoryAddToCart = 'button[data-test^="add-to-cart-sauce-labs-"]';
    this.cartIcon = '.shopping_cart_link';
    this.checkoutButton = '[data-test="checkout"]';
    this.firstNameInput = '[data-test="firstName"]';
    this.lastNameInput = '[data-test="lastName"]';
    this.postalCodeInput = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.finishButton = '[data-test="finish"]';
    this.completeHeader = '.complete-header';
  }
  async login(username, password) {
    await TestUtils.logStepWithContext(
      this.page,
      'LOGIN',
      `Entering credentials for ${username}`
    );
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await expect(this.page.locator(this.inventoryContainer)).toBeVisible({ timeout: 15000 });
    await TestUtils.logStepWithContext(this.page, 'LOGIN', 'Login successful, inventory loaded');
  }

  async addFirstProductToCart() {
    await TestUtils.logStepWithContext(this.page, 'CART', 'Adding first inventory item to cart');
    await this.page.click(this.firstInventoryAddToCart);
    await expect(this.page.locator(this.cartIcon)).toHaveCount(1);
  }

  async openCart() {
    await TestUtils.logStepWithContext(this.page, 'CART', 'Opening shopping cart');
    await this.page.click(this.cartIcon);
    await expect(this.page.locator(this.checkoutButton)).toBeVisible();
  }

  async proceedToCheckout() {
    await TestUtils.logStepWithContext(this.page, 'CART', 'Proceeding to checkout');
    await this.page.click(this.checkoutButton);
    await expect(this.page.locator(this.firstNameInput)).toBeVisible();
  }

  async fillCheckoutInfo(firstName, lastName, zip) {
    await TestUtils.logStepWithContext(this.page, 'CHECKOUT', 'Filling out checkout information');
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, zip);
    await this.page.click(this.continueButton);
    await expect(this.page.locator(this.finishButton)).toBeVisible();
  }

  async finishCheckout() {
    await TestUtils.logStepWithContext(this.page, 'CHECKOUT', 'Completing checkout');
    await this.page.click(this.finishButton);
    await expect(this.page.locator(this.completeHeader)).toContainText('Thank you', { timeout: 10000 });
    await TestUtils.logStepWithContext(this.page, 'CHECKOUT', 'Order complete, confirmation message visible');
  }

  // Clean up (for memory/resource management)
  async dispose() {
    // No-op for now
  }
}

module.exports = ProductListingPage;
