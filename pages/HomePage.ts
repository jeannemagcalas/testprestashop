import { Page, expect } from '@playwright/test';

export default class HomePage {
  constructor(public page: Page) {}

  get frame() {
    return this.page.frameLocator('#framelive');
  }

  // Navigate to home page
  async goto() {
    await this.page.goto('https://demo.prestashop.com/#/en/front');
    await this.page.waitForLoadState('networkidle');
  }

  // Select a product on the homepage
  async selectFirstProduct() {
    const product = this.frame.getByRole('link', { name: "The best is yet to come' Framed poster" });
    await product.click();
  }

  // Select another product
  async selectSecondProduct() {
    const product = this.frame.getByRole('link', {name: 'Hummingbird printed t-shirt'}).first();
    await product.click();
  }


    // Check if the cart icon is visible
    async isCartIconVisible() {
      const cartIcon = this.frame.locator('#_desktop_cart');
      return await cartIcon.isVisible();
    }
  
    // Get the cart item count
    async getCartItemCount() {
      const cartText = await this.frame.locator('.cart-products-count').textContent();
      const match = cartText?.match(/\((\d+)\)/);
      return match ? parseInt(match[1]) : 0;
    }

      // Check if "Add to Cart" button is visible for a given product
  async isAddToCartButtonVisible(productIndex: number = 1) {
    const addToCartButton = this.frame.locator(`.product-miniature:nth-child(${productIndex}) button.add-to-cart`);
    return await addToCartButton.isVisible();
  }

}
