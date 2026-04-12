export interface AffiliateForm {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  restaurantName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postalCode: string;
  tags: string[];
}
export const INITIAL_AFFILIATE_STATE: AffiliateForm = {
  name: '',
  surname: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
  restaurantName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  province: '',
  postalCode: '',
  tags: [],
};

export const affiliateFields = [
  'name',
  'surname',
  'email',
  'phoneNumber',
  'password',
  'confirmPassword',
  'restaurantName',
  'addressLine1',
  'city',
  'province',
  'postalCode',
  'tags',
];
