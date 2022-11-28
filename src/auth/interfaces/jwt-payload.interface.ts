export interface JwtPayload {
  userId: number;
  typeId: number;
  iat?: number;
  exp?: number;
}
