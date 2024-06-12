import { randomInt } from "crypto";
import { add } from "date-fns";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

import { SignupFormDto } from "@dtos/auth/register.dto";
import { CustomTokenPayload, IUser } from "@interfaces/models.interface";
import { HttpException } from "@exceptions/HttpException";
import { LoginFormDto } from "@dtos/auth/login.dto";
import { db } from "@/db";
import { User } from "@/db/schema";
import transporter from "@/email";
import { FROM_EMAIL, SECRET_KEY } from "@config";

class AuthService {
  public async findUser(
    data: LoginFormDto
  ): Promise<{ user: Partial<IUser>; token?: string | undefined }> {
    const user = await db.query.User.findFirst({
      where: eq(User.email, data.email),
    });

    if (!user) {
      throw new HttpException(401, "This user does not exist");
    }

    if (!data.otp || !user.otp) {
      const otp = randomInt(10000, 99999).toString();

      const otpExpiry = add(new Date(), { hours: 1 }).toISOString();

      await db
        .update(User)
        .set({ otp, otpExpiry })
        .where(eq(User.email, data.email));

      transporter.sendMail({
        to: data.email,
        from: FROM_EMAIL,
        subject: "OTP",
        text: `Here is the otp: ${otp}`,
      });

      return { user };
    }

    // check otp
    if (user.otp !== data.otp.toString()) {
      throw new HttpException(401, "Invalid OTP");
    }

    const token = await this.createToken(user.id);

    // unset otp
    await db
      .update(User)
      .set({ otp: null, otpExpiry: null })
      .where(eq(User.email, data.email));

    return {
      // eslint-disable-next-line
      user: (({ otp, otpExpiry, updatedAt, createdAt, ...rest }: typeof user) =>
        rest)(user),
      token,
    };
  }

  public async createUser(data: SignupFormDto): Promise<IUser> {
    const user = await db.query.User.findFirst({
      where: eq(User.email, data.email),
    });

    if (user) {
      throw new HttpException(400, "This email already exists");
    }

    const otp = randomInt(100000, 999999);

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

  private async createToken(userId: number) {
    const jwtPayload: CustomTokenPayload = {
      userId,
    };

    const signOptions: jwt.SignOptions = {
      expiresIn: "10h",
      algorithm: "HS256",
    };

    const token = jwt.sign(jwtPayload, SECRET_KEY, signOptions).toString();

    return token;
  }
}

export default AuthService;
