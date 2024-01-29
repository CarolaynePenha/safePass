import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { unauthorizedError } from "./handleErrorsMiddleware.js";
import authRepository from "../repositories/authRepository.js";
export default async function tokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) {
    const message = "Mandatory token sending";
    throw unauthorizedError(message);
  }
  const decodedToken = jwt.verify(token, process.env.KEY);
  if (!decodedToken) {
    const message = "Invalid token";
    throw unauthorizedError(message);
  }
  const session = await authRepository.getSession(token);
  if (!session) {
    const message = "Invalid token";
    throw unauthorizedError(message);
  }
  res.locals.userId = session.userId;
  next();
}
