import { hash, compare } from "bcrypt";

import { SignupFormDto } from "@/dtos/auth/register.dto";
import { IUser } from "@interfaces/models.interface";
import { HttpException } from "@/exceptions/HttpException";
// import userModel from "@/models/User";
import { LoginFormDto } from "@/dtos/auth/login.dto";

class AuthService {
  public async findUser(
    data: LoginFormDto
  ): Promise<{ user: IUser; token: string }> {
    
    // if (!user) {
    //   throw new HttpException(401, "This user does not exist");
    // }

    // const isPasswordCorrect = await compare(data.password, user.password);
    // if (!isPasswordCorrect) {
    //   throw new HttpException(401, "Invalid credentials provided");
    // }

    // const token = user.generateAuthToken();

    // return {
    //   user,
    //   token,
    // };
  }

  public async createUser(data: SignupFormDto): Promise<IUser> {
    if (user) {
      throw new HttpException(401, "This email already exists");
    }

    const hashedPassword = await hash(data.password, 10);
    return userModel.create({ ...data, password: hashedPassword });
  }
}

export default AuthService;
