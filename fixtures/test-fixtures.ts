import { test as base, expect, BrowserContext } from '@playwright/test';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

// Define custom fixtures
type Pages = {
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  context: BrowserContext;
};

export const test = base.extend<Pages>({
  // Instantiate and bind HomePage
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  // Instantiate and bind ProductPage
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  // Instantiate and bind CartPage
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  // Instantiate and bind CheckoutPage
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Optionally extend to mobile emulation using a different context
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 }, // iPhone X dimensions
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X)...',
      isMobile: true,
      hasTouch: true
    });
    await use(context);
    await context.close();
  }
});

// Export expect for convenience
export { expect };
