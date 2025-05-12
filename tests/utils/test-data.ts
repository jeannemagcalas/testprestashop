import { Gender, PersonalInformation, Addresses} from '../../pages/CheckoutPage';

export const testPersonalInformation: PersonalInformation = {
  gender: Gender.Mrs,
  firstName: 'First',
  lastName: 'Last',
  email: 'test@gmail.com',
  password: 'Logpassword123+',
  birthdate: '01/01/1990',
  acceptOffers: true,
  agreeToTerms: true,
  signUp: true,
  acceptPrivacy: true
};

export const testAddresses: Addresses = {
  address: '123 Test Address',
  city: 'Test City',
  state: 'Georgia',
  postalCode: '30002',
  country: 'United States',
  useForInvoice: true
};


//Negative
export const testPasswordWeak: PersonalInformation = {
  gender: Gender.Mrs,
  firstName: 'First',
  lastName: 'Last',
  email: 'test@gmail.com',
  password: 'Password1!',
  birthdate: '01/01/1990',
  acceptOffers: true,
  agreeToTerms: true,
  signUp: true,
  acceptPrivacy: true
};