import { test, expect } from '../../fixtures/test-fixtures';
import { testPersonalInformation, testAddresses } from '../../tests/utils/test-data';


test.describe('Smoke Tests', () => {
  test('User can add more than one quantity to the cart', async ({ homePage, productPage, cartPage }) => {
    await homePage.goto();
    await homePage.selectFirstProduct();
    await productPage.setQuantity(2);
    await productPage.addToCart();

    const isAdded = await productPage.isProductAddedToCart();
    expect (isAdded).toBe(true);

    const popupQuantity = await productPage.getPopupQuantity(2);
    console.log('Popup quantity:', popupQuantity);

    await productPage.proceedToCartFromPopup();

    const productQuantity = await cartPage.getProductQuantity(2);
    console.log('Product quantity in cart:', productQuantity)

    const itemCount = await cartPage.getItemCount(2);
    console.log('Cart item count:', itemCount); 

    const iconItemCount = await cartPage.getCartIconItemCount(2);
    console.log('Cart icon count:', iconItemCount);

    await cartPage.proceedToCheckout();

  });

  test('User can add more than one product item to the cart', async ({ homePage, productPage, cartPage }) => {
    await homePage.goto();
    await homePage.selectFirstProduct();
    await productPage.setQuantity(2);
    await productPage.addToCart();

    const isFirstProductAdded = await productPage.isProductAddedToCart();
    expect (isFirstProductAdded).toBe(true);

    const popupQuantityInitial = await productPage.getPopupQuantity(2);
    console.log('Popup quantity:', popupQuantityInitial);

    await productPage.continueShoppingFromPopup();
    await productPage.goToHomePageFromProductPage();
    await homePage.selectSecondProduct();
    await productPage.setQuantity(1);
    await productPage.addToCart();

    const isSecondProductAdded = await productPage.isProductAddedToCart();
    expect (isSecondProductAdded).toBe(true);

    const popupQuantity = await productPage.getPopupQuantity(1);
    console.log('Popup quantity:', popupQuantity);

    await productPage.proceedToCartFromPopup();

    const itemCount = await cartPage.getItemCount(3);
    console.log('Cart item count:', itemCount); 

    const iconItemCount = await cartPage.getCartIconItemCount(3);
    console.log('Cart icon count:', iconItemCount);

    await cartPage.proceedToCheckout();

  });


  test('User can place an order with more than one product from the cart', async ({ homePage, productPage, cartPage, checkoutPage }) => {
    await homePage.goto();
    await homePage.selectFirstProduct();
    await productPage.setQuantity(2);
    await productPage.addToCart();

    const isFirstProductAdded = await productPage.isProductAddedToCart();
    expect (isFirstProductAdded).toBe(true);

    const popupQuantityInitial = await productPage.getPopupQuantity(2);
    console.log('Popup quantity:', popupQuantityInitial);

    await productPage.continueShoppingFromPopup();
    await productPage.goToHomePageFromProductPage();
    await homePage.selectSecondProduct();
    await productPage.setQuantity(1);
    await productPage.addToCart();

    const isSecondProductAdded = await productPage.isProductAddedToCart();
    expect (isSecondProductAdded).toBe(true);

    const popupQuantity = await productPage.getPopupQuantity(1);
    console.log('Popup quantity:', popupQuantity);

    await productPage.proceedToCartFromPopup();

    const itemCount = await cartPage.getItemCount(3);
    console.log('Cart item count:', itemCount); 

    const iconItemCount = await cartPage.getCartIconItemCount(3);
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


  test('User can place an order from the cart', async ({ homePage, productPage, cartPage, checkoutPage }) => {
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
