  import { Page } from '@playwright/test';

  export enum Gender {
    Mr = 'Mr.',
    Mrs = 'Mrs.'
  }
  
  export type PersonalInformation = {
    gender: Gender;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthdate: string;
    acceptOffers: boolean;
    agreeToTerms: boolean;
    signUp: boolean;
    acceptPrivacy: boolean;
  };

  export type Addresses = {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    useForInvoice: boolean;
  };

  type ShippingMethod = {
    carrier: string;
    comment: string;
  };

  type Payment = {
    agreeToTerms: boolean;
  };

  export default class CheckoutPage {
    constructor(public page: Page) {}

    get frame() {
      return this.page.frameLocator('#framelive');
    }

    // Navigate to checkout page
    async goto() {
      await this.page.goto('https://demo.prestashop.com/checkout');
      await this.page.waitForLoadState('domcontentloaded');
    }

    // Fill out the personal information
    async fillPersonalInformation(data: PersonalInformation) {
      await this.frame.getByRole('radio', { name: data.gender }).check();
      await this.frame.getByRole('textbox', { name: 'First name' }).fill(data.firstName);
      await this.frame.getByRole('textbox', { name: 'Last name' }).fill(data.lastName);
      await this.frame.getByRole('textbox', { name: 'Email Email' }).fill(data.email);
      await this.frame.getByRole('textbox', { name: 'Password input' }).fill(data.password);
      await this.frame.getByRole('textbox', { name: 'Birthdate' }).fill(data.birthdate);

      if (data.acceptOffers) {
        await this.frame.getByText(' Receive offers from our').click();
      }

      if (data.agreeToTerms) {
        await this.frame.getByText(' I agree to the terms and').click();
      }

      if (data.signUp) {
        await this.frame.getByText(' Sign up for our').click();
      }

      if (data.acceptPrivacy) {
        await this.frame.getByText(' Customer data privacyThe').click();
      }
    }

  // Fill out the addresses
  async fillAddresses(details: Addresses) {
    await this.frame.getByRole('textbox', { name: 'Address', exact: true }).fill(details.address);
    await this.frame.getByRole('textbox', { name: 'City' }).fill(details.city);
    await this.frame.getByLabel('State').selectOption(details.state);
    await this.frame.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(details.postalCode);
    await this.frame.getByLabel('Country').selectOption({ label: details.country });

    if (details.useForInvoice) {
      await this.frame.getByRole('checkbox', { name: 'Use this address for invoice' }).check();
    }    
  }

  // Fill out the shipping method
async fillShippingMethod(method: ShippingMethod) {
  await this.frame.getByRole('radio', { name: method.carrier }).check();
  await this.frame.getByRole('textbox', { name: 'If you would like to add a' }).fill(method.comment);
}

  // Fill out the payment
async fillPayment(payment: Payment) {
  if (payment.agreeToTerms) {
    await this.frame.getByRole('checkbox', { name: 'I agree to the terms of' }).check();
  }
}

// Click continue
async continue() {
  const continueButton = this.frame.getByRole('button', { name: 'Continue' });
  await continueButton.click();
  await this.page.waitForTimeout(10000);
}

// Click show details
async showDetails() {
  const showDetailsLink = this.frame.getByRole('link', { name: 'show details expand_more' });
  await showDetailsLink.click();
  await this.page.waitForTimeout(5000);
}


// Get product price in checkout
async getProductPriceForSpecificItem(expectedPrice: number, productName: string): Promise<number> {

  const productLink = this.frame.getByRole('link', { name: new RegExp(productName, 'i') }).first();
  await productLink.waitFor({ state: 'visible', timeout: 5000 });

  const container = productLink.locator('..').locator('..'); // Adjust if structure changes
  const priceText = await container.getByText(/€\d+(\.\d{2})?/).textContent();

  const match = priceText?.match(/€(\d+(\.\d{2})?)/);
  const actualPrice = match ? parseFloat(match[1]) : 0;

  if (actualPrice !== expectedPrice) {
    console.log(`Expected price for '${productName}' is €${expectedPrice}, but found €${actualPrice}`);
  }

  return actualPrice;
}



// Get shipping cost in checkout
async getShippingCost(expectedCost: number): Promise<number> {
  const shippingCostLocator = this.frame.getByText('Shipping', { exact: true }).first();
  await shippingCostLocator.waitFor({ state: 'visible', timeout: 5000 });

  const shippingCostText = await shippingCostLocator.textContent();
  
  console.log('Raw shipping cost text:', shippingCostText);

  let actualCost = 0;

  if (shippingCostText?.includes('Free')) {
    actualCost = 0;
  } else {
    
    const match = shippingCostText?.match(/€\s*(\d+(\.\d{1,2})?)/);
    console.log('Shipping cost match:', match);

    if (match && match[1]) {
      actualCost = parseFloat(match[1]);
    }
  }

  if (actualCost !== expectedCost) {
    console.warn(`Expected shipping cost €${expectedCost}, but found €${actualCost}`);
  }

  return actualCost;
}


// Check Place Order
async checkPlaceOrderButtonStatus(): Promise<boolean> {
  const placeOrderButton = this.frame.getByRole('button', { name: 'Place Order' });
  await placeOrderButton.waitFor({ state: 'visible', timeout: 5000 });

  const isEnabled = await placeOrderButton.isEnabled();

  if (isEnabled) {
    console.log('Place Order button is enabled and ready to click.');
  } else {
    console.log('Place Order button is disabled.');
  }

  return isEnabled;
}


// Verify if there is an error message for weak password
async validateWeakPasswordScenario(): Promise<boolean> {
  const weakPasswordLocator = this.frame.getByText('The minimum score must be: Strong', { exact: true }).first();

  const weakPasswordError = await weakPasswordLocator.isVisible();

  if (weakPasswordError) {
    console.log('Weak password error is correctly displayed.');
  } else {
    console.warn('Weak password error message was not found.');
  }

  return weakPasswordError;
}

// async validateWeakPasswordScenario(): Promise<boolean> {
//   const weakPasswordLocator = this.frame.getByRole('listitem', { name: /The minimum score must be:/i, });

//   const weakPasswordError = await weakPasswordLocator.isVisible();

//   if (weakPasswordError) {
//     console.log('Weak password error is correctly displayed.');
//   } else {
//     console.warn('Weak password error message was not found.');
//   }

//   return weakPasswordError;
// }



    
}
