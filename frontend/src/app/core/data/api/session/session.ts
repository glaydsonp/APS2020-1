export interface ISession {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  expirationDate: Date;
}
