import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

import { RequestWithUser } from "@/interfaces/utils.interface";
import { SECRET_KEY } from "@/config";
import { CustomTokenPayload } from "@/interfaces/models.interface";
import { db } from "@/db";
import { User } from "@/db/schema";
import { getUserInfo } from "@/db/schema/User";

const authenticate = async function (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.header("Authorization").split(" ").at(-1);

    const verifyOptions: jwt.VerifyOptions = {
      algorithms: ["HS256"],
    };

    const decoded = jwt.verify(
      token,
      SECRET_KEY,
      verifyOptions
    ) as CustomTokenPayload;

    const user = await db.query.User.findFirst({
      where: eq(User.id, decoded.userId),
    });

    if (!user) throw Error("invalid signature");

    req.user = getUserInfo(user);
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }
    res.status(401).json({
      message: "No authentication credentials provided",
    });
  }
};

export default authenticate;
