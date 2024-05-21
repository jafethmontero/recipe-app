import { DocumentData } from 'firebase/firestore';

export type TextContentType =
  | 'emailAddress'
  | 'password'
  | 'name'
  | 'username'
  | 'none'
  | 'newPassword'
  | 'oneTimeCode'
  | 'telephoneNumber'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'fullStreetAddress'
  | 'location'
  | 'nickname'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'familyName'
  | 'givenName'
  | 'jobTitle'
  | 'middleName'
  | 'namePrefix'
  | 'nameSuffix'
  | 'organizationName'
  | 'URL';

interface User {
  uid: string;
  username: string;
  email: string;
  profileImageURL: string;
  followers: string[];
  following: string[];
  recipes: string[];
  createdAt: number;
}

export type UserObject = DocumentData | null | undefined | User;

export interface Recipe {
  categories: string[];
  comments: any[];
  cookTime: string;
  createdAt: number;
  createdBy: string;
  description: string;
  id: string;
  imageURL: string;
  ingredients: any[];
  likes: any[];
  portion: string;
  steps: any[];
  title: string;
}
