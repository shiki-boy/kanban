import { JwtPayload } from "jsonwebtoken";

interface BaseFields {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends BaseFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
}

interface IUserMethods {
  generateAuthToken: () => string;
}

