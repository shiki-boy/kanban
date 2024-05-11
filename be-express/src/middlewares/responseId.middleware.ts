import { NextFunction, Request, Response } from "express";

const responseIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.setHeader('Response-Id', crypto.randomUUID());
    next();
  } catch (error) {
    next(error);
  }
};

export default responseIdMiddleware;
