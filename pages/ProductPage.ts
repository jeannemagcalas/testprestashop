import { Page, expect } from '@playwright/test';

export default class ProductPage {
  constructor(public page: Page) {} 

  get frame() {
    return this.page.frameLocator('#framelive');
  }

  // Get the product price from the product detail page
  async getProductPrice(expectedPrice: number): Promise<number> {
    const priceLocator = this.frame.getByText(/€\d+(\.\d{2})?/).first();
    await priceLocator.waitFor({ state: 'visible', timeout: 10000 });
    const text = await priceLocator.textContent();
    const match = text?.match(/€(\d+(\.\d{2})?)/);
    const actualPrice = match ? parseFloat(match[1]) : 0;
  
    if (actualPrice !== expectedPrice) {
      console.log(`Expected price €${expectedPrice}, but found €${actualPrice}`);
    }
  
    return actualPrice;
  }
  

  // Set product quantity (if allowed on the product page)
  async setQuantity(quantity: number) {
    const quantityInput = this.frame.getByRole('spinbutton', { name: 'Quantity' });
    await quantityInput.fill(quantity.toString());
    await this.page.waitForTimeout(10000);
  }
  
  // Add the product to the cart
  async addToCart() {
    const addToCartButton = this.frame.locator('button.add-to-cart');
    await addToCartButton.click();
    await this.page.waitForTimeout(10000);
    await this.frame.locator('#blockcart-modal .product-quantity strong').waitFor({ state: 'visible', timeout: 50000 });
  }
  

  // Check if the product has been successfully added to the cart
  async isProductAddedToCart() {
    const successMessage = await this.frame.getByText('Product successfully added', { exact: false }).textContent();
    return successMessage && successMessage.includes('Product successfully added');
  }


  // Check quantity in the popup
async getPopupQuantity(expectedQuantity: number): Promise<number> {
  const popupQuantityText = await this.frame.locator('#blockcart-modal .product-quantity strong').textContent();
  const actualQuantity = Number(popupQuantityText);
  expect(actualQuantity).toBe(expectedQuantity);
  return actualQuantity;
}


// Proceed to cart from popup
async proceedToCartFromPopup() {
  const checkoutButton = this.frame.locator('#blockcart-modal a').filter({ hasText: 'Proceed to checkout' });
  await checkoutButton.click();
  await this.page.waitForTimeout(10000);
}

// Continue shopping from popup
async continueShoppingFromPopup() {
  const continueShoppingButton = this.frame.locator('button', { hasText: 'Continue shopping' });
  await continueShoppingButton.click();
}


// Go to Home page from Product page
async goToHomePageFromProductPage() {
  const homeButton = this.frame.getByRole('link', { name: 'Home' });
  await homeButton.click();
  await this.page.waitForTimeout(10000);
}


}
