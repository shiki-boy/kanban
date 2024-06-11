import { SignupFormDto } from "@/dtos/auth/register.dto";
import { IUser } from "@interfaces/models.interface";
import { HttpException } from "@/exceptions/HttpException";
// import userModel from "@/models/User";
import { LoginFormDto } from "@/dtos/auth/login.dto";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { User } from "@/db/schema";
import { randomInt } from "crypto";
import { add } from "date-fns";
class AuthService {
  public async findUser(
    data: LoginFormDto
    // ): Promise<{ user: IUser; token: string }> {
  ): Promise<any> {
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
    const user = await db.query.User.findFirst({
      where: eq(User.email, data.email),
    });

    if (user) {
      throw new HttpException(400, "This email already exists");
    }

    const otp = randomInt(10000, 99999);

    const otpExpiry = add(new Date(), { hours: 1 });

    const newUser = await db
      .insert(User)
      .values({
        email: data.email,
        name: data.firstName + " " + data.lastName,
        otp: otp.toString(),
        otpExpiry: otpExpiry.toISOString(),
      })
      .returning();

    return newUser[0];
  }
}

export default AuthService;
