/**
 * Api Token
 */
export interface Token {
  authenticated: boolean;
  created: string;
  expiration: string;
  accessToken: string;
  message: string;
  name: string;
  email: string;
  photo: string;
}
