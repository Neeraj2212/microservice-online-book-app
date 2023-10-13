export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
}
