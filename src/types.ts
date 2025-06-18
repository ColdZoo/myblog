export type JWTUser = {
  userId: number;
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};