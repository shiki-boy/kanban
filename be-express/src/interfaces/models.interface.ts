import { JwtPayload } from "jsonwebtoken";

interface BaseFields {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IUser extends BaseFields {
  email: string;
  name: string
  otp: string 
  // isActive: boolean;
}

interface IUserMethods {
  generateAuthToken: () => string;
}

