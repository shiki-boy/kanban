import { NextFunction, Request, Response } from "express";

import { RequestWithUser } from "@/interfaces/utils.interface";
import { SignupFormDto } from "@/dtos/auth/register.dto";
import { LoginFormDto } from "@/dtos/auth/login.dto";
import AuthService from "@/services/auth.service";
import transporter from "@/email";
import { logger } from "@/utils/logger";

class AuthController {
  public authService = new AuthService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check username, password
      const data: LoginFormDto = req.body;
      const responseData = await this.authService.findUser(data);

      if (!responseData.token) {
        res.json({ message: "OTP has been sent to your email" });
        return;
      }

      res.json(responseData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: SignupFormDto = req.body;

      const responseData = await this.authService.createUser(data);

      // send otp in email, no passwords in this app
      await transporter.sendMail({
        from: "no-reply@example.com",
        to: data.email,
        subject: "OTP",
        text: `Here is the OTP: ${responseData.otp}. It is valid for only 1 hour.`,
      });

      logger.info("📨 OTP email sent successfully");

      res.json(responseData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public userInfo = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      res.json({ user: req.user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default AuthController;
