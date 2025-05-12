import { Page, expect } from '@playwright/test';

export default class CartPage {
  constructor(public page: Page) {}

  get frame() {
    return this.page.frameLocator('#framelive');
  }

  // Open the cart
  async openCart() {
    await this.frame.locator('#_desktop_cart').click();
  }

  // Go to cart
  async gotoCart() {
    await this.frame.locator('.cart-preview, .shopping-cart').click();
    await this.page.waitForLoadState('networkidle');
  }

  // Update quantity of an item in the cart
  async updateQuantity(quantity: number) {
    const input = this.frame.locator('.cart_quantity input');
    await input.fill(quantity.toString());
    await input.blur(); // triggers update
  }

  // Remove item from the cart
  async removeItem() {
    const removeButton = this.frame.locator('.cart_delete a');
    await removeButton.click();
  }

  // Quantity of a single product
  async getProductQuantity(expectedQuantity: number): Promise<number> {
    const quantityInput = this.frame.getByRole('spinbutton', { name: /The best is yet to come/ });
    await quantityInput.waitFor({ state: 'visible', timeout: 10000 });
    const inputValue = await quantityInput.inputValue();
    const actualQuantity = parseInt(inputValue);
  
    if (actualQuantity !== expectedQuantity) {
      console.warn(`Expected product quantity ${expectedQuantity}, but found ${actualQuantity}`);
    }
  
    return actualQuantity;
  }
  

  // Number of items in the page  
  async getItemCount(expectedCount: number): Promise<number> {
    const countLocator = this.frame.getByText(/\d+\s+items?/i);
    await countLocator.waitFor({ state: 'visible', timeout: 10000 });
    const text = await countLocator.textContent();
    const match = text?.match(/(\d+)\s+items?/i);
    const actualCount = match ? parseInt(match[1]) : 0;
  
    if (actualCount !== expectedCount) {
      console.warn(`Expected item count ${expectedCount}, but found ${actualCount}`);
    }
  
    return actualCount;
  }
  
  

  // Number of items in the cart icon
  async getCartIconItemCount(expectedCount: number): Promise<number> {
    const countLocator = this.frame.getByText(/\(\d+\)/);
    await countLocator.waitFor({ state: 'visible', timeout: 10000 });
    const text = await countLocator.textContent(); // e.g. "(2)"
    const match = text?.match(/\((\d+)\)/); 
    const actualCount = match ? parseInt(match[1]) : 0;
  
    if (actualCount !== expectedCount) {
      console.warn(`Expected cart icon item count ${expectedCount}, but found ${actualCount}`);
    }
  
    return actualCount;
  }
  


  // Proceed to checkout
  async proceedToCheckout() {
    const checkoutButton = this.frame.getByRole('link', { name: 'Proceed to checkout' });
    await checkoutButton.click();
    await this.page.waitForTimeout(10000);
  }  


  // Check if the cart is empty
  async isCartVisible() {
    return this.frame.locator('.cart-empty').isVisible();
  }

  // Get total price of all items
  async getTotalPrice() {
    const totalPrice = await this.frame.locator('.total-price').textContent();
    return totalPrice ? parseFloat(totalPrice.replace('$', '').trim()) : 0;
  }



}
