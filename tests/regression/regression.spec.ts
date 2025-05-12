import { test, expect } from '../../fixtures/test-fixtures';
import { testPersonalInformation, testAddresses, testPasswordWeak } from '../../tests/utils/test-data';


test.describe('Regression Tests', () => {
  test('User should not successfully place an order from the cart when password is weak', async ({ homePage, productPage, cartPage, checkoutPage }) => {
    await homePage.goto();
    await homePage.selectFirstProduct();
    await productPage.setQuantity(1);
    await productPage.addToCart();

    const isAdded = await productPage.isProductAddedToCart();
    expect (isAdded).toBe(true);

    await productPage.proceedToCartFromPopup();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillPersonalInformation(testPasswordWeak);

    await checkoutPage.continue();
    
    // Assert the weak password error is shown
    const weakPasswordError = await checkoutPage. validateWeakPasswordScenario();
    expect(weakPasswordError).toBe(true);
  });

  test('User can add more than one product and place an order from the cart', async ({ homePage, productPage, cartPage, checkoutPage }) => {
    await homePage.goto();
    await homePage.selectFirstProduct();

    const productPrice = await productPage.getProductPrice(29.00);
    console.log('Product price:', productPrice);    

    await productPage.setQuantity(1);
    await productPage.addToCart();

    const isAdded = await productPage.isProductAddedToCart();
    expect (isAdded).toBe(true);

    const popupQuantity = await productPage.getPopupQuantity(1);
    console.log('Popup quantity:', popupQuantity);

    await productPage.proceedToCartFromPopup();

    const productQuantity = await cartPage.getProductQuantity(1);
    console.log('Product quantity in cart:', productQuantity)

    const itemCount = await cartPage.getItemCount(1);
    console.log('Cart item count:', itemCount); 

    const iconItemCount = await cartPage.getCartIconItemCount(1);
    console.log('Cart icon count:', iconItemCount);

    await cartPage.proceedToCheckout();

    await checkoutPage.fillPersonalInformation(testPersonalInformation);

    await checkoutPage.continue();
    await checkoutPage.showDetails();

    const productNameInitial = "The best is yet to come' Framed poster";
    const expectedPriceInitial = 29.00;
    const actualPriceInitial = await checkoutPage.getProductPriceForSpecificItem(expectedPriceInitial, productNameInitial);
    console.log(`The price for '${productNameInitial}' is €${actualPriceInitial}`);

    const shippingCostFree = await checkoutPage.getShippingCost(0);  // Shipping cost is Free, expect 0
    console.log('Shipping cost:', shippingCostFree);  

    await checkoutPage.fillAddresses(testAddresses);

    await checkoutPage.continue();
    await checkoutPage.showDetails();

    const productName = "The best is yet to come' Framed poster";
    const expectedPrice = 29.00;
    const actualPrice = await checkoutPage.getProductPriceForSpecificItem(expectedPrice, productName);
    console.log(`The price for '${productName}' is €${actualPrice}`);
    
    const shippingCost = await checkoutPage.getShippingCost(7);
    console.log('Shipping cost:', shippingCost);  

    const shippingMethod = {
      carrier: 'My carrier My carrier',
      comment: 'Test Comment'
    };
    await checkoutPage.fillShippingMethod(shippingMethod);

    await checkoutPage.continue();

    const paymentDetails = {
      agreeToTerms: true
    };  
    await checkoutPage.fillPayment(paymentDetails);

    await checkoutPage.checkPlaceOrderButtonStatus();


  });


});
