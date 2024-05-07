import { SignupFormBody } from "./../dtos/auth/register.dto";
import { validateRequest } from "@/middlewares/validateRequest.middleware";
import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import AuthController from "@/controllers/auth.controller";
import { LoginFormBody } from "@/dtos/auth/login.dto";
import authenticate from "@/middlewares/authenticate";

class AuthRoute implements Routes {
  public path = "/auth";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validateRequest({ body: LoginFormBody }),
      this.authController.login
    );

    this.router.post(
      `${this.path}/register`,
      validateRequest({ body: SignupFormBody }),
      this.authController.register
    );

    this.router.get(
      `${this.path}/user/info`,
      authenticate,
      this.authController.userInfo
    );
  }
}

export default AuthRoute;
